import InitialsAvatar from "../InitialsAvatar";
import { MdExpandMore } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTaskComment, getProject , deleteComment} from "../../store/project";
import TextareaAutoSize from "react-textarea-autosize";
const Comment = ({ comment, currentUser, projectId, updateComments }) => {
    const dispatch = useDispatch();
	const [showCommentActionsButton, setShowCommentActionsButton] =
		useState(false);
	const [showCommentActions, setShowCommentActions] = useState(false);
	const [editCommentForm, setEditCommentForm] = useState(false);
	const [commentText, setCommentText] = useState(comment.comment);
	const [originalComment, setOriginalComment] = useState(comment.comment);
	const commentActionsDiv = useRef();
	useEffect(() => {
		if (showCommentActions) {
			document.addEventListener("mousedown", handleClick);
			return () => {
				document.removeEventListener("mousedown", handleClick);
			};
		}
	}, [showCommentActions]);

	const handleClick = (e) => {
		if (commentActionsDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		setShowCommentActions(false);
		return;
	};

	const updateComment = async (commentId, newComment) => {
        const res = await dispatch(updateTaskComment(commentId, newComment));
        if (res){
            setOriginalComment(commentText);
            await getProject(projectId);
            setEditCommentForm(false);
        }
    };

    const removeComment = async() => {
       const res =  await dispatch(deleteComment(comment.id))
       if(res){
        updateComments();
        setShowCommentActions(false);
       }
    }

	return (
		<div
			id="task-detail-view-comment"
			onMouseEnter={() => setShowCommentActionsButton(true)}
			onMouseLeave={() => setShowCommentActionsButton(false)}
			key={comment.id}
		>
			<div>
				<InitialsAvatar
					className={`initials-avatar-medium`}
					fullname={comment.owner.fullname}
				/>
			</div>
			<div id="task-detail-inner-comment-content">
				<div id="task-detail-comment-info">
					<h3>{comment.owner.fullname}</h3>

					{(showCommentActionsButton && currentUser.id === comment.owner.id) ||
					showCommentActions ? (
						<div
							id={
								showCommentActions
									? `comment-actions-button-active`
									: "comment-actions-button"
							}
							onClick={() => setShowCommentActions(!showCommentActions)}
							ref={commentActionsDiv}
						>
							<MdExpandMore size="1.3em" />
							{showCommentActions ? (
								<div id="comment-actions-list">
									<div
										id="comment-single-action"
										onClick={(e) => {
											e.stopPropagation();
											setEditCommentForm(true);
											setShowCommentActions(false);
										}}
									>
										<span>Edit comment</span>
									</div>
									<div id="comment-single-action" onClick={removeComment}>
										<span style={{ color: "#F06A6F" }}>Delete comment</span>
									</div>
								</div>
							) : null}
						</div>
					) : null}
				</div>
				<div id="task-detail-comment-text">
					{editCommentForm ? (
						<>
							<div id="task-detail-edit-comment-textarea-field">
								<TextareaAutoSize
									id="edit-comment-textarea"
									type="text"
									minRows={2}
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
								/>
							</div>
							<div id="edit-comment-toolbar">
								<button
									id="comment-cancel-button"
									onClick={() => {
										setEditCommentForm(false);
										setCommentText(originalComment);
									}}
									style={{ marginRight: 10 }}
								>
									Cancel
								</button>
								<button id="comment-edit-button" disabled={commentText === ""} onClick={() => updateComment(comment.id,commentText)}>
									Save Changes
								</button>
							</div>
						</>
					) : (
						<h4>{originalComment}</h4>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
