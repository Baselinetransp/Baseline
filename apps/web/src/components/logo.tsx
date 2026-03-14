import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Logo Image */}
      <Image
        src="/images/logo.png"
        alt="Baseline Drivers Logo"
        width={60}
        height={50}
        className="h-10 w-auto md:h-12"
        priority
      />
      {/* Text Logo */}
      <div className="flex items-baseline gap-1.5 font-[family-name:var(--font-logo)]">
        <span className="text-lg md:text-xl font-semibold tracking-wider text-black">
          BASELINE
        </span>
        <span className="text-lg md:text-xl font-extrabold tracking-wider text-black">
          DRIVERS
        </span>
      </div>
    </Link>
  );
}
