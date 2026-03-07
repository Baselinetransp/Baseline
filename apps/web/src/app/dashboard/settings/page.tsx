"use client";

import { useState } from "react";
import { Upload, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [accountType, setAccountType] = useState("jobseeker");

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
      {/* Header - Desktop Only */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "login"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Login Details
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "notifications"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-8">
          {activeTab === "profile" && (
            <div className="space-y-6 md:space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Basic Information</h2>
                <p className="text-sm text-muted-foreground mb-4 md:mb-6">
                  This is your personal information that you can update anytime.
                </p>

                {/* Profile Photo */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-medium mb-1 md:mb-2">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This image will be shown publicly as your profile picture, it will help recruiters recognize you!
                  </p>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl md:text-2xl font-semibold text-black">JG</span>
                    </div>
                    <div className="flex-1 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 md:p-8 text-center hover:border-primary-alt/50 transition-colors cursor-pointer">
                      <Upload className="h-6 w-6 md:h-8 md:w-8 text-primary-alt mx-auto mb-2" />
                      <p className="text-sm mb-1">
                        <span className="text-primary-alt font-medium">Click to replace</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h3 className="font-medium mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        defaultValue="Jake Gyll"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+44 1245 572 135"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="Jakegyll@gmail.com"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dob">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="dob"
                          type="text"
                          defaultValue="09/08/1997"
                          className="pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1.5">
                        <select
                          id="gender"
                          className="w-full h-10 px-3 py-2 border rounded-md bg-white text-sm appearance-none cursor-pointer"
                          defaultValue="male"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Type */}
                <div className="pt-6 border-t mt-6">
                  <h3 className="font-medium mb-1">Account Type</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can update your account type
                  </p>
                  <div className="space-y-3">
                    <div
                      onClick={() => setAccountType("jobseeker")}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        accountType === "jobseeker"
                          ? "border-primary-alt bg-primary-alt/5"
                          : "border-muted hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            accountType === "jobseeker" ? "border-primary-alt" : "border-muted-foreground"
                          }`}
                        >
                          {accountType === "jobseeker" && (
                            <div className="w-3 h-3 rounded-full bg-primary-alt"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-0.5">Job Seeker</h4>
                        <p className="text-sm text-muted-foreground">Looking for a job</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setAccountType("employer")}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        accountType === "employer"
                          ? "border-primary-alt bg-primary-alt/5"
                          : "border-muted hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            accountType === "employer" ? "border-primary-alt" : "border-muted-foreground"
                          }`}
                        >
                          {accountType === "employer" && (
                            <div className="w-3 h-3 rounded-full bg-primary-alt"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-0.5">Employer</h4>
                        <p className="text-sm text-muted-foreground">
                          Hiring, sourcing candidates, or posting a jobs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <Button className="w-full md:w-auto bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold px-8">
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Login Details</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Update your login credentials to keep your account secure.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="pt-4">
                    <Button className="w-full md:w-auto bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Basic Information</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  This is notifications preferences that you can update anytime.
                </p>

                <div className="border-b pb-6 mb-6">
                  <h3 className="font-medium mb-1">Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize your preferred notification settings
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="applications" defaultChecked className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="applications" className="font-medium cursor-pointer">
                          Applications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          These are notifications for jobs that you have applied to
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="jobs" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="jobs" className="font-medium cursor-pointer">
                          Jobs
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          These are notifications for job openings that suit your profile
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="recommendations" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="recommendations" className="font-medium cursor-pointer">
                          Recommendations
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          These are notifications for personalized recommendations from our recruiters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full md:w-auto bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
                    Update Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
