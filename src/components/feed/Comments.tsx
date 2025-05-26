import prisma from "@/lib/client";
import CommentList from "./CommentList";

export default async function Comments({ postId }: { postId: number }) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: true,
      likes: true, // include likes relation
    },
  });

  return (
    <div className="">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
}
