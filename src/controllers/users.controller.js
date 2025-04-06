import { compare, encrypt } from "../helpers/bcrypt.js";
import { Sign, Verify } from "../helpers/jwt.js";
import Users from "../schema/users.schema.js";

const usersController = {
    async signup(req, res) {
        try {
            const { fname, lname, email, phone, address, password } = req.body;
            if (!fname || !lname || !email || !phone || !address || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const exists = await Users.findOne({ email });
            if (exists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await encrypt(password);

            const user = await Users.create({
                fname,
                lname,
                email,
                phone,
                address,
                password: hashedPassword,
            });

            user.password = undefined;
            const token = Sign({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });

            user._doc.token = token;
            return res.status(201).json({ message: "User account created", data: user });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to signup", error: err.message });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            user.password = undefined;
            const token = Sign({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });

            user._doc.token = token;

            return res.status(200).json({ message: "User logged in", data: user });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to login", error: err.message });
        }
    },

    // password auths
    async changePassword(req, res) {
        try {
            const { user_id, oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = await Users.findById(user_id);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const hashedPassword = await encrypt(newPassword);

            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({ message: "Password changed" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to change password", error: err.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await Users.find();
            users.map((user) => (user.password = undefined));

            return res.status(200).json({ message: "Users fetched", data: users });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to fetch users", error: err.message });
        }
    },
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findById(id);
            user.password = undefined;

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User fetched", data: user });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to fetch user", error: err.message });
        }
    },
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { fname, lname, email, phone, address } = req.body;

            const user = await Users.findByIdAndUpdate(
                id,
                { fname, lname, email, phone, address },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.password = undefined;
            return res.status(200).json({ message: "User updated", data: user });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to update user", error: err.message });
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted", data: user });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to delete user", error: err.message });
        }
    },
};

export default usersController;
