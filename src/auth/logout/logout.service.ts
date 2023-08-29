import { Response } from 'express';

import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutService {
  async logout(res: Response): Promise<void> {
    res.cookie('sigeit-cookie', '', { maxAge: 1 });
    res.redirect('/api');
  }
}
