"use client";

import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const helpCategories = [
  {
    title: "Getting Started",
    articles: [
      "How to create your profile",
      "Uploading your CV/Resume",
      "Setting up job alerts",
      "Understanding the dashboard",
    ],
  },
  {
    title: "Job Applications",
    articles: [
      "How to apply for jobs",
      "Tracking your applications",
      "Withdrawing an application",
      "Following up on applications",
    ],
  },
  {
    title: "Account Settings",
    articles: [
      "Updating your profile",
      "Changing your password",
      "Managing notifications",
      "Privacy settings",
    ],
  },
  {
    title: "Troubleshooting",
    articles: [
      "Login issues",
      "Application not submitting",
      "Email notifications not received",
      "Profile not updating",
    ],
  },
];

const faqs = [
  {
    question: "How do I apply for a job?",
    answer:
      "Click on any job listing, review the details, and click the 'Apply' button. You'll need to complete your profile first.",
  },
  {
    question: "Can I edit my application after submitting?",
    answer:
      "No, once submitted, applications cannot be edited. However, you can withdraw and reapply if the job is still open.",
  },
  {
    question: "How long does it take to hear back from employers?",
    answer:
      "Response times vary by employer. Typically, you should hear back within 1-2 weeks. You can track your application status in the dashboard.",
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground">Find answers to common questions and get support</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for help..." className="pl-12 py-6 text-lg" />
      </div>

      {/* Help Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {helpCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
            <div className="space-y-2">
              {category.articles.map((article, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors text-left"
                >
                  <span className="text-sm text-muted-foreground">{article}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-6 border-b last:border-0">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-primary-alt/10 border border-primary-alt/20 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Still need help?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <button className="px-6 py-2 bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold rounded-lg transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
