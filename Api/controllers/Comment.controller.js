import { handleError } from "../helpers/handleError.js"
import Comment from "../models/comment.model.js"
export const addcomment = async (req, res, next) => {
    try {
        const { user, blogid, comment } = req.body
        const newComment = new Comment({
            user: user,
            blogid: blogid,
            comment: comment
        })

        await newComment.save()
        res.status(200).json({
            success: true,
            message: 'Comment submited.',
            comment: newComment
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getComments = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const comments = await Comment.find({ blogid }).populate('user', 'name avatar').sort({ createdAt: -1 }).lean().exec()

        res.status(200).json({
            comments
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const commentCount = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const commentCount = await Comment.countDocuments({ blogid })

        res.status(200).json({
            commentCount
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

// export const getAllComments = async (req, res, next) => {
//     try {
//         const user = req.user
//         console.log('User:', req.user)

//         let comments
//         if (user.role === 'admin') {
//             comments = await Comment.find().populate('blogid', 'title').populate('user', 'name')

//         } else {

//             comments = await Comment.find({ user: user._id }).populate('blogid', 'title').populate('user', 'name')
//         }

//         res.status(200).json({
//             comments
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

// export const getAllComments = async (req, res, next) => {
//     try {
//         const comments = await Comment.find()
//             .populate('blogid', 'title')
//             .populate('user', 'name')
//             .sort({ createdAt: -1 })
//             .lean()
//             .exec();

//         res.status(200).json({ comments });
//     } catch (error) {
//         next(handleError(500, error.message));
//     }
// }


// export const deleteComment = async (req, res, next) => {
//     try {
//         const { commentid } = req.params
//         await Comment.findByIdAndDelete(commentid)

//         res.status(200).json({
//             success: true,
//             message: 'Data deleted'
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }

export const getAllComments = async (req, res, next) => {
    try {
        const user = req.user; // middleware se aaya hua logged-in user
        console.log('User:', user);

        let comments;

        if (user.role === 'admin') {
            // Admin → sab comments
            comments = await Comment.find()
                .populate('blogid', 'title')
                .populate('user', 'name avatar')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
        } else {
            // Normal user → sirf apne comments
            comments = await Comment.find({ user: user._id })
                .populate('blogid', 'title')
                .populate('user', 'name avatar')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
        }

        console.log('User ID:', user._id);
        console.log('Comments found:', comments.length);

        res.status(200).json({ comments });

    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { commentid } = req.params;
        const user = req.user;

        const comment = await Comment.findById(commentid);
        if (!comment) return next(handleError(404, 'Comment not found'));

        // Check permission
        if (user.role !== 'admin' && comment.user.toString() !== user._id.toString()) {
            return next(handleError(403, 'You can only delete your own comments'));
        }

        await Comment.findByIdAndDelete(commentid);

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
}
