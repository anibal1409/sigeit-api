// eslint-disable-next-line prettier/prettier
import {
  Request,
  Response,
} from 'express';

// eslint-disable-next-line prettier/prettier
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { ActivityService } from '../activities.service';

@Injectable()
export class ActivityLoggerMiddleware implements NestMiddleware {
  constructor(private readonly activityService: ActivityService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    const userId = req.cookies?.['sigeit-cookie']?.id; // Obtener el ID de usuario desde la cookie
    if (userId) {
      // Registra la actividad
      const activityType = req.method; // Obtener el tipo de solicitud (POST, DELETE, PUT, etc.)
      const activity = req.originalUrl; // Descripción de la actividad
      const requestBody = req.body ? JSON.stringify(req.body) : null;
      this.activityService.logActivity(
        userId,
        activityType,
        activity,
        requestBody,
      );
    }
    next();
  }
}
