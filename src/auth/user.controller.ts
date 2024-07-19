import express from "express";
import passport from "passport";
import {
  checkEmail,
  //   deleteUserById,
  //   getUsers,
  //   refreshToken,
  signIn,
  signUp,
  //   updateUser,
} from "./user.service";
import { dtoCheck } from "./middleware/auth.middleware";
import { CheckEmailDto } from "./cryptography/dto/check-email.dto";
import { SignInCredentialsDto } from "./cryptography/dto/signin.dto";
import { SignUpCredentialsDto } from "./cryptography/dto/signup.dto";
import { UpdateCredentialDto } from "./cryptography/dto/update-user.dto";
const userRouters = express.Router();

userRouters.route("/signin").post(
  dtoCheck(SignInCredentialsDto, (errors: any[]) => {
    return errors.map((error: any) => {
      if (error.target && error.target.password) {
        delete error.target.password;
      }
      return error;
    });
  }),
  signIn
);
userRouters.route("/signup").post(dtoCheck(SignUpCredentialsDto), signUp);
userRouters.route("/check-email").post(dtoCheck(CheckEmailDto), checkEmail);

export default userRouters;

// userRouters
//   .route("/users")
//   .get(passport.authenticate("jwt", { session: false }), getUsers);

// userRouters
//   .route("/userupdate")
//   .patch(
//     dtoCheck(UpdateCredentialDto),
//     passport.authenticate("jwt", { session: false }),
//     updateUser
//   );

// userRouters.route("/refresh-token").get(
//   // dtoCheck(RefreshTokenDto),
//   passport.authenticate("jwt_ign_exptime", { session: false }),
//   refreshToken
// );

// userRouters
//   .route("/users/:id")
//   .delete(passport.authenticate("jwt", { session: false }), deleteUserById);
