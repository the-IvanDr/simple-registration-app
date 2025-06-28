import axios from "axios";
import { redisClient } from "../redis/redis-client";

const BLOCKED_NUMBERS_KEY = "blockedPhoneNumbers";
const TTL_SECONDS = parseInt(process.env.BLOCKED_NUMBERS_TTL || "3600", 10);
const FALLBACK_URL =
  process.env.BLOCKED_NUMBERS_REQUEST_URL ||
  "http://localhost:3000/blocked-numbers";

export class BlockedNumbersService {
  static async getBlockedNumbers(): Promise<string[]> {
    const cached = await redisClient.get(BLOCKED_NUMBERS_KEY);

    if (cached) {
      return JSON.parse(cached);
    }

    try {
      const response = await axios.get<string[]>(FALLBACK_URL);
      const numbers = response.data;

      if (Array.isArray(numbers)) {
        await redisClient.setEx(
          BLOCKED_NUMBERS_KEY,
          TTL_SECONDS,
          JSON.stringify(numbers)
        );
        return numbers;
      } else {
        console.warn("Fetched fallback data is not an array");
        return [];
      }
    } catch (error) {
      console.error("Error fetching blocked numbers from fallback URL:", error);
      return [];
    }
  }

  static async isBlocked(phone: string): Promise<boolean> {
    const current = await this.getBlockedNumbers();
    return current.includes(phone);
  }
}
