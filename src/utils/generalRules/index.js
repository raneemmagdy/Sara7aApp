import Joi from 'joi'
import { Types } from 'mongoose'
export const customIdValidation=(value,helper)=>{
   const data= Types.ObjectId.isValid(value)
   return data?value:helper.message("Invalid Id!")
}
export const generalRules={
    email: Joi.string().email().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).messages({
                'string.email': 'Invalid email format.',
                'string.pattern.base': 'Email does not match the required format.',
                'any.required': 'Email is required.'
            }),
    password: Joi.string()
                .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters, include at least one letter and one number.',
                    'any.required': 'Password is required.'
    }),
    headers:Joi.object({
        authorization: Joi.string().required(),
        'cache-control': Joi.string(),
        'content-type': Joi.string(),
        accept: Joi.string(),
        host: Joi.string(),
        'user-agent': Joi.string(),
        connection: Joi.string(),
        'accept-encoding': Joi.string(),
        'content-length': Joi.string(),
        'postman-token': Joi.string(),
    }).required(),
    ObjectId:Joi.custom(customIdValidation)
}