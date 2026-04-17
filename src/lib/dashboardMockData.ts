export const properties = [
  {
    id: "p1",
    title: "Pixoul Gaming Arena",
    date: "05 Oct, 2025",
    address: "Al Khaleej Al Arabi St, Rabdan Area, Abu Dhabi, UAE",
    venues: 6,
    status: "Published",
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
  },
  {
    id: "i2",
    name: "Sara Khan",
    email: "sara.k@etihadair.com",
    property: "The Hall at Pixoul Gaming",
    date: "2025-04-10",
    status: "Replied",
    message: "Need pricing and availability for a product launch.",
  },
  {
    id: "i3",
    name: "Mohammed Yusuf",
    email: "m.yusuf@adnoc.ae",
    property: "Pixoul Gaming Arena",
    date: "2025-04-08",
    status: "Closed",
    message: "Wedding reception inquiry — 350 guests.",
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
  { month: "Oct", views: 2 },
  { month: "Nov", views: 3 },
  { month: "Dec", views: 2 },
  { month: "Jan", views: 3 },
  { month: "Feb", views: 8 },
  { month: "Mar", views: 18 },
];
