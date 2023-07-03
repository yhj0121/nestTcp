import { MigrationInterface, QueryRunner } from 'typeorm';

export class First1688375693230 implements MigrationInterface {
  name = 'First1688375693230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer NOT NULL, "userId" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicles" ("id" integer NOT NULL, "vehicleTypes" character varying NOT NULL, "control" character varying NOT NULL, "u8_break" character varying NOT NULL, "u8_gear" character varying NOT NULL, "u8TurnSignal" character varying NOT NULL, "f64SpeedKph" integer NOT NULL, "f64SteeringAngleDeg" integer NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vehicles"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
