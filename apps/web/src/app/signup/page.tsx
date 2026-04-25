"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { trpcClient } from "@/utils/trpc";
import Logo from "@/components/logo";
import { COUNTRIES, type CountryCode } from "@/lib/location-data";

export default function SignUpPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"DRIVER" | "RECRUITER">("DRIVER");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState<CountryCode | "">("");
  const [recruiterCountry, setRecruiterCountry] = useState<CountryCode | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("fullname") as string;
    const phone = formData.get("phone") as string;
    const companyName = formData.get("companyName") as string;
    const recruiterPhone = formData.get("recruiterPhone") as string;

    // Validation for driver-specific fields
    if (userType === "DRIVER") {
      if (!phone) {
        setError("Phone number is required.");
        setIsLoading(false);
        return;
      }
      if (!country) {
        setError("Please select your country.");
        setIsLoading(false);
        return;
      }
    }

    // Validation for recruiter-specific fields
    if (userType === "RECRUITER") {
      if (!companyName) {
        setError("Company name is required.");
        setIsLoading(false);
        return;
      }
      if (!recruiterPhone) {
        setError("Phone number is required.");
        setIsLoading(false);
        return;
      }
      if (!recruiterCountry) {
        setError("Please select your location.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        role: userType,
        callbackURL: "/dashboard",
      });

      console.log("Signup result:", result);

      if (result.error) {
        console.error("Signup error:", result.error);
        setError(result.error.message || result.error.code || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      // For drivers, create initial profile with phone and country
      // Wait a moment for session to be established before TRPC call
      if (userType === "DRIVER" && phone && country) {
        // Small delay to ensure session cookie is set
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          await trpcClient.users.createInitialDriverProfile.mutate({
            phone,
            country,
          });
        } catch (profileErr) {
          // Profile creation failed, but user is created - they can complete profile later
          console.error("Initial profile creation failed:", profileErr);
        }
      }

      // For recruiters, create initial profile with company, phone and country
      if (userType === "RECRUITER" && companyName && recruiterPhone && recruiterCountry) {
        // Small delay to ensure session cookie is set
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          await trpcClient.users.createInitialRecruiterProfile.mutate({
            companyName,
            phone: recruiterPhone,
            country: recruiterCountry,
          });
        } catch (profileErr) {
          // Profile creation failed, but user is created - they can complete profile later
          console.error("Initial recruiter profile creation failed:", profileErr);
        }
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup exception:", err);
      const errorMessage = err?.message || err?.code || "Failed to create account. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Image */}
      <div className="hidden lg:flex flex-col bg-white relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
          <Logo />
        </div>

        <div className="flex items-center justify-center w-full h-full p-8">
          <Image
            src="/images/graphic-2.svg"
            alt="Sign Up Illustration"
            width={800}
            height={800}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Right Column - Sign Up Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Logo />
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-2">
              {userType === "DRIVER" ? "Get more opportunities" : "Find top drivers"}
            </h1>
            <p className="text-muted-foreground">
              {userType === "DRIVER"
                ? "Create an account to access thousands of driving jobs"
                : "Create an account to post jobs and find qualified drivers"}
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setUserType("DRIVER")}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                userType === "DRIVER"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Driver/Jobseeker
            </button>
            <button
              type="button"
              onClick={() => setUserType("RECRUITER")}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                userType === "RECRUITER"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <p>
              After you sign up, one of our agents will review your sign up and reach out to confirm your account and walk you through the available options. This extra step helps us deliver the highest-quality experience for both our drivers and carriers. Please submit only ONE job until an agent has contacted you.
            </p>
          </div>

          {/* Sign Up with Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-6"
            size="lg"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign Up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full name"
                className="py-6"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="py-6"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password (min 8 characters)"
                className="py-6"
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>

            {/* Driver-specific fields */}
            {userType === "DRIVER" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="py-6"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Location</Label>
                  <Select
                    value={country}
                    onValueChange={(value) => setCountry(value as CountryCode)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="py-6 h-auto">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Recruiter-specific fields */}
            {userType === "RECRUITER" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    className="py-6"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recruiterPhone">Phone Number</Label>
                  <Input
                    id="recruiterPhone"
                    name="recruiterPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="py-6"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recruiterCountry">Location</Label>
                  <Select
                    value={recruiterCountry}
                    onValueChange={(value) => setRecruiterCountry(value as CountryCode)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="py-6 h-auto">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Continue"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
