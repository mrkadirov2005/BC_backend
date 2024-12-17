const VIP =require("../../Schemas/VIP");
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt");
const secretKeys=require("../../libs/JWTs/secret_keys");
const verifyIsSigned_vip = async(req, res, next) => {
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(401).json({message:"Invalid username" });
    }
//     check if the vip exists in the database
    const foundVIP=await VIP.findOne({username: username}).exec();
    if(!foundVIP){
        return res.sendStatus(404);
    }else{
        return res.sendStatus(200)
    }
}
const verify_VIP_Login=async(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body)
    if(!username || !password){
        return res.status(400).json({message:"Please provide all_details" });
    }
//     check is the vip existing
    try {
    const foundVIP=await VIP.findOne({username: username}).exec();
    console.log("found",foundVIP)
    if(!foundVIP){
        return res.status(404).json({message:"Not Found" });
    }
    bcrypt.compare(password,foundVIP.password,async(err,isMatch)=>{
        if(err){
            return res.status(401).json({message:"Incorrect password" });
        }
        const newPWD=jwt.sign({username:username,password:password},secretKeys.vip)
        return res.status(200).json({message:"token_successfully_loaded",token:newPWD});
    })
    }catch (e) {

    }
// TODO check this code as it is green cucumber
}
module.exports={verifyIsSigned_vip,verify_VIP_Login};