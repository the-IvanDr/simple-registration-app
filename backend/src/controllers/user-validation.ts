import { CreateUserDto } from "../services/user.service";

export function validateName(name: any): string[] {
  const errors: string[] = [];

  if (typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name must be a non-empty string");
  }

  return errors;
}

export function validatePhoneNumber(phoneNumber: any): string[] {
  const errors: string[] = [];

  if (typeof phoneNumber !== "string" || phoneNumber.length !== 12) {
    errors.push("Phone number must be a string with exactly 12 characters");
  }

  return errors;
}

export function validateAddress(address: any): string[] {
  const errors: string[] = [];

  if (typeof address !== "string" || address.trim().length === 0) {
    errors.push("Address must be a non-empty string");
  }

  return errors;
}

export function validateCreateUserDto(dto: CreateUserDto): string[] {
  return [
    ...validateName(dto.name),
    ...validatePhoneNumber(dto.phoneNumber),
    ...validateAddress(dto.address),
  ];
}
