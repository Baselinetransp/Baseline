"use client";

import { useState } from "react";
import { Building2, MapPin, Globe, Mail, Phone, Users, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompanyProfile {
  name: string;
  description: string;
  industry: string;
  size: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  logo: string | null;
}

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const INDUSTRIES = [
  "Logistics & Transportation",
  "Delivery Services",
  "Freight & Shipping",
  "Public Transportation",
  "Warehousing",
  "Supply Chain",
  "E-commerce",
  "Food & Beverage",
  "Retail",
  "Construction",
  "Manufacturing",
  "Other",
];

export default function CompanyProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [profile, setProfile] = useState<CompanyProfile>({
    name: "",
    description: "",
    industry: "Logistics & Transportation",
    size: "11-50",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "UK",
    logo: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to save company profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Company Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your company information that appears on job listings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Logo & Basic Info */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Company Information</h2>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Logo Upload */}
            <div className="flex-shrink-0">
              <Label className="mb-2 block">Company Logo</Label>
              <div className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                {profile.logo ? (
                  <img
                    src={profile.logo}
                    alt="Company logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Upload logo</span>
                  </>
                )}
              </div>
            </div>

            {/* Name & Industry */}
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <select
                    id="industry"
                    name="industry"
                    value={profile.industry}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="size">Company Size *</Label>
                  <select
                    id="size"
                    name="size"
                    value={profile.size}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {COMPANY_SIZES.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              placeholder="Tell drivers about your company, culture, and what makes you a great employer..."
              rows={5}
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will appear on your company page and job listings
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Contact Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="hr@company.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                placeholder="+44 20 1234 5678"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://www.company.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="123 Business Street"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="London"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <select
                  id="country"
                  name="country"
                  value={profile.country}
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

        {/* Preview Card */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <p className="text-sm text-muted-foreground mb-4">
            This is how your company will appear on job listings
          </p>

          <div className="border rounded-lg p-4 bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-alt to-primary-alt/60 rounded-lg flex items-center justify-center flex-shrink-0">
                {profile.logo ? (
                  <img src={profile.logo} alt="" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <Building2 className="h-8 w-8 text-black" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {profile.name || "Your Company Name"}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.city || "City"}, {profile.country || "Country"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {COMPANY_SIZES.find((s) => s.value === profile.size)?.label}
                  </span>
                </div>
                <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                  {profile.description || "Company description will appear here..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            {isSaved && (
              <span className="text-sm text-green-600">Changes saved successfully!</span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary-alt text-black hover:bg-primary-alt/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Company Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
