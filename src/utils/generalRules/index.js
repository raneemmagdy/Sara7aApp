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


        'x-vercel-id': Joi.string().optional(),
        'x-vercel-internal-ingress-bucket': Joi.string().optional(),
        'forwarded': Joi.string().optional(),
        'x-vercel-ip-country': Joi.string().optional(),
        'x-vercel-ip-timezone': Joi.string().optional(),
        'x-vercel-ip-country-region': Joi.string().optional(),
        'x-vercel-proxy-signature-ts': Joi.string().optional(),
        'x-forwarded-host': Joi.string().optional(),
        'x-vercel-ja4-digest': Joi.string().optional(),
        'x-vercel-proxied-for': Joi.string().optional(),
        'x-vercel-ip-city': Joi.string().optional(),
        'x-vercel-proxy-signature': Joi.string().optional(),
        'x-vercel-ip-as-number': Joi.string().optional(),
        'x-vercel-ip-latitude': Joi.string().optional(),
        'x-real-ip': Joi.string().optional(),
        'x-vercel-deployment-url': Joi.string().optional(),
        'x-forwarded-for': Joi.string().optional(),
        'x-vercel-ip-continent': Joi.string().optional(),
        'x-forwarded-proto': Joi.string().optional(),
        'x-vercel-ip-longitude': Joi.string().optional(),
        'x-vercel-forwarded-for': Joi.string().optional(),
  
    }).required(),
    ObjectId:Joi.custom(customIdValidation)
}