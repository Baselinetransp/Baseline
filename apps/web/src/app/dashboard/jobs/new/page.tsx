"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc, queryClient } from "@/utils/trpc";

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

const JOB_CATEGORIES = [
  {
    value: "CAR_BASED",
    label: "Car-Based Jobs",
    icon: "🚗",
    description: "Cars or small passenger vehicles",
    roles: [
      "Taxi Driver",
      "Ride-share Driver",
      "Chauffeur",
      "Driving Instructor",
      "Private Hire Driver",
      "Medical Transport Driver",
    ],
  },
  {
    value: "VAN_BASED",
    label: "Van-Based Jobs",
    icon: "🚐",
    description: "Light commercial vans",
    roles: [
      "Parcel Delivery Driver",
      "Courier Driver",
      "Catering Delivery Driver",
      "Utility Service Driver",
      "Mobile Technician / Service Driver",
      "Delivery Driver",
    ],
  },
  {
    value: "TRUCK_LORRY",
    label: "Truck / Lorry Jobs",
    icon: "🚛",
    description: "Heavy goods vehicles (HGVs)",
    roles: [
      "Long-Haul Truck Driver",
      "Local Delivery Truck Driver",
      "Fuel Tanker Driver",
      "Refrigerated Truck Driver",
      "Construction Material Truck Driver",
      "Garbage / Waste Collection Truck Driver",
      "Dump Truck Driver",
      "Concrete Mixer Truck Driver",
    ],
  },
  {
    value: "BUS_PASSENGER",
    label: "Bus & Passenger Transport",
    icon: "🚌",
    description: "Buses and coaches",
    roles: [
      "City Bus Driver",
      "School Bus Driver",
      "Coach / Tour Bus Driver",
      "Airport Shuttle Driver",
      "Minibus Driver",
    ],
  },
  {
    value: "MOTORCYCLE_BASED",
    label: "Motorcycle-Based Jobs",
    icon: "🏍️",
    description: "Motorcycles or scooters",
    roles: [
      "Motorcycle Courier",
      "Food Delivery Rider",
      "Express Document Courier",
    ],
  },
  {
    value: "BICYCLE_BASED",
    label: "Bicycle-Based Jobs",
    icon: "🚲",
    description: "Bicycles",
    roles: [
      "Bike Courier",
      "Food Delivery Cyclist",
      "Postal Bicycle Delivery Worker",
    ],
  },
  {
    value: "CONSTRUCTION_INDUSTRIAL",
    label: "Construction & Industrial Vehicle Jobs",
    icon: "🚜",
    description: "Construction and industrial equipment",
    roles: [
      "Forklift Operator",
      "Construction Equipment Operator",
      "Excavator Operator",
      "Bulldozer Operator",
      "Road Roller Operator",
      "Backhoe Loader Operator",
      "Mobile Crane Operator",
      "Telehandler Operator",
    ],
  },
  {
    value: "VEHICLE_MAINTENANCE",
    label: "Vehicle Maintenance Jobs",
    icon: "🔧",
    description: "Repairing and maintaining vehicles",
    roles: [
      "Car Mechanic / Auto Mechanic",
      "Truck / HGV Mechanic",
      "Bus Mechanic",
      "Motorcycle Mechanic",
      "Diesel Mechanic",
      "Fleet Maintenance Technician",
      "Roadside Assistance Technician",
    ],
  },
  {
    value: "TRANSPORT_MANAGEMENT",
    label: "Transport Management & Logistics",
    icon: "📋",
    description: "Planning, coordinating, and managing transport",
    roles: [
      "Transport Manager",
      "Fleet Manager",
      "Logistics Manager",
      "Transport Planner",
      "Dispatch Coordinator",
      "Route Planner",
      "Operations Manager (Transport)",
      "Fleet Maintenance Manager",
    ],
  },
];

export default function PostNewJobPage() {
  const router = useRouter();

  const createJobMutation = useMutation(
    trpc.job.create.mutationOptions({
      onSuccess: () => {
        toast.success("Job created successfully!");
        queryClient.invalidateQueries({ queryKey: [["job", "myJobs"]] });
        router.push("/dashboard/jobs");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create job. Please try again.");
      },
    })
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    benefits: "",
    category: "CAR_BASED",
    jobRole: "",
    jobType: "FULL_TIME",
    experienceLevel: "ENTRY",
    address: "",
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

  // Get available roles based on selected category
  const availableRoles = useMemo(() => {
    const category = JOB_CATEGORIES.find((cat) => cat.value === formData.category);
    return category?.roles || [];
  }, [formData.category]);

  // Get currency symbol based on selected country
  const currencySymbol = useMemo(() => {
    return formData.country === "NG" ? "₦" : "£";
  }, [formData.country]);

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

  // Handle category change - reset job role when category changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      jobRole: "", // Reset job role when category changes
    }));
  };

  const handleLicenseChange = (license: string) => {
    setFormData((prev) => ({
      ...prev,
      licenseRequired: prev.licenseRequired.includes(license)
        ? prev.licenseRequired.filter((l) => l !== license)
        : [...prev.licenseRequired, license],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.licenseRequired.length === 0) {
      toast.error("Please select at least one license class");
      return;
    }

    if (formData.description.length < 50) {
      toast.error("Description must be at least 50 characters");
      return;
    }

    createJobMutation.mutate({
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements || undefined,
      benefits: formData.benefits || undefined,
      jobType: formData.jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY" | "SEASONAL",
      experienceLevel: formData.experienceLevel as "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "EXPERT",
      address: formData.address || undefined,
      city: formData.city || undefined,
      state: formData.state || undefined,
      country: formData.country,
      isRemote: formData.isRemote,
      licenseRequired: formData.licenseRequired,
      salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
      salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
      salaryNegotiable: formData.salaryNegotiable,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
    });
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

      <form onSubmit={handleSubmit} className="space-y-8">
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

            {/* Job Category Dropdown */}
            <div>
              <Label htmlFor="category">Job Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label} – {cat.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Role Dropdown - dynamic based on category */}
            <div>
              <Label htmlFor="jobRole">Job Role *</Label>
              <select
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a job role...</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Select a specific role within the chosen category
              </p>
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

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 123 Main Street"
              />
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
                    {currencySymbol}
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
                    {currencySymbol}
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
            onClick={() => router.push("/dashboard/jobs")}
            disabled={createJobMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createJobMutation.isPending}
            className="bg-primary-alt text-black hover:bg-primary-alt/90"
          >
            {createJobMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Create Job
          </Button>
        </div>
      </form>
    </div>
  );
}
