import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-black mb-4">Page Not Found</h1>
      <Link
        href="/"
        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-lg font-medium"
      >
        Go back home
      </Link>
    </div>
  );
}
