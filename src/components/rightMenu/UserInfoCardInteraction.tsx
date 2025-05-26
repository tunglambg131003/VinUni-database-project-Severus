"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) {}
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      <form action={follow}>
        <button
          className="w-full text-white text-sm rounded-md p-2
               bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
               hover:opacity-90 transition-opacity"
        >
          {" "}
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end ">
        <button className="text-red-400 text-xs cursor-pointer bg-transparent border border-red-400 rounded px-2 py-1 hover:bg-red-400 hover:text-white transition">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
