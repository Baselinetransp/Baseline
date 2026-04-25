# TRANSPORT HUB PLATFORM

## Full Requirements Engineering Document

Prepared by: Peter Mayowa

Date: 22/2/2026

**1. Project Overview**

Subscription-based transport recruitment platform for UK and Nigeria.

Recruiters post jobs; drivers apply.

Automated email notifications on application.

Admin moderation and monitoring.

Platform acts strictly as a technology intermediary.


## 2. Technical Architecture Requirements

Backend: Node.js with Express.js (compatible with Hostinger).

Frontend: React with TanStack (TypeScript).

ORM: Prisma.

Database: MySQL (Managed by Hostinger Business Plan).

Hosting: Hostinger Business Plan (2 CPU, 3GB RAM, 50GB NVMe storage)- Best hosting plan .


## 3. File Upload & Storage Requirements

Applicants upload CV (PDF/DOC/DOCX) and optional profile photo (JPG/PNG).

Multer middleware for file handling.

Upload limits: CV 5MB max, Photo 2MB max.

Option A: Use Hostinger 50GB NVMe storage (included).

Option B: External cloud storage (AWS S3, DigitalOcean, Backblaze) ~ $10/month.


## 4. Authentication System

Better Auth for user authentication.

Tables: users, accounts, sessions, verifications.

Email verification and password reset included.


## 5. Required Database Tables

Better Auth tables: users, accounts, sessions, verifications.

Company table.

Jobs table.

Applications table.

Subscriptions table.

Payments table.

Notifications table.

Adverts table.

Audit Logs table.


## 6. Email System Requirements

Signup verification emails.

Password reset emails.

Application notification emails.

Subscription activation and expiry emails.

**Option A:** Hostinger SMTP (included, limited reliability).

**Option B: **Third-party provider (SendGrid/Mailgun)  (~$10–$25/month).

Both Option yet to be decided on

## 7. Subscription & Payment Requirements

Stripe (UK) or Paystack (Nigeria).

Webhook integration required.

Transaction fees apply based on provider.


## 8. Compliance Requirements

UK: GDPR & Data Protection Act 2018.

Nigeria: Nigeria Data Protection Act 2023.

Encrypted storage and role-based access control.

Automated subscription-based data deletion.

Audit logs for data access and deletion.

Optional photo with explicit consent.

No biometric processing.


## 9. Accessibility Requirements

WCAG-compliant contrast ratios.

Keyboard navigation support.

Screen reader compatibility.

Responsive mobile-friendly design.

Primary fonts: Epilogue (body), inter (headings).

Primary colors: orange brown gradient (transport), Dark navy (professional).


## 10. Client Cost Awareness

Hostinger Business Plan subscription cost.

Optional email service (~$10–$25/month).

Optional external file storage (~$10/month).

Payment gateway transaction fees.

Future hosting upgrade as platform scales.

## 11. Free Posting & Paid Visibility Model

Recruiters may post jobs for FREE with limited visibility and restricted dashboard access.

Free postings will have basic listing exposure without advanced analytics or application filtering.

Paid users gain full dashboard access, advanced filtering, analytics, and enhanced visibility.

Top Ads: One-time payment to appear at the top of listings for a fixed period (e.g., 7 or 30 days).

Boost Packages: Increased visibility across search results and similar listings; can auto-refresh ads every few hours.

Pro Sales Model: Budget-based promotion where recruiters are charged per click (similar to Google Ads or Facebook Ads).

These paid visibility options are optional upgrades and serve as additional revenue streams.



## 12. Key Client Decisions Required

Local storage or cloud storage for files?- can be decided later

Hostinger SMTP or third-party email provider?- can be decided  later

Client email for registration on different platforms eg github,notion : should be provided now


## 13. Conclusion

Platform can be built as a simple job board or scalable recruitment SaaS.

Final architecture and cost depend on scope decisions.

Strategic alignment required before development begins.




