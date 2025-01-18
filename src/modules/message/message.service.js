import messageModel from "../../DB/models/message.model.js"
import userModel from "../../DB/models/user.model.js"
//--------------------------------sendMessage
export const sendMessage=async(req,res,next)=>{
    const {content,userId}=req.body
    if(!await userModel.findOne({_id:userId,isDeleted:false})){
        return next(new Error('User Not Found',{cause:404}))
    }
    const message=await messageModel.create({content,userId})
    return   res.status(201).json({msg:'Message Created Successfully',message})
}


//--------------------------------getAllMessage

export const getAllMessage=async(req,res,next)=>{
    
    const messages=await messageModel.find({userId:req.user._id}).populate('userId','name email phone' )
    return   res.status(200).json({message:'Done',messages})
}
//--------------------------------deleteMessage

export const deleteMessage=async (req, res, next) => {
    const { messageId } = req.params; 

    const deletedMessage = await messageModel.findOneAndDelete({
        _id: messageId,
        userId: req.user._id, 
    });

    if (!deletedMessage) {
        return next(new Error('Message not found or you are not authorized to delete it.', { cause: 400 }));
    }

    return res.status(200).json({ message: 'Message deleted successfully.' });
};
//--------------------------------updateMessage

export const updateMessage=async (req, res, next) => {
    const { messageId } = req.params;
    const { content } = req.body; 

    const updatedMessage = await messageModel.findOneAndUpdate(
        { _id: messageId, userId: req.user._id }, 
        { content },  
        { new: true }  
    );

    if (!updatedMessage) {
        return next(new Error('Message not found or you are not authorized to update it.', { cause: 400 }));
    }

    return res.status(200).json({ message: 'Message updated successfully.', updatedMessage });
};