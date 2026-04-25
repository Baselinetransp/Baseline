"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Edit, Award, Truck, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

const DELETE_REASONS = [
  { value: "not_using", label: "I'm not using the platform anymore" },
  { value: "found_job", label: "I found a job through another platform" },
  { value: "privacy", label: "Privacy concerns" },
  { value: "too_many_emails", label: "Too many emails/notifications" },
  { value: "not_satisfied", label: "Not satisfied with the service" },
  { value: "other", label: "Other reason" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteDetails, setDeleteDetails] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const profile = {
    name: "Jake Gyll",
    title: "HGV Driver",
    company: "Swift Logistics",
    location: "Manchester, UK",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    licenseType: "Category C+E",
    yearsExperience: "8 years",
    openForOpportunities: true,
  };

  const aboutMe = `Experienced HGV driver with 8 years in long-haul and regional transport. Clean driving record, CPC qualified, and ADR certified. Reliable and punctual with strong knowledge of UK and European routes.`;

  const experiences = [
    {
      company: "Swift Logistics",
      logo: "🚛",
      position: "HGV Class 1 Driver",
      duration: "Mar 2020 - Present",
      type: "Full-Time",
      description:
        "Long-haul deliveries across UK and Europe. Responsible for vehicle checks, load security, and timely deliveries.",
    },
    {
      company: "Express Freight",
      logo: "📦",
      position: "HGV Class 2 Driver",
      duration: "Jan 2016 - Feb 2020",
      type: "Full-Time",
      description:
        "Regional distribution for retail clients. Multi-drop deliveries with excellent customer service record.",
    },
  ];

  const certifications = [
    { name: "Driver CPC", issuer: "DVSA", year: "2023" },
    { name: "ADR Certificate", issuer: "SQA", year: "2022" },
    { name: "Digital Tachograph Card", issuer: "DVLA", year: "2024" },
  ];

  // Delete account mutation
  const deleteAccountMutation = useMutation(
    trpc.users.deleteAccount.mutationOptions({
      onSuccess: async () => {
        // Sign out and redirect to home
        await authClient.signOut();
        router.push("/");
      },
      onError: (error) => {
        setDeleteError(error.message || "Failed to delete account. Please try again.");
        setIsDeleting(false);
      },
    })
  );

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      setDeleteError("Please type DELETE to confirm");
      return;
    }

    if (!deleteReason) {
      setDeleteError("Please select a reason for deletion");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    deleteAccountMutation.mutate({
      reason: deleteReason as "not_using" | "found_job" | "privacy" | "too_many_emails" | "not_satisfied" | "other",
      details: deleteDetails || undefined,
    });
  };

  const resetDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteReason("");
    setDeleteDetails("");
    setConfirmText("");
    setDeleteError("");
  };

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      {/* Mobile Profile Header */}
      <div className="md:hidden">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-20 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 relative">
            <div className="absolute -bottom-10 left-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-white">
                <span className="text-2xl font-semibold text-white">JG</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-12 px-4 pb-4">
            <h1 className="font-heading text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground mb-1">
              {profile.title} at {profile.company}
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" />
              <span>{profile.location}</span>
            </div>

            {profile.openForOpportunities && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">OPEN FOR OPPORTUNITIES</span>
              </div>
            )}

            <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-heading font-bold">My Profile</h1>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Sidebar - Profile Card (Desktop Only) */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg border overflow-hidden sticky top-24">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-semibold text-white">JG</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <h2 className="font-heading text-xl font-bold mb-1">{profile.name}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                {profile.title} at {profile.company}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>

              {profile.openForOpportunities && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">OPEN FOR OPPORTUNITIES</span>
                </div>
              )}

              <Link href="/dashboard/profile/edit">
                <Button variant="outline" className="w-full mb-3">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-4 md:space-y-6">
          {/* About Me */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">About Me</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {aboutMe}
            </p>
          </div>

          {/* Experiences */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Experiences</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="flex gap-3 md:gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl md:text-2xl">{exp.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base mb-0.5">{exp.position}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {exp.company} • {exp.type}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{exp.duration}</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Certifications</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & License Details */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Contact & License Details</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.licenseType}</span>
              </div>
            </div>
          </div>

          {/* Danger Zone - Delete Account */}
          <div className="bg-white rounded-lg border border-red-200 p-4 md:p-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-base md:text-lg text-red-600">Danger Zone</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. All your data, applications, and job postings will be permanently removed.
            </p>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Delete Account</h2>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>

              {deleteError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {deleteError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="deleteReason" className="text-sm font-medium">
                    Why are you deleting your account? *
                  </Label>
                  <select
                    id="deleteReason"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                  >
                    <option value="">Select a reason...</option>
                    {DELETE_REASONS.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="deleteDetails" className="text-sm font-medium">
                    Additional feedback (optional)
                  </Label>
                  <Textarea
                    id="deleteDetails"
                    value={deleteDetails}
                    onChange={(e) => setDeleteDetails(e.target.value)}
                    placeholder="Help us improve by sharing more details..."
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800 font-medium mb-2">
                    What will happen when you delete your account:
                  </p>
                  <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                    <li>Your profile and all personal information will be deleted</li>
                    <li>All your job applications will be removed</li>
                    <li>Any job postings you created will be deactivated</li>
                    <li>You will lose access to your message history</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="confirmText" className="text-sm font-medium">
                    Type <span className="font-bold text-red-600">DELETE</span> to confirm *
                  </Label>
                  <input
                    id="confirmText"
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetDeleteModal}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmText !== "DELETE"}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete My Account"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
