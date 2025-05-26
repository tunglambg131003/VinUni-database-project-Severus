"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Handle Esc key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <div>
      <span
        className="text-black text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-4 w-[90%] max-w-xl relative"
          >
            <h1 className="text-lg font-semibold">Update Profile</h1>
            <div className="text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>

            {/* COVER PIC UPLOAD */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => (
                <div
                  className="flex flex-col gap-4 my-4"
                  onClick={() => open()}
                >
                  <label>Cover Picture</label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt=""
                      width={48}
                      height={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">
                      Change
                    </span>
                  </div>
                </div>
              )}
            </CldUploadWidget>

            {/* FORM INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">First Name</label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Surname</label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Description</label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="description"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">City</label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="city"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">School</label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="school"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Work</label>
                <input
                  type="text"
                  placeholder={user.work || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="work"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-full">
                <label className="text-xs text-gray-500">Website</label>
                <input
                  type="text"
                  placeholder={user.website || "lama.dev"}
                  className="ring-1 ring-gray-300 p-3 rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>

            <UpdateButton />

            {state.success && (
              <span className="text-green-500 text-sm mt-2">
                Profile has been updated!
              </span>
            )}
            {state.error && (
              <span className="text-red-500 text-sm mt-2">
                Something went wrong!
              </span>
            )}

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black"
            >
              ×
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
