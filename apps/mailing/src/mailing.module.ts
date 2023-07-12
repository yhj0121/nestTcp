import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        API_PORT: Joi.number().integer().required(),
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'boys1541@naver.com',
        auth: {
          user: 'boys1541',
          pass: 'asdfzxcv12!',
        },

        defaults: {
          from: '"nest-modules" boys1541@gmai.com', // outgoing email ID
        },
        template: {
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  controllers: [MailingController],
  providers: [MailingService],
})
export class MailingModule {}
