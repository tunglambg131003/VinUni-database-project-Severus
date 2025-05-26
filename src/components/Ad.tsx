import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm ">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://vinuni.edu.vn/wp-content/uploads/2024/03/excel-2-2-e1713237797743.jpg"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-black font-medium">VinUniversity</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "VinUniversity is a private, not-for-profit university established by Vingroup – the largest private conglomerate in Vietnam."
            : size === "md"
            ? "VinUniversity is a private, not-for-profit university established by Vingroup – the largest private conglomerate in Vietnam. VinUni aspires to become a university of excellence with a mission to develop talents for the future."
            : "VinUniversity is a private, not-for-profit university established by Vingroup – the largest private conglomerate in Vietnam. VinUni aspires to become a university of excellence with a mission to develop talents for the future."}
        </p>
        <a
          href="https://vinuni.edu.vn/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center  bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-xs p-2 rounded-lg"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default Ad;
