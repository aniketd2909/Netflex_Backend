import { Express } from "express";
import passport from "passport";
import { useJwtStrategy } from "../auth/passport-strategies/jwt.strategy";

export const authConfig = (app: Express) => {
  // load jwt strategy;
  //Calls the useJwtStrategy function, passing in the passport object. This function is responsible for configuring Passport.js to use the JWT strategy for authentication. Typically, this involves setting up how Passport should verify and extract user information from JWT tokens.
  useJwtStrategy(passport);

  //Adds the Passport middleware to the Express application (app). The passport.initialize() middleware is required to initialize Passport and set up its authentication mechanisms for incoming requests
  app.use(passport.initialize());
};
