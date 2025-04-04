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
};

export default usersController;
