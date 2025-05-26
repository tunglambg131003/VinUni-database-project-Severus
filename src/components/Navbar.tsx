"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/profile/${searchQuery.trim()}`);
    }
    setSearchQuery("");
  };

  return (
    <SignedIn>
      <div className="h-20 flex items-center justify-between">
        {/* LEFT */}
        <div className="md:hidden lg:block w-[20%]">
          <Link
            href="/"
            className="font-bold text-xl text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text"
          >
            SEVERUS APP
          </Link>
        </div>
        {/* CENTER */}
        <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
          {/* LINKS */}
          <div className="flex gap-6 text-black">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/home.png"
                alt="Homepage"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span>Homepage</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/friends.png"
                alt="Friends"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span>Friends</span>
            </Link>
          </div>
          <form
            onSubmit={handleSearch}
            className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Image src="/search.png" alt="Search" width={14} height={14} />
            </button>
          </form>
        </div>
        {/* RIGHT */}
        <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
          <ClerkLoading>
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
          </ClerkLoading>
          <ClerkLoaded>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="" width={20} height={20} />
            </div>
            <UserButton />
            {/* <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/login.png" alt="" width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut> */}
          </ClerkLoaded>
          <MobileMenu />
        </div>
      </div>
    </SignedIn>
  );
};

export default Navbar;
