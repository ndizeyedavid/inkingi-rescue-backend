import Volunteer from "../schema/volunteers.schema.js";

const volunteerController = {
    async getAll(req, res) {
        try {
            const volunteers = await Volunteer.find().populate("user").populate("sos_id");
            res.status(200).json({ message: "Fetched all volunteers", data: volunteers });
        } catch (err) {
            res.status(500).json({
                message: "Error fetching volunteers",
                error: err.message,
            });
        }
    },
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const volunteer = await Volunteer.findById(id)
                .populate("user")
                .populate("sos_id");
            res.status(200).json({ message: "Fetched volunteer", data: volunteer });
        } catch (err) {
            res.status(500).json({
                message: "Error fetching volunteer",
                error: err.message,
            });
        }
    },
};

export default volunteerController;
