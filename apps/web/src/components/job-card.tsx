"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Bookmark, Share2, Link2, Check } from "lucide-react";
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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  const jobUrl = typeof window !== "undefined"
    ? `${window.location.origin}/jobs/${id}`
    : `/jobs/${id}`;

  const shareText = `Check out this ${title} position at ${company}!`;

  useEffect(() => {
    if (showShareMenu && shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 200, // Menu width is ~200px
      });
    }
  }, [showShareMenu]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    {
      name: "LinkedIn",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`,
      color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]",
    },
    {
      name: "X (Twitter)",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(jobUrl)}`,
      color: "hover:bg-black/10 hover:text-black",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`,
      color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${jobUrl}`)}`,
      color: "hover:bg-[#25D366]/10 hover:text-[#25D366]",
    },
  ];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-visible">
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

          {/* Action Buttons */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            {/* Bookmark Button */}
            <button
              type="button"
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Save job"
            >
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Share Button */}
            <button
              ref={shareButtonRef}
              type="button"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Share job"
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
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

      {/* Share Dropdown - Rendered via Portal */}
      {showShareMenu && typeof document !== "undefined" && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowShareMenu(false)}
          />

          {/* Dropdown Menu */}
          <div
            className="fixed z-[9999] w-52 bg-white rounded-lg shadow-xl border py-2"
            style={{
              top: menuPosition.top,
              left: Math.max(16, menuPosition.left), // Ensure it doesn't go off-screen
            }}
          >
            <div className="px-3 py-2 border-b">
              <p className="text-sm font-medium text-foreground">Share this job</p>
            </div>

            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareMenu(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${option.color}`}
              >
                {option.icon}
                <span>{option.name}</span>
              </a>
            ))}

            <div className="border-t mt-1 pt-1">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 px-3 py-2.5 text-sm w-full hover:bg-muted transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600 font-medium">Link copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    <span>Copy link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>,
        document.body
      )}
    </Card>
  );
}
