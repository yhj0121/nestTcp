import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {
  create(createInfoInput) {
    return 'This action adds a new info';
  }

  findAll() {
    return `This action returns all info`;
  }

  findOne(id: number) {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoInput) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
