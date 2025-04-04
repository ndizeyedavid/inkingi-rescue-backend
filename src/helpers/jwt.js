import jwt from "jsonwebtoken";

const Sign = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });
    return token;
};

const Verify = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};

export { Sign, Verify };
