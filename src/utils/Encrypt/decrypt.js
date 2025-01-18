import CryptoJS from "crypto-js"
export const Decrypt=async({phone,PHONE_SECRET_KEY=process.env.PHONE_SECRET_KEY})=>{
     return CryptoJS.AES.decrypt(phone, PHONE_SECRET_KEY).toString(CryptoJS.enc.Utf8)}