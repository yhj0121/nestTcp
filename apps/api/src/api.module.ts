import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { VehicleService } from './service/vehicle.service';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, VehicleService],
})
export class ApiModule {}
