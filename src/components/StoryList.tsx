"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { Dialog } from "@headlessui/react";

// Extend Story with User
type StoryWithUser = Story & { user: User };

interface StoryListProps {
  stories: StoryWithUser[];
  userId: string;
  // List of user IDs the current user follows
  followingIds: string[];
}

const StoryList = ({ stories, userId, followingIds }: StoryListProps) => {
  const [img, setImg] = useState<any>(null);
  const { user } = useUser();
  const [selected, setSelected] = useState<StoryWithUser | null>(null);

  // Optimistic updates for new stories
  const [optimisticStories, addOptimisticStory] = useOptimistic<
    StoryWithUser[],
    StoryWithUser
  >(stories, (state, value) => [value, ...state]);

  // Only show stories from followed users (including yourself)
  const visibleStories = optimisticStories.filter(
    (story) => story.userId === userId || followingIds.includes(story.userId)
  );

  const add = async () => {
    if (!img?.secure_url) return;

    // Add temporary optimistic story
    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId,
      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
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
    });

    try {
      const created = await addStory(img.secure_url);
      // Replace optimistic entry with the server response
      optimisticStories.splice(0, 1, created!);
      setImg(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Upload + Thumbnails */}
      <div className="flex items-center space-x-4 mt-4">
        <CldUploadWidget
          uploadPreset="social"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => (
            <div
              onClick={() => open()}
              className="flex flex-col items-center gap-2 cursor-pointer relative"
            >
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt="Add story"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 ring-purple-500 object-cover"
              />
              {img ? (
                <form action={add}>
                  <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-xs p-1 rounded-md">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add Story</span>
              )}
              <div className="absolute text-6xl text-gray-200 top-1">+</div>
            </div>
          )}
        </CldUploadWidget>

        {/* Map only visible stories (from followed users) */}
        {visibleStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setSelected(story)}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Image
              src={story.user.avatar || "/noAvatar.png"}
              alt={story.user.username || "Story"}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 ring-purple-500"
            />
            <span className="font-medium">
              {story.user.name || story.user.username}
            </span>
          </div>
        ))}
      </div>

      {/* Fullscreen Story Viewer */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black bg-opacity-70 cursor-pointer"
          aria-hidden="true"
        />

        {selected && (
          <button
            onClick={() => setSelected(null)}
            className="fixed top-4 right-4 text-white text-3xl font-bold z-50"
          >
            ×
          </button>
        )}

        <Dialog.Panel className="relative max-w-md mx-auto">
          {selected && (
            <Image
              src={selected.img}
              alt="Story image"
              width={375}
              height={667}
              className="rounded-lg object-contain"
            />
          )}

          {selected && (
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {selected.user.name || selected.user.username}
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default StoryList;
