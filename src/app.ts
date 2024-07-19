import express, { Express } from "express";
import { authConfig } from "./core/authConfig";
import { routersConfig } from "./core/routes";
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ database connection;
import { AppDataSource } from "./core/typeOrmConfig";

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ env config;
import "./core/envConfig";

// app.get("/", (req, res) => {
//   res.send("Hello, TypeScript with Express!");
// });

// const server = app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

(async () => {
  const app: Express = express();

  // * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ auth config;
  authConfig(app);

  // * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Router and MiddleWare handler;
  routersConfig(app);
  // * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ global error handler;
  // app.use(errorHandler);

  // * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ server;
  const port = process.env.PORT || 3000;

  const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
  function gracefulShutdown() {
    console.log("Shutting down gracefully...");
    server.close(() => {
      closeDatabaseConnection();
      console.log("Server closed.");
      process.exit(0);
    });
    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 5000);
  }

  function handlesigint() {
    console.log("Shutting down gracefully...");
    server.close(() => {
      closeDatabaseConnection();
      console.log("Server closed.");
      process.exit(0);
    });
    process.exit(1);
  }
  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGINT", handlesigint);
})();

const closeDatabaseConnection = () => {
  console.log("Closing Database Connection");
  AppDataSource.destroy();
};
