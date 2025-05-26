import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Events</span>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://vinuni.edu.vn/wp-content/uploads/2024/05/1st-graduation-group-photo-sky-2-scaled-e1717083170766.jpeg"
            alt="VinUni Graduation"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Graduation Day 2025</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-xs px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">Upcoming Events</span>
          <span className="text-gray-500">See others have upcoming events</span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
