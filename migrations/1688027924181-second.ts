import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1688027924181 implements MigrationInterface {
    name = 'Second1688027924181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" integer NOT NULL, "vehicleTypes" character varying NOT NULL, "control" character varying NOT NULL, "u8_break" character varying NOT NULL, "u8_gear" character varying NOT NULL, "u8TurnSignal" character varying NOT NULL, "f64SpeedKph" integer NOT NULL, "f64SteeringAngleDeg" integer NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
