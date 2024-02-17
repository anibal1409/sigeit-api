import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async logActivity(
    userId: number,
    activityType: string,
    activity: string,
    requestBody: string | null = null,
  ) {
    const newActivity = this.activityRepository.create({
      user: { id: userId },
      activityType,
      activity,
      requestBody,
    });
    await this.activityRepository.save(newActivity);
  }

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
