import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  // Fetch stories from users you follow or your own
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: { gt: new Date() },
      OR: [
        {
          user: {
            followers: {
              some: { followingId: currentUserId },
            },
          },
        },
        { userId: currentUserId },
      ],
    },
    include: { user: true },
  });

  // Fetch IDs of users the current user follows
  const followRelations = await prisma.follower.findMany({
    where: { followerId: currentUserId },
    select: { followingId: true },
  });
  const followingIds = followRelations.map(
    (relation: any) => relation.followingId
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        <StoryList
          stories={stories}
          userId={currentUserId}
          followingIds={followingIds}
        />
      </div>
    </div>
  );
};

export default Stories;
