import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { deleteMessageSchema, sendMessageSchema, updateMessageSchema } from "./message.validation.js";
import { deleteMessage, getAllMessage, sendMessage, updateMessage } from "./message.service.js";
import { asyncHandler } from "../../utils/index.js";
import { authentication } from "../../middleware/authentication.js";

const messageRounter=Router()

messageRounter.post('/',validation(sendMessageSchema),asyncHandler(sendMessage))
messageRounter.get('/',authentication,asyncHandler(getAllMessage))
messageRounter.delete('/deleteMessage/:messageId',validation(deleteMessageSchema),authentication,asyncHandler(deleteMessage))
messageRounter.patch('/updateMessage/:messageId',validation(updateMessageSchema),authentication,asyncHandler(updateMessage))


export default messageRounter