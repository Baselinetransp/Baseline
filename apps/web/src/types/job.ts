export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY";
export type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "EXECUTIVE";

export type JobCategory =
  | "CAR_BASED"
  | "VAN_BASED"
  | "TRUCK_LORRY"
  | "BUS_PASSENGER"
  | "MOTORCYCLE_BASED"
  | "BICYCLE_BASED"
  | "CONSTRUCTION_INDUSTRIAL"
  | "VEHICLE_MAINTENANCE"
  | "TRANSPORT_MANAGEMENT";

export const JOB_CATEGORIES = [
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
] as const;

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: "HOURLY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  };
  type: JobType;
  category: JobCategory;
  jobRole?: string;
  experienceLevel: ExperienceLevel;
  requirements?: string[];
  benefits?: string[];
  isRemote: boolean;
  postedAt: Date;
  expiresAt?: Date;
  recruiterId: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: JobType[];
  category?: JobCategory[];
  experienceLevel?: ExperienceLevel[];
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  page?: number;
  limit?: number;
}

export interface JobSearchResult {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}
