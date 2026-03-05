import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  openPositions: number;
  href: string;
  iconColor?: string;
}

export default function CategoryCard({
  icon: Icon,
  title,
  openPositions,
  href,
  iconColor = "text-primary",
}: CategoryCardProps) {
  return (
    // @ts-expect-error - dynamic route with query params
    <Link href={href}>
      <Card className="hover:shadow-lg hover:border-primary/50 transition-all group cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div
                className={`w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4 ${iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {openPositions} jobs available
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
