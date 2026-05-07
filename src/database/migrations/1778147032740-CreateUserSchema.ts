import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSchema1778147032740 implements MigrationInterface {
    name = 'CreateUserSchema1778147032740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying(20), "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_password" ("userId" integer NOT NULL, "hashedPassword" character varying(100) NOT NULL, CONSTRAINT "PK_3e755bee2cdcee50a9e742776d8" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user_oauth" ("userId" integer NOT NULL, "provider" character varying NOT NULL, "provider_user_id" character varying NOT NULL, "access_token" character varying NOT NULL, CONSTRAINT "PK_5ed0c676645727b4be0f3c27abf" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "user_password" ADD CONSTRAINT "FK_3e755bee2cdcee50a9e742776d8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_oauth" ADD CONSTRAINT "FK_5ed0c676645727b4be0f3c27abf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_oauth" DROP CONSTRAINT "FK_5ed0c676645727b4be0f3c27abf"`);
        await queryRunner.query(`ALTER TABLE "user_password" DROP CONSTRAINT "FK_3e755bee2cdcee50a9e742776d8"`);
        await queryRunner.query(`DROP TABLE "user_oauth"`);
        await queryRunner.query(`DROP TABLE "user_password"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
