import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  tags?: string[];
  companyLogo?: string;
  posted?: string;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  tags = [],
  companyLogo,
  posted,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={company}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-lg font-bold text-primary">
                {company.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Job Title */}
            <Link
              href={`/jobs/${id}`}
              className="font-heading text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
            >
              {title}
            </Link>

            {/* Company & Metadata */}
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>{company}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground">
                <Briefcase className="h-3 w-3" />
                {type}
              </span>
              {salary && (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  {salary}
                </span>
              )}
              {posted && (
                <span className="text-muted-foreground text-xs">{posted}</span>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            className="flex-shrink-0 w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center"
          >
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <Link href={`/jobs/${id}`} className="flex-1 mr-2">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Link href={`/jobs/${id}/apply`} className="flex-1">
          <Button className="w-full">Apply</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
