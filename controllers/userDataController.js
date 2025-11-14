const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Admin = require('../models/adminModel');

async function getUserData(req, res) {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        
        const user = userRole === 'doctor'
            ? await Doctor.findById(userId)
            : userRole === 'patient'
                ? await Patient.findById(userId)
                : userRole === 'admin'
                    ? await Admin.findById(userId)
                    : null;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let userInfo = null;

        if(userRole === 'doctor') {
            userInfo = {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                speciality: user.speciality,
                phone: user.phone,
                hospital: user.hospital,
                experience: user.experience,
                role: user.role,
            };
        } else if(userRole === 'patient') {
            userInfo = {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                bloodGroup: user.bloodGroup,
                address: user.address,
                age: user.age,
                role: user.role,
            }
        } else if(userRole === 'admin') {
            userInfo = {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                hospital: user.hospital,
                phone: user.phone,
                bloodGroup: user.bloodGroup,
                role: user.role,
            }
        }
        
        return res.status(200).json({
            error: false,
            message: "User details retrieved successfully",
            userInfo,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getUserData };