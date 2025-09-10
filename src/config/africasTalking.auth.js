import africastalking from "africastalking";
import dotenv from "dotenv";
dotenv.config();

const credentials = {
    apiKey: process.env.AT_API_KEY,
    username: process.env.AT_UNAME,
};

const AfricasTalking = africastalking(credentials);

const sms = AfricasTalking.SMS;

export { sms };
