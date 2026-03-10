import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* SVG Logo Icon */}
      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black rounded-lg">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            d="M4 20h2v4H4v-4zm6-4h2v8h-2v-8zm6-2h2v10h-2V14zm6 4h2v6h-2v-6z"
            fill="#CDFF00"
          />
          <path
            d="M28 24H4v2h24v-2z"
            fill="#CDFF00"
          />
        </svg>
      </div>
      {/* Text Logo */}
      <div className="flex flex-col leading-none">
        <span className="text-lg md:text-xl font-bold tracking-tight text-black">
          BASELINE
        </span>
        <span className="text-xs md:text-sm font-semibold text-black/70 tracking-wide">
          DRIVERS
        </span>
      </div>
    </Link>
  );
}
