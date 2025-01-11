import { Comment } from "@/models/comment.ts";

type CommentAction = {
  type: "added_comment";
  newComment: Comment;
};

export function commentReducer(
  comments: Comment[],
  action: CommentAction,
): Comment[] {
  switch (action.type) {
    case "added_comment": {
      return [...comments, action.newComment];
    }

    default: {
      throw Error("Unknown action");
    }
  }
}
