import { Verify } from "../helpers/jwt.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const decoded = Verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Invalid user, reporting cyber attack now" });
    }
};
