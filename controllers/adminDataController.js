const Admin = require("../models/adminModel");

async function getAdminDetails(req, res) {
  const adminId = req.user.id;
  try {
    const admin = await Admin.findById(adminId);
      
    if (!admin) {
      return res.status(404).json({
        error: true,
        message: "Admin not found ⚠️",
      });
    }

    //payload
    const adminInfo = {
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        hospital: admin.hospital,
        phone: admin.phone,
        bloodGroup: admin.bloodGroup,
    }

    return res.status(200).json({
      error: false,
      message: "Admin details retrieved successfully",
      adminInfo,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `An error occurred while retrieving admin details. ${error.message}`,
    });
  }
}

module.exports = { getAdminDetails };
