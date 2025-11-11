const Doctor = require('../models/doctorModel');

async function getDoctorDetails(req, res){
    const doctorId = req.user.id;

    try {
        const doctor = await Doctor.findById(doctorId);
        if(!doctor){
            return res.status(404).json({
                error: true,
                message: "Doctor not found ⚠️",
            });
        }
        //payload
        const doctorInfo = {
            fullName: doctor.fullName,
            email: doctor.email,
            phone: doctor.phone,
            speciality: doctor.speciality,
            hospital: doctor.hospital,
            experience: doctor.experience,
            address: doctor.address,
            bloodGroup: doctor.bloodGroup,
        }
        return res.status(200).json({
            error: false,
            message: "Doctor details retrieved successfully",
            doctorInfo
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: `An error occurred while retrieving doctor details. ${error.message}`,
        });
    }
}

module.exports = { getDoctorDetails };