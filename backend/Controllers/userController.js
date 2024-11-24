import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true } // Ensures validation of updated fields
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "User successfully updated.",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user.",
            error: error.message, // Improved error reporting
        });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "User successfully deleted.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user.",
            error: error.message, // Improved error reporting
        });
    }
};

export const getSingleUser = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        const user = await User.findById(id).select("-password"); // Exclude password field

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user.",
            error: error.message, // Improved error reporting
        });
    }
};

export const getAllUser = async (req, res) => {
    console.log("getAllUsers controller reached");

    try {
        // Fetch all users, excluding the password field
        const users = await User.find().select("-password");

        // Check if users are found
        if (!users || users.length === 0) {
            console.log("No users found in the database");
            return res.status(404).json({
                success: false,
                message: "No users found!",
            });
        }

        // Respond with the list of users
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        // Handle any errors
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message,
        });
    }
};
