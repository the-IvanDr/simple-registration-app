import { Request, Response, Router } from "express";
import { CreateUserDto, UserService } from "../services/user.service";

const router = Router();

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

function validateCreateUserDto(dto: CreateUserDto): string[] {
  const errors: string[] = [];

  if (typeof dto.name !== "string" || dto.name.trim().length === 0) {
    errors.push("Name must be a non-empty string");
  }

  if (typeof dto.phoneNumber !== "string" || dto.phoneNumber.length !== 12) {
    errors.push("Phone number must be a string with exactly 12 characters");
  }

  if (typeof dto.address !== "string" || dto.address.trim().length === 0) {
    errors.push("Address must be a non-empty string");
  }

  return errors;
}

export default router;
