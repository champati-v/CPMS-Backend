const Department = require('../models/departmentModel');

async function addDepartment(req, res){

    const { name, description } = req.body;

    try {
        const department = await Department.findOne({name: name});
        if(department){
            return res.status(404).json({
                error: true,
                message: "Department already exists ⚠️",
            });
        }
        //payload
        const departmentInfo = {
            name: name,
            description: description,
        }
        const departmentInfoSave = new Department(departmentInfo);
        await departmentInfoSave.save();
        
        return res.status(200).json({
            error: false,
            message: "Department details saved",
            departmentInfoSave
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while saving department details. ${error.message}`,
        });
    }
}

 module.exports = {addDepartment};