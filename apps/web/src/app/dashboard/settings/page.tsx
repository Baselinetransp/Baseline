"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [accountType, setAccountType] = useState("jobseeker");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "login"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Login Details
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "notifications"
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  This is your personal information that you can update anytime.
                </p>

                {/* Profile Photo */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This image will be shown publicly as your profile picture, it will help recruiters recognize you!
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-black">JG</span>
                    </div>
                    <div className="flex-1 border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-primary-alt/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-primary-alt mx-auto mb-2" />
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
                        placeholder="This is placeholder"
                        className="mt-1.5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="This is placeholder"
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
                          placeholder="This is placeholder"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dob">
                          Date of Birth <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="dob"
                          type="date"
                          placeholder="This is placeholder"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="gender"
                          type="text"
                          placeholder="This is placeholder"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Type */}
                <div className="pt-6 border-t">
                  <h3 className="font-medium mb-2">Account Type</h3>
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
                        <h4 className="font-medium mb-1">Job Seeker</h4>
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
                        <h4 className="font-medium mb-1">Employer</h4>
                        <p className="text-sm text-muted-foreground">
                          Hiring, sourcing candidates, or posting jobs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 flex justify-end">
                  <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold px-8">
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Login Details</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Update your login credentials to keep your account secure.
                </p>

                <div className="space-y-4 max-w-md">
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
                    <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
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
                <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose how you want to be notified about updates and activity.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start justify-between py-4 border-b">
                    <div>
                      <h4 className="font-medium mb-1">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about your applications
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-gray-200 peer-checked:bg-primary-alt rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between py-4 border-b">
                    <div>
                      <h4 className="font-medium mb-1">Application Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when companies review your applications
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-gray-200 peer-checked:bg-primary-alt rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between py-4 border-b">
                    <div>
                      <h4 className="font-medium mb-1">Job Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive personalized job recommendations based on your profile
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-gray-200 peer-checked:bg-primary-alt rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between py-4 border-b">
                    <div>
                      <h4 className="font-medium mb-1">Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive new messages from employers
                      </p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-gray-200 peer-checked:bg-primary-alt rounded-full peer transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
