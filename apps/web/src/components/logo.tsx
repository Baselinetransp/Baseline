import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/baseline-logo.svg"
        alt="BaselineDrivers Logo"
        width={200}
        height={50}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
}
