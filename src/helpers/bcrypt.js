import { hash, compareSync } from "bcrypt";

const encrypt = async (payload) => {
    const saltRounds = 10;
    const hashedPassword = await hash(payload, saltRounds);
    return hashedPassword;
};

const compare = (payload, hashedPassword) => {
    const isMatch = compareSync(payload, hashedPassword);
    return isMatch;
};

export { encrypt, compare };
