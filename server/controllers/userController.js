import userModel from "../models/userModel.js";

// ✅ Update user profile
export const profileUpdate = async (req, res) => {
  try {
    const { name, location, skills, password, role } = req.body;

    let updateData = {};

    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (skills) updateData.skills = skills;
    if (password) updateData.password = password;
    if (role) updateData.role = role;

    const response = await userModel.updateOne(
      { _id: req.cookies.userId },
      { $set: updateData }
    );

    console.log(response);

    if (response) {
      res.status(200).json({ success: true, message: "Updated your Profile" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get list of users (freelancers or clients)
export const getListUsersData = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const self = await userModel.findById(userId);

    if (!self) {
      return res
        .status(404)
        .json({ success: false, message: "Logged-in user not found" });
    }

    const roleToMatch = self.role === "user" ? "freelancer" : "user";
    const users = await userModel.aggregate([
      { $match: { role: roleToMatch } },
    ]);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.params.id || req.cookies.userId;
    console.log("id: " + userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID missing!" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found..." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
