"use client";

import { addComment, switchCommentLike } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type LikeStateMap = Record<number, { likeCount: number; isLiked: boolean }>;

type CommentWithUserAndLikes = Comment & {
  user: User;
  likes: { userId: string }[];
};

type Props = {
  comments: CommentWithUserAndLikes[];
  postId: number;
};

export default function CommentList({ comments, postId }: Props) {
  const { user } = useUser();
  const { isLoaded, userId } = useAuth();

  // Local state for comments and likes
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  // Optimistic comments (newly added)
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUserAndLikes) => [value, ...state]
  );

  // Like states keyed by comment ID
  const initialLikeStates = comments.reduce((acc, c) => {
    const liked = userId
      ? c.likes.some((l: any) => l.userId === userId)
      : false;
    acc[c.id] = { likeCount: c.likes.length, isLiked: liked };
    return acc;
  }, {} as Record<number, { likeCount: number; isLiked: boolean }>);

  const [likeState, setLikeState] = useState<LikeStateMap>(initialLikeStates);

  const likeAction = async (commentId: number) => {
    // Optimistic update
    setLikeState((state) => ({
      ...state,
      [commentId]: {
        likeCount: state[commentId].isLiked
          ? state[commentId].likeCount - 1
          : state[commentId].likeCount + 1,
        isLiked: !state[commentId].isLiked,
      },
    }));

    try {
      await switchCommentLike(commentId);
    } catch (err) {
      // Revert on error
      setLikeState((state) => ({
        ...state,
        [commentId]: {
          likeCount: state[commentId].isLiked
            ? state[commentId].likeCount - 1
            : state[commentId].likeCount + 1,
          isLiked: !state[commentId].isLiked,
        },
      }));
    }
  };

  const add = async () => {
    if (!user || !desc) return;

    const tempId = Math.random();
    const newComment: CommentWithUserAndLikes = {
      id: tempId,
      desc,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      postId,
      likes: [],
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    };

    addOptimisticComment(newComment);

    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {
      console.error(err);
    }
    setDesc("");
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              value={desc}
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </form>
        </div>
      )}
      <div>
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            <Image
              src={comment.user.avatar || "noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name || comment.user.username}{" "}
                {comment.user.surname}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => likeAction(comment.id)}
                >
                  <Image
                    src={
                      likeState[comment.id]?.isLiked
                        ? "/liked.png"
                        : "/like.png"
                    }
                    alt="like"
                    width={12}
                    height={12}
                    className="w-4 h-4"
                  />
                  <span>{likeState[comment.id]?.likeCount || 0} Likes</span>
                </div>
                <div className="cursor-pointer">Reply</div>
              </div>
            </div>
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </>
  );
}
