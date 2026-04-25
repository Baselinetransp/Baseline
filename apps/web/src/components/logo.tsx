import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Logo Image */}
      <Image
        src="/images/logo.svg"
        alt="Baseline Drivers Logo"
        width={280}
        height={84}
        className="h-14 w-auto md:h-16"
        priority
      />
    </Link>
  );
}
