import Comment from "../schema/comment.schema.js";

const commentController = {
    async getAllComments(req, res) {
        try {
            const comments = await Comment.find().populate("user").populate("sos_id");
            res.status(200).json({ message: "All Comments fetched", data: comments });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong", error: err.message });
        }
    },
    async getComment(req, res) {
        try {
            const { id } = req.params;

            const comment = await Comment.findById(id)
                .populate("user")
                .populate("sos_id");
            res.status(200).json({ message: "Comment fetched", data: comment });
        } catch (err) {
            res.status(500).json({ message: "Something went wrong", error: err.message });
        }
    },
};

export default commentController;
