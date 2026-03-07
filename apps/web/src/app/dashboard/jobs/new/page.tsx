"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "SEASONAL", label: "Seasonal" },
];

const EXPERIENCE_LEVELS = [
  { value: "ENTRY", label: "Entry Level" },
  { value: "JUNIOR", label: "Junior (1-2 years)" },
  { value: "MID", label: "Mid-Level (3-5 years)" },
  { value: "SENIOR", label: "Senior (5+ years)" },
  { value: "EXPERT", label: "Expert (10+ years)" },
];

const LICENSE_CLASSES = [
  { value: "C", label: "Class C - Standard Car" },
  { value: "C1", label: "Class C1 - Medium Vehicles" },
  { value: "CE", label: "Class CE - Large Vehicles + Trailer" },
  { value: "D", label: "Class D - Bus" },
  { value: "D1", label: "Class D1 - Minibus" },
];

export default function PostNewJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    benefits: "",
    jobType: "FULL_TIME",
    experienceLevel: "ENTRY",
    city: "",
    state: "",
    country: "UK",
    isRemote: false,
    licenseRequired: [] as string[],
    salaryMin: "",
    salaryMax: "",
    salaryNegotiable: false,
    startDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLicenseChange = (license: string) => {
    setFormData((prev) => ({
      ...prev,
      licenseRequired: prev.licenseRequired.includes(license)
        ? prev.licenseRequired.filter((l) => l !== license)
        : [...prev.licenseRequired, license],
    }));
  };

  const handleSubmit = async (e: React.FormEvent, status: "DRAFT" | "PUBLISHED") => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trpc/jobs.create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status,
          salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) * 100 : null,
          salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) * 100 : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      router.push("/dashboard/jobs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Jobs
        </Link>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Post a New Job</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details below to create a new job listing
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., HGV Class 1 Driver"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobType">Job Type *</Label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Requirements</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="requirements">Job Requirements</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the requirements for this position..."
                rows={4}
              />
            </div>

            <div>
              <Label className="mb-3 block">Required License Classes *</Label>
              <div className="flex flex-wrap gap-3">
                {LICENSE_CLASSES.map((license) => (
                  <label
                    key={license.value}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                      formData.licenseRequired.includes(license.value)
                        ? "bg-primary-alt/10 border-primary-alt text-primary-alt"
                        : "bg-white hover:bg-muted/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.licenseRequired.includes(license.value)}
                      onChange={() => handleLicenseChange(license.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{license.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isRemote"
                name="isRemote"
                checked={formData.isRemote}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isRemote" className="cursor-pointer">
                This is a remote position
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., London"
                />
              </div>
              <div>
                <Label htmlFor="state">State/County</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g., Greater London"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="UK">United Kingdom</option>
                  <option value="NG">Nigeria</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Compensation</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryMin">Minimum Salary (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    £
                  </span>
                  <Input
                    id="salaryMin"
                    name="salaryMin"
                    type="number"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="2000"
                    className="pl-7"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="salaryMax">Maximum Salary (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    £
                  </span>
                  <Input
                    id="salaryMax"
                    name="salaryMax"
                    type="number"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="3500"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="salaryNegotiable"
                name="salaryNegotiable"
                checked={formData.salaryNegotiable}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="salaryNegotiable" className="cursor-pointer">
                Salary is negotiable
              </Label>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Benefits & Perks</h2>
          <div>
            <Label htmlFor="benefits">Benefits Offered</Label>
            <Textarea
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="List the benefits and perks (e.g., health insurance, pension, company vehicle)..."
              rows={4}
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Start Date</h2>
          <div>
            <Label htmlFor="startDate">Expected Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, "DRAFT")}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, "PUBLISHED")}
            disabled={isLoading}
            className="bg-primary-alt text-black hover:bg-primary-alt/90"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
}
