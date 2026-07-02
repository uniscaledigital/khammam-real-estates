import type { Database } from "@/integrations/supabase/types";

export type ExtendedProperty = Database["public"]["Tables"]["properties"]["Row"] & {
  video_url?: string;
  map_url?: string;
  title_te?: string;
  description_te?: string;
  amenities_te?: string[];
};

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Requirement = Database["public"]["Tables"]["requirements"]["Row"];
type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

export const mockProperties: ExtendedProperty[] = [
  {
    id: "1",
    title: "KUDA Layout Plots For Sale",
    title_te: "",
    slug: "kuda-layout-plots",
    description: "Premium KUDA layout plots available for sale in Rampur near Warangal. Plot sizes available in 100, 150 and 200 square yards. Located only 4 minutes from the National Highway. Loan facility available. Suitable for residential construction and long-term investment.",
    description_te: "రాంపూర్ సమీపంలో KUDA లేఅవుట్ ప్లాట్లు అమ్మకానికి అందుబాటులో ఉన్నాయి. 100, 150 మరియు 200 గజాల ప్లాట్లు లభిస్తాయి. నేషనల్ హైవే నుండి కేవలం 4 నిమిషాల దూరంలో ఉన్నాయి. లోన్ సౌకర్యం అందుబాటులో ఉంది. నివాస మరియు పెట్టుబడి అవసరాలకు అనుకూలం.",
    price: 6999,
    listing_type: "sale",
    property_type: "Residential Plot",
    status: "ready_to_move",
    bedrooms: 0,
    bathrooms: 0,
    area_sqft: 0,
    address: "Rampur Village",
    locality: "Warangal Mandal",
    city: "Hanamkonda",
    state: "Telangana",
    pincode: "506001",
    images: ["/images/kuda-plot.jpeg"],
    amenities: ["100 Sq Yards", "150 Sq Yards", "200 Sq Yards", "Loan Eligibility Available", "KUDA Layout", "Investment Opportunity", "Ready For Registration", "4 Minutes Drive To National Highway"],
    featured: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    map_url: "https://maps.app.goo.gl/ioGqj5gQi5pV5S946?g_st=awb",
    video_url: "https://youtube.com/shorts/HBJpo4xG1wI?si=Z6zENznYx7taDvXx"
  },
  {
    id: "2",
    title: "East Facing Independent House For Sale",
    title_te: "",
    slug: "east-facing-independent-house",
    description: "East-facing independent house built on 135 square yards. Pillar construction with 3 rooms. Located in a peaceful residential area of Warangal. Ideal for families seeking a ready-to-move home.",
    description_te: "135 గజాల స్థలంలో నిర్మించిన ఈస్ట్ ఫేసింగ్ ఇండిపెండెంట్ హౌస్ అమ్మకానికి అందుబాటులో ఉంది. 3 గదులు మరియు పిలర్ నిర్మాణంతో నిర్మించబడింది. వరంగల్ లోని ప్రశాంతమైన నివాస ప్రాంతంలో ఉంది.",
    price: 4500000,
    listing_type: "sale",
    property_type: "Independent House",
    status: "ready_to_move",
    bedrooms: 3,
    bathrooms: 0,
    area_sqft: 135,
    address: "Warangal",
    locality: "Warangal",
    city: "Hanamkonda",
    state: "Telangana",
    pincode: "506001",
    images: ["/images/east-facing.png"],
    amenities: ["East Facing", "3 Rooms", "With Pillars", "Slightly Negotiable"],
    featured: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    video_url: "https://youtube.com/shorts/OQoWS-nELsg?si=Af_0Asuj8UtroxDZ"
  },
  {
    id: "3",
    title: "West Facing 1 BHK House For Sale",
    title_te: "",
    slug: "west-facing-1-bhk",
    description: "West-facing 1 BHK house built on a 200-square-yard plot with dimensions of 24 x 75. Located in Warangal. Suitable for residential use and future expansion.",
    description_te: "200 గజాల స్థలంలో 24x75 కొలతలతో నిర్మించిన వెస్ట్ ఫేసింగ్ 1 BHK హౌస్ అమ్మకానికి అందుబాటులో ఉంది. వరంగల్ లో మంచి ప్రాంతంలో ఉంది.",
    price: 7200000,
    listing_type: "sale",
    property_type: "Independent House",
    status: "ready_to_move",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 200,
    address: "Warangal",
    locality: "Warangal",
    city: "Hanamkonda",
    state: "Telangana",
    pincode: "506001",
    images: ["/images/west-facing.jpeg"],
    amenities: ["West Facing", "1 BHK", "24 x 75 Dimensions", "Slightly Negotiable"],
    featured: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    video_url: "https://youtube.com/shorts/RAkX5NtLzOI?si=jz14PXRgQM5klri6"
  }
];

export type ExtendedProject = Database["public"]["Tables"]["projects"]["Row"] & {
  price?: number;
  available_prices?: number[];
  amenities?: string[];
  map_url?: string;
  phone?: string;
  whatsapp?: string;
  featured?: boolean;
};

export const mockProjects: ExtendedProject[] = [
  {
    id: "p1",
    slug: "white-dtcp-layout",
    name: "White DTCP Layout",
    location: "Khammam",
    status: "ready_to_move",
    price: 15000,
    featured: true,
    description: "Premium residential DTCP approved layout offering excellent connectivity and modern infrastructure. Ideal for immediate construction or long-term investment.",
    images: ["/images/east-facing.png"],
    amenities: ["DTCP Approved", "Premium Residential Layout", "Ready for Registration", "Suitable for Investment"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p2",
    slug: "jilledu-road-nn-murali",
    name: "Jilledu Road N.N. Murali G.V. Layout",
    location: "Khammam",
    status: "ready_to_move",
    price: 12500,
    featured: true,
    description: "Strategically located layout on Jilledu Road. Excellent investment opportunity with clear titles and DTCP approval.",
    images: ["/images/kuda-plot.jpeg"],
    amenities: ["DTCP Approved", "Clear Title", "Prime Location"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p3",
    slug: "tech-city-dtcp-layout",
    name: "Tech City DTCP Layout",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [14000, 15000, 16000],
    featured: true,
    description: "A fast-developing tech corridor layout offering multiple plot sizes and price points for diverse investor needs.",
    images: ["/images/west-facing.jpeg"],
    amenities: ["DTCP Approved", "Multiple Plot Sizes", "High Growth Area", "Water & Electricity"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p4",
    slug: "avenue-1-dtcp-layout",
    name: "Avenue 1 DTCP Layout",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [12700, 14500, 18000],
    description: "Avenue 1 provides premium living spaces with top-notch amenities, designed for a modern lifestyle.",
    images: ["/images/east-facing.png"],
    amenities: ["DTCP Approved", "Modern Amenities", "Spacious Layouts"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p5",
    slug: "avenue-2-dtcp-layout",
    name: "Avenue 2 DTCP Layout",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [14500, 16500],
    description: "The highly anticipated Phase 2 of our Avenue series, bringing even more refined living options.",
    images: ["/images/kuda-plot.jpeg"],
    amenities: ["DTCP Approved", "Phase 2 Development", "Greenery & Parks"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p6",
    slug: "kingdom-dtcp-layout",
    name: "Kingdom DTCP Layout",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [15800, 16000, 16200],
    description: "A royal lifestyle awaits at Kingdom DTCP Layout. Secure, gated, and elegantly planned.",
    images: ["/images/west-facing.jpeg"],
    amenities: ["DTCP Approved", "Gated Community", "24/7 Security"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p7",
    slug: "nature-valley",
    name: "Nature Valley",
    location: "Khammam",
    status: "ready_to_move",
    price: 14000,
    description: "Immerse yourself in nature. A serene layout surrounded by lush greenery, perfect for a peaceful home.",
    images: ["/images/east-facing.png"],
    amenities: ["Eco-friendly", "Lush Greenery", "Peaceful Environment"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p8",
    slug: "kubera-township",
    name: "Kubera Township",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [12500, 13000],
    description: "A complete township experience with integrated facilities for all your family's needs.",
    images: ["/images/kuda-plot.jpeg"],
    amenities: ["Integrated Township", "Commercial Zones Nearby", "Wide Roads"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p9",
    slug: "indi-bharath-phase-2",
    name: "Indi Bharath Project Phase 2",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [13600, 13900, 14100],
    description: "The successful Indi Bharath project expands with Phase 2, offering excellent value and appreciation potential.",
    images: ["/images/west-facing.jpeg"],
    amenities: ["High Appreciation", "Well Connected", "Clear Titles"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p10",
    slug: "dharshini-phase-2",
    name: "Dharshini Phase 2",
    location: "Khammam",
    status: "ready_to_move",
    available_prices: [13000, 13500, 13900],
    description: "Dharshini Phase 2 presents a great opportunity to own a plot in a rapidly developing neighborhood.",
    images: ["/images/east-facing.png"],
    amenities: ["Rapid Development", "Good Connectivity", "Investment Grade"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  },
  {
    id: "p11",
    slug: "pushkar-city",
    name: "Pushkar City",
    location: "Khammam",
    status: "ready_to_move",
    price: 13500,
    description: "A city within a city. Pushkar City offers well-laid out plots with excellent future prospects.",
    images: ["/images/kuda-plot.jpeg"],
    amenities: ["Large Township", "Future Ready", "Vastu Compliant"],
    phone: "8186871820",
    whatsapp: "918186871820",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    developer: "Khammam Real Estates"
  }
];
export const mockRequirements: Requirement[] = [];
export const mockContactMessages: ContactMessage[] = [];
