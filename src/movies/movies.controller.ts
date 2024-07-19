import express from "express";
import passport from "passport";
import { getDetails, getMovieById, movieGetReqConvert } from "./movies.service";

const movieRouters = express.Router();

movieRouters
  .route("/discover/movie")
  .get(
    passport.authenticate("jwt", { session: false }),
    movieGetReqConvert("discover/movie")
  );
movieRouters
  .route("/search/movie")
  .get(
    passport.authenticate("jwt", { session: false }),
    movieGetReqConvert("search/movie")
  );
movieRouters
  .route("/movie/:id")
  .get(passport.authenticate("jwt", { session: false }), getMovieById);
movieRouters
  .route("/movie/:id/credits")
  .get(passport.authenticate("jwt", { session: false }), getDetails("credits"));
movieRouters
  .route("/movie/:id/images")
  .get(passport.authenticate("jwt", { session: false }), getDetails("images"));
movieRouters
  .route("/movie/:id/videos")
  .get(passport.authenticate("jwt", { session: false }), getDetails("videos"));

export default movieRouters;

// gateway, authservice, discoverservice, configservice, featureservices
