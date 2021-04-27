
 import { Request, Response } from 'express';

 import {
   UpdateProfileService,
   ProfileEstablishmentService,
   UpdatePasswordEstabishmentService
 } from './services';

export class EstabishmentController {
   async updateProfile(req: Request, res: Response): Promise<Response> {
     try {
       const updateProfileService = new UpdateProfileService();

       const result = await updateProfileService.execute({ ...req.body, id: req.client.id });

       if (result.err) throw new Error(result.err);

       return res.status(200).json(result);
     } catch (err) {
       return res.status(400).json({ err: err.message });
     }
   }

   async updatePassword(req: Request, res: Response): Promise<Response> {
     try {
       const updatePasswordEstabishmentService = new UpdatePasswordEstabishmentService();

       const result = await updatePasswordEstabishmentService.execute({ ...req.body, id: req.client.id });

       if (result.err) throw new Error(result.err);

       return res.status(200).json(result);
     } catch (err) {
       return res.status(400).json({ err: err.message });
     }
   }

   async profile(req: Request, res: Response): Promise<Response> {
     try {
       const profileEstablishmentService = new ProfileEstablishmentService();

       const profile = await profileEstablishmentService.execute(req.client.id, req.body.selects);

       if (profile.err) throw new Error(profile.err);

       return res.status(200).json(profile);
     } catch (err) {
       return res.status(400).json({ err: err.message });
     }
   }
 }
