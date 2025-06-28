import { Request, Response, Router } from "express";
import { CreateUserDto, UserService } from "../services/user.service";
import { validateCreateUserDto, validatePhoneNumber } from "./user-validation";

const router = Router();

// Get user by phone number
router.get(
  "/:phoneNumber",
  async (req: Request<{ phoneNumber: string }>, res: Response) => {
    try {
      const { phoneNumber } = req.params;

      const validationErrors = validatePhoneNumber(phoneNumber);
      if (validationErrors.length > 0) {
        res.status(400).json({
          message: "Phone number is invalid",
          errors: validationErrors,
        });
        return;
      }

      const user = await UserService.findByPhoneNumber(phoneNumber);

      if (!user) {
        res.status(404).json({
          message: "User not found",
          errors: ["No user found with the provided phone number"],
        });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: "Failed to retrieve user",
        errors: [err instanceof Error ? err.message : String(err)],
      });
    }
  }
);

// Create user
router.post("/", async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  try {
    const validationErrors = validateCreateUserDto(req.body);

    if (validationErrors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }

    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create user",
      errors: [err instanceof Error ? err.message : String(err)],
    });
  }
});

export default router;
