const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthModel = require("../model/authModel");
const nodemailer = require("nodemailer")
// adjust path if needed


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eamran.pbems@gmail.com",  
    pass:"syos cooi jeem sgrz" 
  }
});




const RegisterController = async (req, res) => {
  try {
    const { email, password, phone, role, name } = req.body;

    if (!email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and phone are required."
      });
    }

    // Check if user already exists
    const existingUser = await AuthModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new AuthModel({
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      name,
      role: role || "default"
    });

    await newUser.save();

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Welcome to PSB Website",
      html: `
        <h2>Hello ${newUser.email},</h2>
        <p>Thank you for registering at PSB Website!</p>
        <p>You can now log in and explore our platform.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Create token
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(201).json({
      success: true,
      message: "Registration successful. Welcome email sent.",
      user: {
        id: newUser._id,
        email: newUser.email,
        phone: newUser.phone,
        name:newUser.name,
        role: newUser.role
      },
      token
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message
    });
  }
};







const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // 2. Check if user exists
        const user = await AuthModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
           process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Return response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
};




const GetUsersController = async (req, res) => {
    try {
        const users = await AuthModel.find().select("-password"); // exclude passwords

        res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            users
        });

    } catch (error) {
        console.error("GetUsers Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching users."
        });
    }
};




const UpdateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, phone, role, password } = req.body;

        // 1. Find user
        const user = await AuthModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // 2. Update fields if they exist in the request body
        if (email) user.email = email.toLowerCase();
        if (phone) user.phone = phone;
        if (role) user.role = role;

        // 3. If password is provided, hash it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // 4. Save the updated user
        const updatedUser = await user.save();

        // 5. Return the updated user (excluding password)
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();

        res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("UpdateUser Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating user."
        });
    }
}; 


const DeleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find and delete user
        const deletedUser = await AuthModel.findByIdAndDelete(id);

        // 2. Handle user not found
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or already deleted."
            });
        }

        // 3. Success response
        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        console.error("DeleteUser Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting user."
        });
    }
};




const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await AuthModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Create token (valid for 30 minutes)
    const resetToken = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Save token + expiry in DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 mins
    await user.save();

    // Create reset link
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Hello ${user.email},</h2>
        <p>You requested a password reset.</p>
        <p>Click below link to reset your password (valid for 30 minutes):</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully."
    });

  } catch (error) {
    console.error("ForgotPassword Error:", error);
    res.status(500).json({ success: false, message: "Server error while processing forgot password." });
  }
};



const ResetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required." });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token." });
    }

    // Find user with valid token
    const user = await AuthModel.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in."
    });

  } catch (error) {
    console.error("ResetPassword Error:", error);
    res.status(500).json({ success: false, message: "Server error while resetting password." });
  }
};


const LogoutController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout successful. Please remove the token from client storage."
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout."
    });
  }
};






module.exports = {RegisterController,LogoutController,LoginController,GetUsersController,UpdateUserController,DeleteUserController,ForgotPasswordController , ResetPasswordController};
