import { Request, Response } from "express";
import { CreateCodeForgotPasswordService } from '../services/forgot-password/create-code-forgot-password.service';

export class ForgotPasswordController {
  async setPassword(req: Request, res: Response): Promise<Response> {
    try {
      const createCodeService = new CreateCodeForgotPasswordService();

      const code = await createCodeService.execute(req.body);

      if (code.err) throw new Error(code.err);

      return res.status(200).json(code);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
