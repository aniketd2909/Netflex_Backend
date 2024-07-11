import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../core/entities/user.entity";
// import { SessionEntity } from "./entities/SessionEntity";
import "./envConfig";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User],
});

(async () => {
  try {
    const connection = await AppDataSource.initialize();

    const queryRunner = connection.createQueryRunner();

    const tableExists = await queryRunner.hasTable("user");

    if (!tableExists) {
      console.log("Table does not exist. Creating table...");
      await connection.synchronize();
      console.log("Table created.");
    }

    await queryRunner.release();
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
})();
