import Comment from "../schema/comment.schema.js";
import Sos from "../schema/sos.schema.js";
import Volunteer from "../schema/volunteers.schema.js";

const sosController = {
    async createSos(req, res) {
        try {
            const { user, title, sos_type, description, location } = req.body;
            // Handle uploaded files
            const proofs = req.files ? req.files.map((file) => file.path) : [];

            if (
                !user ||
                !title ||
                !sos_type ||
                !description ||
                !location ||
                proofs.length === 0
            ) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const sos = await Sos.create({
                user,
                title,
                sos_type,
                description,
                proof: proofs, // Save array of file paths
                location,
            });

            return res
                .status(201)
                .json({ message: "SOS posted successfully", data: sos });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to post SOS", error: err.message });
        }
    },

    async getAllSos(req, res) {
        try {
            const sos = await Sos.find()
                .populate({
                    path: "user",
                    model: "Users",
                    select: ["fname", "lname", "email", "phone"],
                })
                .populate({
                    path: "comments",
                    model: "Comments",
                    populate: {
                        path: "user",
                        model: "Users",
                        select: ["fname", "lname", "email", "phone"],
                    },
                })
                .populate({
                    path: "volunteers",
                    model: "Volunteer",
                    populate: {
                        path: "user",
                        model: "Users",
                        select: ["fname", "lname", "email", "phone"],
                    },
                });
            return res
                .status(200)
                .json({ message: "SOS fetched successfully", data: sos });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to fetch SOS", error: err.message });
        }
    },
    async getOneSos(req, res) {
        try {
            const { id } = req.params;
            const sos = await Sos.findById(id)
                .populate({
                    path: "user",
                    model: "Users",
                    select: ["fname", "lname", "email", "phone"],
                })
                .populate({
                    path: "comments",
                    model: "Comments",
                    populate: {
                        path: "user",
                        model: "Users",
                        select: ["fname", "lname", "email", "phone"],
                    },
                })
                .populate({
                    path: "volunteers",
                    model: "volunteers",
                    populate: {
                        path: "user",
                        model: "Users",
                        select: ["fname", "lname", "email", "phone"],
                    },
                });
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }
            return res
                .status(200)
                .json({ message: "SOS fetched successfully", data: sos });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to fetch SOS", error: err.message });
        }
    },
    async updateSos(req, res) {
        try {
            const { id } = req.params;
            const { user, title, sos_type, description, proof, location, status } =
                req.body;

            const sos = await Sos.findByIdAndUpdate(id, {
                user,
                title,
                sos_type,
                description,
                proof,
                location,
                status,
            });
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }
            sos.status = status;
            return res
                .status(200)
                .json({ message: "SOS updated successfully", data: sos });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to update SOS", error: err.message });
        }
    },
    async deleteSos(req, res) {
        try {
            const { id } = req.params;
            const sos = await Sos.findByIdAndDelete(id);
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }
            return res.status(200).json({ message: "SOS deleted successfully" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to delete SOS", error: err.message });
        }
    },
    async commentSos(req, res) {
        try {
            const { id } = req.params;
            const { user, comment } = req.body;
            if (!user || !comment) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const sos = await Sos.findById(id);
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }
            const new_comment = await Comment.create({
                user,
                sos_id: id,
                comment,
            });

            sos.comments.push(new_comment._id);
            await sos.save();

            return res.status(201).json({
                message: "Comment posted successfully",
                data: sos,
                comment: new_comment,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Failed to post comment",
                error: err.message,
            });
        }
    },
    async volunteerSos(req, res) {
        try {
            const { id } = req.params;
            const { user } = req.body;
            if (!user) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const sos = await Sos.findById(id);
            const isVolunteer = await Volunteer.find({
                user: user,
                sos_id: id,
            });
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }
            if (!isVolunteer) {
                return res.status(400).json({ message: "User already volunteered" });
            }

            const new_volunteer = await Volunteer.create({
                user,
                sos_id: id,
            });

            sos.volunteers.push(new_volunteer._id);
            await sos.save();

            return res.status(200).json({
                message: "User volunteered successfully",
                data: sos,
                volunteer: new_volunteer,
            });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to volunteer", error: err.message });
        }
    },

    async unvolunteerSos(req, res) {
        try {
            const { id } = req.params;
            const { user } = req.body;

            const sos = await Sos.findById(id);
            if (!sos) {
                return res.status(404).json({ message: "SOS not found" });
            }

            // Find and delete the volunteer document
            const deletedVolunteer = await Volunteer.findOneAndDelete({
                user: user,
                sos_id: id,
            });

            if (!deletedVolunteer) {
                return res.status(404).json({ message: "Volunteer record not found" });
            }

            // Remove the volunteer's ID from the SOS volunteers array
            sos.volunteers = sos.volunteers.filter(
                (volunteerId) =>
                    volunteerId.toString() !== deletedVolunteer._id.toString()
            );
            await sos.save();

            return res.status(200).json({
                message: "Successfully unvolunteered",
                data: sos,
            });
        } catch (err) {
            return res
                .status(500)
                .json({ message: "Failed to unvolunteer", error: err.message });
        }
    },
};

export default sosController;
