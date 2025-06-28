import { Request, Response, Router } from "express";
import { CreateUserDto, UserService } from "../services/user.service";

const router = Router();

router.post("/", async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

export default router;
