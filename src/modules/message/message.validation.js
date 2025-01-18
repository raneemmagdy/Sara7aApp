import Joi from "joi";
import { generalRules } from "../../utils/index.js";

export const sendMessageSchema={
    body:Joi.object({
        content:Joi.string().min(2).required().messages({
            'string.min': 'Content must be more than 1 characters.',
            'any.required': 'Content is required.'
        }),
        userId:generalRules.ObjectId.required().messages({
            'any.required': 'User ID is required.',
            'string.pattern.base': 'Invalid User ID format.'
        })

    })
}
export const deleteMessageSchema={
    params:Joi.object({
        messageId: generalRules.ObjectId.required().messages({
            'any.required': 'Message ID is required.',
            'custom': 'Invalid Message ID format.'
        })
    })
}
export const updateMessageSchema={
    params:Joi.object({
        messageId: generalRules.ObjectId.required().messages({
            'any.required': 'Message ID is required.',
            'custom': 'Invalid Message ID format.'
        })
    }),
    body:Joi.object({
        content:Joi.string().min(2).required().messages({
            'string.min': 'Content must be more than 1 characters.',
            'any.required': 'Content is required.'
        })
    })
}