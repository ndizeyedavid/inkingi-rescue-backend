import { sms } from "../config/africasTalking.auth.js";

const sendMsg = async (members, broadcast_message) => {
    const options = {
        to: members,
        message: broadcast_message,
    };
    try {
        const ans = await sms.send(options);
        return ans;
    } catch (err) {
        throw Error(err);
    }
};

export { sendMsg };
