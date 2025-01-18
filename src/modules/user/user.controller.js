import { Router } from "express";
import { confirmEmail, freezeAccount, getProfile, shareProfile, signIn, signUp, updatePassword, updateProfile } from "./user.service.js";
import { validation } from "../../middleware/validation.js";
import { freezeAccountSchema, shareProfileSchema, signInSchema, signUpSchema, updatePasswordSchema, updateProfileSchema } from "./user.validation.js";
import { authentication, authorization, rolesOptions } from "../../middleware/authentication.js";
import { asyncHandler } from "../../utils/index.js";

const userRouter=Router()

userRouter.post('/signup',validation(signUpSchema),asyncHandler(signUp))
userRouter.post('/signin',validation(signInSchema),asyncHandler(signIn))
userRouter.get('/profile',authentication,authorization([rolesOptions.user]),asyncHandler(getProfile))
userRouter.get('/confirmed/:token',asyncHandler(confirmEmail))
userRouter.patch('/updateProfile',validation(updateProfileSchema),authentication,asyncHandler(updateProfile))
userRouter.patch('/updatePassword',validation(updatePasswordSchema),authentication,asyncHandler(updatePassword))
userRouter.delete('/freezeAccount',validation(freezeAccountSchema),authentication,asyncHandler(freezeAccount))
userRouter.get('/profile/:id',validation(shareProfileSchema),asyncHandler(shareProfile))










export default userRouter