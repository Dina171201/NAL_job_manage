import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJob1717914890134 implements MigrationInterface {
    name = 'CreateJob1717914890134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."job_status_enum" AS ENUM('done', 'inprogress', 'pending', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "job" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "status" "public"."job_status_enum" NOT NULL DEFAULT 'inprogress', "user_id" integer, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_13dd4ad96c9a725eadf48db7558" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_13dd4ad96c9a725eadf48db7558"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TYPE "public"."job_status_enum"`);
    }

}
