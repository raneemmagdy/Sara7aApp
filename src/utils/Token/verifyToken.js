import jwt from 'jsonwebtoken'
export const verifyToken=async({token,JWT_SECRET})=>{
    return jwt.verify(token,JWT_SECRET)

}