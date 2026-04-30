export const properties = [
  {
    id: "p1",
    title: "Pixoul Gaming Arena",
    date: "05 Oct, 2025",
    address: "Al Khaleej Al Arabi St, Rabdan Area, Abu Dhabi, UAE",
    venues: 6,
    status: "Published",
    rating: 4.8,
    totalBookings: 134,
    revenue: 48200,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "The Hall at Pixoul Gaming, Al Qana",
    date: "20 May, 2025",
    address: "Al Qana Walk – Rabdan, Abu Dhabi, UAE",
    venues: 4,
    status: "Published",
    rating: 4.6,
    totalBookings: 89,
    revenue: 31750,
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80&auto=format&fit=crop",
  },
];

export const inquiries = [
  {
    id: "i1",
    name: "Ahmed Al Mansoori",
    email: "ahmed@damacgroup.ae",
    property: "Pixoul Gaming Arena",
    date: "2025-04-12",
    status: "New",
    message: "Looking for a corporate event venue for 200 guests in May.",
    budget: "AED 15,000",
    eventType: "Corporate",
  },
  {
    id: "i2",
    name: "Sara Khan",
    email: "sara.k@etihadair.com",
    property: "The Hall at Pixoul Gaming",
    date: "2025-04-10",
    status: "Replied",
    message: "Need pricing and availability for a product launch.",
    budget: "AED 22,000",
    eventType: "Launch Event",
  },
  {
    id: "i3",
    name: "Mohammed Yusuf",
    email: "m.yusuf@adnoc.ae",
    property: "Pixoul Gaming Arena",
    date: "2025-04-08",
    status: "Closed",
    message: "Wedding reception inquiry — 350 guests.",
    budget: "AED 40,000",
    eventType: "Wedding",
  },
  {
    id: "i4",
    name: "Fatima Al Rashidi",
    email: "f.rashidi@dewa.gov.ae",
    property: "The Hall at Pixoul Gaming",
    date: "2025-04-06",
    status: "New",
    message: "Government conference for 120 delegates.",
    budget: "AED 18,000",
    eventType: "Conference",
  },
  {
    id: "i5",
    name: "James O'Brien",
    email: "james@eventscorp.com",
    property: "Pixoul Gaming Arena",
    date: "2025-04-04",
    status: "Replied",
    message: "Annual awards night — 500+ attendees, full AV setup needed.",
    budget: "AED 55,000",
    eventType: "Awards Night",
  },
];

export const inboxMessages = [
  {
    id: "m1",
    from: "Elvie Events",
    subject: "Welcome to your dashboard",
    preview:
      "Welcome aboard! Your dashboard is your control center for managing properties, inquiries, and bookings.",
    date: "2025-10-07 15:52:01",
    unread: true,
  },
  {
    id: "m2",
    from: "Billing Team",
    subject: "Your subscription is active",
    preview: "Thank you for upgrading to the Premium plan. You now have full access.",
    date: "2025-10-05 09:14:22",
    unread: false,
  },
];

export const transactions = [
  {
    id: "t1",
    date: "2025-04-01",
    desc: "Premium Plan – Monthly",
    amount: 499,
    status: "Paid",
    method: "Visa **** 4242",
  },
  {
    id: "t2",
    date: "2025-03-01",
    desc: "Premium Plan – Monthly",
    amount: 499,
    status: "Paid",
    method: "Visa **** 4242",
  },
  {
    id: "t3",
    date: "2025-02-15",
    desc: "Featured Listing Add-on",
    amount: 199,
    status: "Paid",
    method: "Visa **** 4242",
  },
  {
    id: "t4",
    date: "2025-02-01",
    desc: "Starter Plan – Monthly",
    amount: 199,
    status: "Refunded",
    method: "Visa **** 4242",
  },
];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 199,
    features: ["1 Property listing", "Basic analytics", "Email support"],
    current: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    features: [
      "Up to 5 Properties",
      "Advanced analytics",
      "Priority inquiries",
      "Featured placement",
      "24/7 support",
    ],
    current: true,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1299,
    features: [
      "Unlimited properties",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "SLA guarantees",
    ],
    current: false,
  },
];

export const monthlyViews = [
  { month: "Oct", views: 2, inquiries: 1, bookings: 0 },
  { month: "Nov", views: 3, inquiries: 2, bookings: 1 },
  { month: "Dec", views: 2, inquiries: 1, bookings: 1 },
  { month: "Jan", views: 3, inquiries: 3, bookings: 2 },
  { month: "Feb", views: 8, inquiries: 5, bookings: 4 },
  { month: "Mar", views: 18, inquiries: 9, bookings: 8 },
];

export const revenueData = [
  { month: "Oct", revenue: 4200, target: 5000 },
  { month: "Nov", revenue: 6800, target: 7000 },
  { month: "Dec", revenue: 9200, target: 8000 },
  { month: "Jan", revenue: 7400, target: 9000 },
  { month: "Feb", revenue: 11500, target: 10000 },
  { month: "Mar", revenue: 15800, target: 12000 },
];

export const eventTypeBreakdown = [
  { type: "Corporate", count: 42, color: "#3b82f6" },
  { type: "Wedding", count: 28, color: "#f59e0b" },
  { type: "Conference", count: 19, color: "#8b5cf6" },
  { type: "Launch Event", count: 16, color: "#10b981" },
  { type: "Government Event", count: 14, color: "#06b6d4" },
  { type: "Outdoor Event", count: 9, color: "#ec4899" },
  { type: "Other", count: 6, color: "#6b7280" },
];

export const recentActivity = [
  { id: "a1", type: "inquiry", text: "New inquiry from Ahmed Al Mansoori", time: "2 min ago", icon: "message" },
  { id: "a2", type: "booking", text: "Booking confirmed — Sara Khan, Apr 20", time: "1 hr ago", icon: "check" },
  { id: "a3", type: "review", text: "⭐⭐⭐⭐⭐ New 5-star review received", time: "3 hrs ago", icon: "star" },
  { id: "a4", type: "payment", text: "Payment of AED 8,400 received", time: "Yesterday", icon: "payment" },
  { id: "a5", type: "inquiry", text: "New inquiry from James O'Brien", time: "Yesterday", icon: "message" },
];
