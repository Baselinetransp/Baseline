// Location data for Nigeria and UK

export const COUNTRIES = [
  { value: "NG", label: "Nigeria" },
  { value: "UK", label: "United Kingdom" },
] as const;

export type CountryCode = typeof COUNTRIES[number]["value"];

// Nigerian States
export const NIGERIAN_STATES = [
  { value: "abia", label: "Abia" },
  { value: "adamawa", label: "Adamawa" },
  { value: "akwa-ibom", label: "Akwa Ibom" },
  { value: "anambra", label: "Anambra" },
  { value: "bauchi", label: "Bauchi" },
  { value: "bayelsa", label: "Bayelsa" },
  { value: "benue", label: "Benue" },
  { value: "borno", label: "Borno" },
  { value: "cross-river", label: "Cross River" },
  { value: "delta", label: "Delta" },
  { value: "ebonyi", label: "Ebonyi" },
  { value: "edo", label: "Edo" },
  { value: "ekiti", label: "Ekiti" },
  { value: "enugu", label: "Enugu" },
  { value: "fct", label: "FCT (Abuja)" },
  { value: "gombe", label: "Gombe" },
  { value: "imo", label: "Imo" },
  { value: "jigawa", label: "Jigawa" },
  { value: "kaduna", label: "Kaduna" },
  { value: "kano", label: "Kano" },
  { value: "katsina", label: "Katsina" },
  { value: "kebbi", label: "Kebbi" },
  { value: "kogi", label: "Kogi" },
  { value: "kwara", label: "Kwara" },
  { value: "lagos", label: "Lagos" },
  { value: "nasarawa", label: "Nasarawa" },
  { value: "niger", label: "Niger" },
  { value: "ogun", label: "Ogun" },
  { value: "ondo", label: "Ondo" },
  { value: "osun", label: "Osun" },
  { value: "oyo", label: "Oyo" },
  { value: "plateau", label: "Plateau" },
  { value: "rivers", label: "Rivers" },
  { value: "sokoto", label: "Sokoto" },
  { value: "taraba", label: "Taraba" },
  { value: "yobe", label: "Yobe" },
  { value: "zamfara", label: "Zamfara" },
] as const;

// UK Regions/Counties
export const UK_REGIONS = [
  // England - Regions
  { value: "east-midlands", label: "East Midlands" },
  { value: "east-of-england", label: "East of England" },
  { value: "london", label: "London" },
  { value: "north-east", label: "North East" },
  { value: "north-west", label: "North West" },
  { value: "south-east", label: "South East" },
  { value: "south-west", label: "South West" },
  { value: "west-midlands", label: "West Midlands" },
  { value: "yorkshire", label: "Yorkshire and the Humber" },
  // Scotland
  { value: "scotland-central", label: "Central Scotland" },
  { value: "scotland-highlands", label: "Highlands and Islands" },
  { value: "scotland-lowlands", label: "Lowlands" },
  { value: "scotland-north-east", label: "North East Scotland" },
  // Wales
  { value: "wales-north", label: "North Wales" },
  { value: "wales-mid", label: "Mid Wales" },
  { value: "wales-south", label: "South Wales" },
  // Northern Ireland
  { value: "northern-ireland", label: "Northern Ireland" },
] as const;

// Helper function to get states/regions by country
export function getRegionsByCountry(countryCode: CountryCode) {
  switch (countryCode) {
    case "NG":
      return NIGERIAN_STATES;
    case "UK":
      return UK_REGIONS;
    default:
      return [];
  }
}

// Get country label by code
export function getCountryLabel(countryCode: string): string {
  const country = COUNTRIES.find((c) => c.value === countryCode);
  return country?.label ?? countryCode;
}

// Get region label by value and country
export function getRegionLabel(regionValue: string, countryCode: string): string {
  const regions = getRegionsByCountry(countryCode as CountryCode);
  const region = regions.find((r) => r.value === regionValue);
  return region?.label ?? regionValue;
}
