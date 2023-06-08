import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import mongoose, { Model } from 'mongoose';
import { System } from './interfaces/system.interface';
import { CustomException } from '../../common/exceptions/custom-exception';
import { CreateSystemDto } from './dto/create-system.dto';

@Injectable()
export class SystemService {
  constructor(
    @Inject(Constants.SYSTEM_MODEL)
    private systemModel: Model<System>,
  ) {}
  async findSystem(companyId: string): Promise<System> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.systemModel.findOne(query).exec();
  }

  async updateSystem(companyId: string): Promise<System> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.systemModel
      .findOneAndUpdate(
        query,
        { $set: { lastUpdate: new Date() } },
        { new: true },
      )
      .exec();
  }

  async createSystem(companyId: string): Promise<System> {
    const createSystemDto: CreateSystemDto = {
      companyId: companyId,
    };
    const createdDefaultSystem = new this.systemModel(createSystemDto);
    if (
      !createdDefaultSystem ||
      createdDefaultSystem.companyId.toString() !== companyId
    ) {
      throw new CustomException('System not created', 400);
    }

    return createdDefaultSystem.save();
  }
}
