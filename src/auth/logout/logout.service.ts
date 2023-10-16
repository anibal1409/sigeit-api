import { Response } from 'express';

import { Injectable } from '@nestjs/common';

import { getDefaultCokieOptions } from '../cookies';

@Injectable()
export class LogoutService {
  async logout(res: Response): Promise<void> {
    res.cookie('sigeit-cookie', '', {
      ...getDefaultCokieOptions(),
      expires: new Date(),
    });
  }
}
