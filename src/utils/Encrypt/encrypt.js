import CryptoJS from "crypto-js"

export const Encrypt=async({phone,PHONE_SECRET_KEY=process.env.PHONE_SECRET_KEY})=>{
     return CryptoJS.AES.encrypt(phone,PHONE_SECRET_KEY).toString()
}