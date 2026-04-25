"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, FileText, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/utils/trpc";
import {
  getRegionsByCountry,
  getCountryLabel,
  type CountryCode,
} from "@/lib/location-data";

const EXPERIENCE_LEVELS = [
  { value: "ENTRY", label: "Entry Level (0-1 years)" },
  { value: "JUNIOR", label: "Junior (1-3 years)" },
  { value: "MID", label: "Mid-Level (3-5 years)" },
  { value: "SENIOR", label: "Senior (5-10 years)" },
  { value: "EXPERT", label: "Expert (10+ years)" },
];

export default function CompleteProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    bio: "",
    experienceYears: 0,
    experienceLevel: "ENTRY",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch current user profile
  const { data: user, isLoading } = useQuery(trpc.users.me.queryOptions());

  const driverProfile = user?.driverProfile;
  const country = (driverProfile?.country as CountryCode) || "NG";
  const regions = getRegionsByCountry(country);

  // Complete profile mutation
  const completeProfileMutation = useMutation(
    trpc.users.completeDriverProfile.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["users", "me"]] });
        queryClient.invalidateQueries({ queryKey: [["users", "checkProfileComplete"]] });
        toast.success("Profile completed successfully!");
        router.push("/dashboard/profile");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to complete profile");
      },
    })
  );

  // Resume upload mutation
  const uploadResumeMutation = useMutation(
    trpc.users.uploadResume.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["users", "me"]] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to upload resume");
      },
    })
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadResume = async (): Promise<boolean> => {
    if (!resumeFile) return true;

    setIsUploading(true);
    try {
      const base64Data = await fileToBase64(resumeFile);
      await uploadResumeMutation.mutateAsync({
        file: {
          name: resumeFile.name,
          data: base64Data,
        },
      });
      return true;
    } catch (error) {
      toast.error("Failed to upload resume");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.state) {
      toast.error("Please select your state/region");
      return;
    }

    // Upload resume first if selected
    if (resumeFile) {
      const success = await uploadResume();
      if (!success) return;
    }

    // Complete profile
    completeProfileMutation.mutate({
      state: formData.state,
      city: formData.city || undefined,
      bio: formData.bio || undefined,
      experienceYears: formData.experienceYears || undefined,
      experienceLevel: formData.experienceLevel as "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "EXPERT",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const hasResume = driverProfile?.resumeUrl || resumeFile;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <a
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </a>
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground mt-1">
          Complete your profile to start applying for jobs
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <h3 className="font-medium mb-3">Profile Progress</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm">Full Name</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm">Email Address</span>
          </div>
          <div className="flex items-center gap-2">
            {driverProfile?.phone ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm">Phone Number</span>
          </div>
          <div className="flex items-center gap-2">
            {driverProfile?.country ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm">Country ({getCountryLabel(country)})</span>
          </div>
          <div className="flex items-center gap-2">
            {driverProfile?.state ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm">State/Region</span>
          </div>
          <div className="flex items-center gap-2">
            {hasResume ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <span className="text-sm">CV/Resume</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Section */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Location Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="state">State/Region *</Label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                required
              >
                <option value="">Select your state/region</option>
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your country: {getCountryLabel(country)}
              </p>
            </div>

            <div>
              <Label htmlFor="city">City (Optional)</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Lagos, London"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* CV Upload Section */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">CV/Resume</h2>
          <div className="space-y-4">
            {driverProfile?.resumeUrl && !resumeFile && (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">CV Already Uploaded</p>
                  <p className="text-xs text-green-600">You can upload a new one to replace it</p>
                </div>
              </div>
            )}

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                resumeFile ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-primary-alt"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {resumeFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-green-500" />
                  <p className="font-medium">{resumeFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">Upload your CV</p>
                  <p className="text-xs text-muted-foreground">
                    PDF format, max 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Experience (Optional)</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experienceYears">Years of Experience</Label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">About You (Optional)</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell employers a bit about yourself, your experience, and what you're looking for..."
                rows={4}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={completeProfileMutation.isPending || isUploading}
          >
            Skip for Now
          </Button>
          <Button
            type="submit"
            disabled={completeProfileMutation.isPending || isUploading}
            className="bg-primary-alt text-black hover:bg-primary-alt/90"
          >
            {(completeProfileMutation.isPending || isUploading) && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Complete Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
