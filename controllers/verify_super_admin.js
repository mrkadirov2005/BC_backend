const bcrypt=require("bcrypt")
const Super_admin=require("../Schemas/super_admin")
const jwt=require("jsonwebtoken");
const secretKeys = require("../libs/JWTs/secret_keys");

const checkIsSginedIn=async(req,res,next)=>{
const token=req.headers.authorization;
const isVerified=jwt.verify(JSON.parse(token),secretKeys.super_admin,(err,isMatch)=>{
    if(err){
        return res.sendStatus(401)
    }
    return res.sendStatus(200)
})
}
const verify_super_admin=async(req,res)=>{
    const {...data}=req.body;
    console.log("req came for registration")
    if(!data.password || !data.username) return res.sendStatus(400)
        
        await Super_admin.updateOne({username:data.username},{signed_in:true})
        try {
            const response = await Super_admin.findOne({username:data.username}).exec();
            if (!response) {
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            
            bcrypt.compare(data.password, response.password, (err, isMatch) => {
                if (err) {
                    console.error("Error during password comparison", err);
                    return res.status(500).json({ status: 500, message: "Internal server error" });
                }
                
                if (!isMatch) {
                    return res.status(400).json({ status: 400, message: "Incorrect password" });
                }
                
                // Clone the response and remove the password field before sending
                const sendable_data = { ...response._doc };
                delete sendable_data.password;
                delete sendable_data._id;
                // the secret key is the password here
                const token=jwt.sign({username:data.username},data.password,{expiresIn:"1h"})
                return res.json({sendable_data,token});
            });
            
        } catch (error) {
            console.error("Error during user lookup", error);
            return res.status(500).json({ status: 500, message: "Internal server error" });
        }
        
    
}

module.exports={verify_super_admin,checkIsSginedIn}
