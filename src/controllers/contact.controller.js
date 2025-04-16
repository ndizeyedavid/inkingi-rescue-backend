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
};

export default contactController;
