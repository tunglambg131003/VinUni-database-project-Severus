"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`text-white p-2 mt-2 rounded-md disabled:cursor-not-allowed
        ${
          pending
            ? "bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300"
            : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
        }`}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white border-e-transparent" />
          Posting
        </div>
      ) : (
        "Post"
      )}
    </button>
  );
};

export default AddPostButton;
