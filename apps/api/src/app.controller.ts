import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  findAll(@Res() res: Response) {}
}
