const Center_Scheme=require("../Schemas/Center")
const Teacher = require("../Schemas/Teacher")
const reorganize_groups_function=async(all_groups)=>{
    const updated_groups_data=[]
    for(let i in all_groups){
        const c=all_groups[i]
        const center=await Center_Scheme.findOne({UID:c["center_id"]}).exec();
        const teacher=await Teacher.findOne({_id:c["teacher_id"]}).exec();
        const updatedSingleGroup={
            _id:c["_id"],
            name:c["name"],
            center_id:center.name,
            teacher_id:`${teacher.lastname} ${teacher.firstname}`,
            start_date:c["start_date"],
            end_date:c["end_date"],
            description:c["description"]
        }
        updated_groups_data.push(updatedSingleGroup)
    }
    return updated_groups_data

}
module.exports=reorganize_groups_function