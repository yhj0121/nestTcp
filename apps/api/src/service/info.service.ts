import { Injectable } from '@nestjs/common';
import { CreateInfoInput } from '../dto/create-info.input';
import { UpdateInfoInput } from '../dto/update-info.input';

@Injectable()
export class InfoService {
  create(createInfoInput: CreateInfoInput) {
    return 'This action adds a new info';
  }

  findAll() {
    return `This action returns all info`;
  }

  findOne(id: number) {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoInput: UpdateInfoInput) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
