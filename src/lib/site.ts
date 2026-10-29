export const SITE = {
  name: "Meridian Family Health",
  shortName: "Meridian",
  tagline: "Family medicine, calibrated to a lifetime.",
  phone: "(555) 314-2200",
  phoneHref: "tel:+15553142200",
  email: "hello@meridianfamilyhealth.com",
  address: {
    line1: "482 Birchwood Lane, Suite 200",
    line2: "Cedar Falls",
  },
  hours: [
    { day: "Monday to Friday", time: "8:00 AM to 6:00 PM" },
    { day: "Saturday", time: "9:00 AM to 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Team", href: "/team" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    slug: "primary-care",
    name: "Primary & Preventive Care",
    short: "Primary",
    summary: "Annual physicals, screenings and ongoing care, planned around your history.",
    detail:
      "Visits are long enough to review your history, order the screenings that fit your age and follow up on small things before they grow.",
  },
  {
    slug: "pediatric-care",
    name: "Pediatric Care",
    short: "Pediatric",
    summary: "Well-child visits, vaccinations and developmental checkups from infancy to the teen years.",
    detail:
      "Newborn visits, sports physicals and everything between. We track growth, keep vaccinations on schedule and explain each step to your child as we go.",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    short: "Women's",
    summary: "Wellness exams, prenatal care, contraception and menopause care.",
    detail:
      "Annual exams, contraception counseling, prenatal checkups and menopause care. Appointments start with your questions, not a checklist.",
  },
  {
    slug: "chronic-care",
    name: "Chronic Condition Management",
    short: "Chronic",
    summary: "Ongoing support for diabetes, high blood pressure, asthma and other long-term conditions.",
    detail:
      "You get a written plan, regular check-ins, medication reviews and lab monitoring, all handled by the same doctor each time.",
  },
  {
    slug: "urgent-visits",
    name: "Same-Day Urgent Visits",
    short: "Urgent",
    summary: "Fevers, sprains, infections and minor cuts, seen the same day.",
    detail:
      "Minor illness and injury are seen the same day by a clinician who already has your history, so there is nothing to re-explain.",
  },
  {
    slug: "telehealth",
    name: "Telehealth Consultations",
    short: "Telehealth",
    summary: "Video visits for follow-ups, prescription renewals and quick questions.",
    detail:
      "For follow-ups, renewals and questions that do not need an exam table. Secure video, often the same day, with notes added to your regular chart.",
  },
];

export const DOCTORS = [
  {
    slug: "amara-whitfield",
    name: "Dr. Amara Whitfield, MD",
    role: "Lead Physician, Family Medicine",
    bio: "Dr. Whitfield has practiced for more than 20 years, the last 18 of them at Meridian, with a focus on preventive care and chronic disease management.",
    education: "MD, University of Michigan · Residency, Oregon Health & Science University",
    image: "doctorFemale1",
  },
  {
    slug: "elias-novak",
    name: "Dr. Elias Novak, MD",
    role: "Internal Medicine",
    bio: "Dr. Novak specializes in adult and geriatric care, helping patients manage complex, multi-condition health histories with a steady, unhurried approach.",
    education: "MD, Case Western Reserve University · Residency, Cleveland Clinic",
    image: "doctorMale1",
  },
  {
    slug: "priya-ramesh",
    name: "Dr. Priya Ramesh, MD",
    role: "Pediatrics",
    bio: "Dr. Ramesh brings a warm bedside manner to every well-child visit and works closely with parents on nutrition, sleep and development.",
    education: "MD, Johns Hopkins University · Residency, Seattle Children's Hospital",
    image: "doctorFemale2",
  },
  {
    slug: "samuel-okafor",
    name: "Dr. Samuel Okafor, MD",
    role: "Family Medicine",
    bio: "Dr. Okafor treats the whole household, from newborn checkups to care for aging parents, and is known for explaining every option in plain language.",
    education: "MD, University of Toronto · Residency, Vancouver General Hospital",
    image: "doctorMale2",
  },
  {
    slug: "grace-liu",
    name: "Grace Liu, NP",
    role: "Nurse Practitioner",
    bio: "Grace leads our same-day urgent visits and chronic condition follow-ups, and is often the first face patients see.",
    education: "MSN, Columbia University · Board Certified Family Nurse Practitioner",
    image: "nurse1",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rebecca Turner",
    context: "Patient since 2019",
    quote:
      "I switched practices after years of ten-minute rushed appointments. Dr. Whitfield actually remembers our conversations from visit to visit. It changed how I think about going to the doctor.",
    avatar: "patientAvatar1",
    rating: 5,
  },
  {
    name: "Marcus Deng",
    context: "Patient since 2021",
    quote:
      "I booked a same-day visit for my son's fever on a Tuesday morning and we were seen by 2pm. The doctor already had his chart, so there was nothing to re-explain.",
    avatar: "patientAvatar4",
    rating: 5,
  },
  {
    name: "Angela Ferreira",
    context: "Patient since 2016",
    quote:
      "Dr. Novak helped me get my blood pressure under control after two other doctors kept adjusting my prescription without asking questions. He looked at the whole picture.",
    avatar: "patientAvatar2",
    rating: 5,
  },
  {
    name: "James Okonjo",
    context: "Patient since 2022",
    quote:
      "The telehealth option alone is worth it. I renewed a prescription on a video call during my lunch break and never left the office.",
    avatar: "patientAvatar3",
    rating: 5,
  },
  {
    name: "Priya Chandran",
    context: "Patient since 2018",
    quote:
      "Dr. Ramesh has seen both my kids since they were born. She remembers their allergies without checking the chart. That kind of continuity is rare now.",
    avatar: "patientAvatar5",
    rating: 5,
  },
  {
    name: "Daniel Ostrowski",
    context: "Patient since 2020",
    quote:
      "Pricing was the deciding factor for me. I knew what my visit would cost before I walked in, and the bill matched.",
    avatar: "patientAvatar6",
    rating: 5,
  },
];

export const VALUES = [
  {
    title: "Same-week appointments",
    description: "Most patients are seen within 48 hours, and urgent concerns are seen the same day.",
  },
  {
    title: "The same doctors every visit",
    description: "You see one small team who know your history, not whoever happens to be free.",
  },
  {
    title: "Prices you know in advance",
    description: "You get a cost estimate before the visit, and the bill matches it.",
  },
  {
    title: "Time to ask your questions",
    description: "Online booking and video visits, with appointments scheduled long enough to talk.",
  },
];

export const FIRST_VISIT = [
  {
    title: "Book online or call",
    description: "Choose a service, a doctor and a time, or call the front desk and we will do it with you.",
  },
  {
    title: "We confirm",
    description: "A member of the care team confirms by email or phone within one business hour.",
  },
  {
    title: "Come in",
    description: "Bring photo ID, your insurance card and a list of current medications. Parking is free.",
  },
];
