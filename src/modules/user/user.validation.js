import Joi from "joi";
import { generalRules } from "../../utils/generalRules/index.js";
import { genderOptions } from "../../DB/models/user.model.js";
import { rolesOptions } from "../../middleware/authentication.js";

export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(20).messages({
            'string.min': 'Name must be more than 3 characters.',
            'string.max': 'Name must be less than 20 characters.',
            'any.required': 'Name is required.'
        }),
        email: generalRules.email,
        password: generalRules.password,
        Cpassword: Joi.string().valid(Joi.ref('password')).messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is required.'
        }),
        phone: Joi.string().regex(/^01[0125][0-9]{8}$/).messages({
            'string.pattern.base': 'Phone number must be an Egyptian number and start with 010, 011, 012, or 015 followed by 8 digits.',
            'any.required': 'Phone number is required.'
        }),
        gender: Joi.string().valid(genderOptions.female,genderOptions.male).messages({
            'any.only': 'Gender must be either male or female.',
            'any.required': 'Gender is required.'
        }),
        role: Joi.string().valid(rolesOptions.user,rolesOptions.admin).default('user').messages({
            'any.only': 'Role must be either user or admin.',
            'any.required': 'Role is required.'
        })
    }).options({presence:'required'})
};



export const signInSchema={
    body:Joi.object({
        email: generalRules.email,
        password: generalRules.password,
       
    }).options({presence:'required'})
}


export const updateProfileSchema={
    body:Joi.object({
        name: Joi.string().min(3).max(20).messages({
            'string.min': 'Name must be more than 3 characters.',
            'string.max': 'Name must be less than 20 characters.',
            'any.required': 'Name is required.'
        }),
        phone: Joi.string().regex(/^01[0125][0-9]{8}$/).messages({
            'string.pattern.base': 'Phone number must be an Egyptian number and start with 010, 011, 012, or 015 followed by 8 digits.',
            'any.required': 'Phone number is required.'
        }),
        gender: Joi.string().valid(genderOptions.female,genderOptions.male).messages({
            'any.only': 'Gender must be either male or female.',
            'any.required': 'Gender is required.'
        }),
    }).required(),
    headers:generalRules.headers
}
export const updatePasswordSchema={
    body:Joi.object({
        oldPassword:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            'string.pattern.base': 'Password must be at least 8 characters, include at least one letter and one number.',
            'any.required': 'Old Password is required.'
            }),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).messages({
            'string.pattern.base': 'Password must be at least 8 characters, include at least one letter and one number.',
            'any.required': 'New Password is required.'
            }),
        cNewPassword: Joi.string().valid(Joi.ref('newPassword')).messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm New password is required.'
        }),
    }).options({presence:'required'}),
    headers:generalRules.headers
}
export const freezeAccountSchema={
    headers:generalRules.headers
}
export const shareProfileSchema={
    params:generalRules.ObjectId.required()
}