import { sms } from "../config/africasTalking.auth.js";
import { sendMsg } from "../helpers/send.sms.js";
import Contact from "../schema/contacts.schema.js";

const contactController = {
    async viewAll(req, res) {
        const { id } = req.params;
        const contacts = await Contact.find({ user: id });
        res.status(200).json({
            message: "Fetched all emergency contacts",
            data: contacts,
        });
    },
    async add(req, res) {
        const { id } = req.params;
        const { name, phone, relationship } = req.body;
        const contact = await Contact.create({ user: id, name, phone, relationship });
        res.status(201).json({ message: "Contact added", data: contact });
    },
    async sendMessage(req, res) {
        try {
            const { message } = req.body;
            const { id } = req.params;

            const contact = await Contact.findById(id);

            const options = {
                to: contact.phone,
                message: message,
            };
            const sms_result = await sms.send(options);

            // console.log(sms_result);
            res.status(200).json({
                message: `SOS message sent to ${contact.name} successfully`,
                sms: sms_result,
            });
        } catch (err) {
            res.status(500).json({
                message: "Unable to send SOS message to emergency contact",
                error: err.message,
            });
        }
    },
};

export default contactController;
