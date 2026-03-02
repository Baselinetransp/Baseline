import prisma from "@baseline/db";


async function main() {
  console.log("🌱 Seeding database...");

  // Create a sample company
  const company = await prisma.company.upsert({
    where: { slug: "acme-logistics" },
    update: {},
    create: {
      name: "ACME Logistics",
      slug: "acme-logistics",
      description: "A leading logistics and transportation company serving the continental US.",
      industry: "Transportation & Logistics",
      size: "201-500",
      city: "Chicago",
      state: "IL",
      country: "US",
      isVerified: true,
    },
  });

  console.log("✅ Created company:", company.name);

  // Create a recruiter user
  const recruiterUser = await prisma.user.upsert({
    where: { email: "recruiter@acmelogistics.com" },
    update: {},
    create: {
      email: "recruiter@acmelogistics.com",
      name: "Jane Smith",
      role: "RECRUITER",
      emailVerified: true,
      accounts: {
        create: {
          accountId: "seed-recruiter-account",
          providerId: "credential",
          password: "$2b$10$placeholder_hashed_password", // Use a proper hash in production
        },
      },
      recruiterProfile: {
        create: {
          companyId: company.id,
          title: "Talent Acquisition Manager",
          phone: "+1-312-555-0100",
        },
      },
    },
    include: { recruiterProfile: true },
  });

  // Create sample jobs
  const jobs = [
    {
      title: "CDL-A Long Haul Truck Driver",
      slug: "cdl-a-long-haul-truck-driver-chicago",
      description: `
We are looking for experienced CDL-A Long Haul Truck Drivers to join our growing fleet. 
You will be responsible for transporting goods across state lines with a focus on safety, 
timeliness, and customer satisfaction.

**What You'll Do:**
- Operate Class A tractor-trailer trucks on long-haul routes
- Ensure safe loading and unloading of cargo
- Maintain accurate logs using ELD systems
- Conduct pre-trip and post-trip vehicle inspections
- Communicate proactively with dispatch and customers

**What We Offer:**
- Competitive per-mile pay + bonuses
- Home weekends (most runs)
- Full benefits package after 90 days
- Late-model equipment (2022+ tractors)
- Rider and pet policies
      `.trim(),
      requirements: "Valid CDL-A license. Minimum 2 years OTR experience. Clean MVR.",
      benefits: "Health/Dental/Vision, 401k with 4% match, Paid time off, Rider policy",
      jobType: "FULL_TIME" as const,
      status: "PUBLISHED" as const,
      city: "Chicago",
      state: "IL",
      licenseRequired: ["CDL_A"],
      experienceLevel: "MID" as const,
      salaryMin: 700000, // $7,000/month
      salaryMax: 1000000, // $10,000/month
    },
    {
      title: "Local Delivery Driver (Class B)",
      slug: "local-delivery-driver-class-b-chicago",
      description: `
Join our local delivery team! As a Class B driver you'll be making daily deliveries within 
the Chicago metro area. Home every night, weekends off.

**Key Responsibilities:**
- Complete 8–12 daily delivery stops
- Safely operate straight trucks up to 26,000 lbs GVW
- Maintain delivery documentation and chain-of-custody
- Provide excellent customer service at each stop
      `.trim(),
      requirements: "Valid CDL-B or Class B license. 1+ year delivery experience preferred.",
      benefits: "Health insurance, Paid holidays, Overtime opportunities",
      jobType: "FULL_TIME" as const,
      status: "PUBLISHED" as const,
      city: "Chicago",
      state: "IL",
      licenseRequired: ["CDL_B"],
      experienceLevel: "JUNIOR" as const,
      salaryMin: 420000, // $4,200/month
      salaryMax: 560000, // $5,600/month
    },
    {
      title: "Regional CDL-A Driver – Hazmat Certified",
      slug: "regional-cdl-a-hazmat-driver",
      description: `
Seeking a Hazmat-certified CDL-A driver for our regional chemical transport division. 
Routes cover the Midwest region with 2–3 nights out per week.
      `.trim(),
      requirements: "CDL-A with Hazmat endorsement required. TWIC card preferred. 3+ years experience.",
      benefits: "Premium pay rate, Hazmat differential, Full benefits",
      jobType: "FULL_TIME" as const,
      status: "PUBLISHED" as const,
      city: "Milwaukee",
      state: "WI",
      licenseRequired: ["CDL_A", "HAZMAT"],
      experienceLevel: "SENIOR" as const,
      salaryMin: 900000,
      salaryMax: 1200000,
    },
  ];

  const recruiterProfile = recruiterUser.recruiterProfile!;

  for (const jobData of jobs) {
    await prisma.job.upsert({
      where: { slug: jobData.slug },
      update: {},
      create: {
        ...jobData,
        recruiterId: recruiterProfile.id,
        companyId: company.id,
      },
    });
    console.log("✅ Created job:", jobData.title);
  }

  // Create a sample driver user
  await prisma.user.upsert({
    where: { email: "driver@example.com" },
    update: {},
    create: {
      email: "driver@example.com",
      name: "John Doe",
      role: "DRIVER",
      emailVerified: true,
      accounts: {
        create: {
          accountId: "seed-driver-account",
          providerId: "credential",
          password: "$2b$10$placeholder_hashed_password",
        },
      },
      driverProfile: {
        create: {
          phone: "+1-312-555-0200",
          city: "Chicago",
          state: "IL",
          country: "US",
          bio: "Professional CDL-A driver with 8 years of OTR experience. Clean MVR, no accidents.",
          experienceYears: 8,
          experienceLevel: "SENIOR",
          licenseClasses: ["CDL_A"],
          endorsements: ["HAZMAT", "TANKER"],
          willingToRelocate: false,
          expectedSalary: 900000,
          isProfilePublic: true,
        },
      },
    },
  });

  console.log("✅ Created sample driver user");
  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
