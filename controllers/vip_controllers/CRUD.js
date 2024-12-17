const jwt = require("jsonwebtoken");
const secretKeys = require("../../libs/JWTs/secret_keys");
const VIP_SCHEME = require("../../Schemas/VIP");
const Teacher_SCHEME = require("../../Schemas/Teacher");
const Groups = require("../../Schemas/Group");
const Student = require("../../Schemas/Student");
const Center = require("../../Schemas/Center");

const get_global = async (req, res) => {
    const token = req.headers.authorization;
    const { username } = req.body;
    console.log("req came")
    if (!username) return res.status(404).json({ message: "undefined username" });
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        jwt.verify(JSON.parse(token), secretKeys.vip,(err,match)=>{
            if(err){
                return res.status(401).json({message:"Invalid or Expired token"})
            }
        });

        const foundVip = await VIP_SCHEME.findOne({ username });
        if (!foundVip){ return res.status(404).json({ message: "Not Found" })};

        const foundCenter=await Center.findOne({UID:foundVip.center_id})
        
        return res.status(200).json({ message: "Successfully loaded data", vip_data: foundVip, center: foundCenter?foundCenter:false});
    } catch (e) {
        if (e.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid Token" });
        return res.status(500).json({ message: "Failed to load Data" });
    }
};

const get_teachers = async (req, res) => {
    const { center_id, token } = req.body;

    if (!center_id) return res.status(400).json({ message: "Please provide Center_id" });
    if (!token) return res.status(401).json({ message: "No Token" });

    try {
        const centerGroups = await Groups.find({ center_id }).exec();
        const teacherIds = centerGroups.map(group => group.teacher_id);

        const teachers = await Promise.all(
            teacherIds.map(id => Teacher_SCHEME.findById(id).exec())
        );

        res.status(200).json({ message: "Data loaded", data: teachers.filter(teacher => teacher) });
    } catch (error) {
        res.status(500).json({ message: "Error loading teachers data" });
    }
};

const getStudents=async(req,res)=>{
    const {token,center_id}=req.body;
    if(!token || ! center_id){
        return res.status(400).json({message:"Missing one of required props"})
    }
    try {
        const groups_by_center_id=await Groups.find({center_id:center_id}).exec();
        if(!groups_by_center_id){
            return res.status(404).json({message:"No groups detected with this center id"})
        
        }else{
            const students=[]
            groups_by_center_id.map(async (group)=>{
                const foundStudents=await Student.find({group_id:group._id}).exec();
                if(foundStudents){
                    // TODO continue from here
                    console.log(foundStudents)
                }
            })
             return res.json(students)
        }
    } catch (error) {
        
    }
}

module.exports = { get_global, get_teachers,getStudents};
