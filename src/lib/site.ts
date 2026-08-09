export const SITE = {
  name: "Meridian Family Health",
  shortName: "Meridian",
  tagline: "Family medicine, done with care and without the wait.",
  phone: "(555) 314-2200",
  phoneHref: "tel:+15553142200",
  email: "hello@meridianfamilyhealth.com",
  address: {
    line1: "482 Birchwood Lane, Suite 200",
    line2: "Cedar Falls",
  },
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 1:00 PM" },
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

export const STATS = [
  { value: "12,400+", label: "Patients cared for" },
  { value: "18", label: "Years serving the community" },
  { value: "4.9/5", label: "Average patient rating" },
  { value: "48hr", label: "Typical appointment wait" },
];

export const SERVICES = [
  {
    slug: "primary-care",
    name: "Primary & Preventive Care",
    summary: "Annual physicals, health screenings, and long-term care built around you, not your symptoms.",
    detail:
      "Your primary care visits go beyond a ten-minute check-in. We track your history, order the right screenings at the right age, and catch small issues before they become big ones.",
    icon: "stethoscope",
  },
  {
    slug: "pediatric-care",
    name: "Pediatric Care",
    summary: "Well-child visits, vaccinations, and developmental checkups from infancy through the teenage years.",
    detail:
      "From newborn visits to sports physicals, our pediatric team tracks growth milestones and keeps vaccination schedules on track, with a calm, kid-friendly approach.",
    icon: "baby",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    summary: "Wellness exams, prenatal care, and family planning delivered with privacy and respect.",
    detail:
      "Annual exams, contraceptive counseling, prenatal checkups, and menopause care, all handled by physicians who take the time to listen first.",
    icon: "heart",
  },
  {
    slug: "chronic-care",
    name: "Chronic Condition Management",
    summary: "Ongoing support for diabetes, hypertension, asthma, and other long-term conditions.",
    detail:
      "We build a management plan around your life, not the other way around, with regular check-ins, medication reviews, and lab monitoring.",
    icon: "activity",
  },
  {
    slug: "urgent-visits",
    name: "Same-Day Urgent Visits",
    summary: "Minor illness and injury care without the emergency room wait or the emergency room bill.",
    detail:
      "Fevers, sprains, infections, and minor cuts, seen the same day by a physician who already knows your medical history.",
    icon: "clock",
  },
  {
    slug: "telehealth",
    name: "Telehealth Consultations",
    summary: "Virtual visits for follow-ups, prescription renewals, and minor concerns from wherever you are.",
    detail:
      "Skip the drive for the visits that do not need an exam table. Secure video consultations, same-day scheduling, and direct follow-up with your care team.",
    icon: "video",
  },
];

export const DOCTORS = [
  {
    slug: "amara-whitfield",
    name: "Dr. Amara Whitfield, MD",
    role: "Lead Physician, Family Medicine",
    bio: "Dr. Whitfield has spent 15 years building long-term relationships with patients of every age, with a focus on preventive care and chronic disease management.",
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
    bio: "Dr. Ramesh brings a warm, patient bedside manner to every well-child visit, and works closely with parents on nutrition, sleep, and development.",
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
    bio: "Grace leads our same-day urgent care visits and chronic condition follow-ups, and is often the friendly face patients see first.",
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
      "Booked a same-day visit for my son's fever on a Tuesday morning and we were seen by 2pm. No ER, no eight-hour wait, just a doctor who knew what to do.",
    avatar: "patientAvatar4",
    rating: 5,
  },
  {
    name: "Angela Ferreira",
    context: "Patient since 2016",
    quote:
      "Dr. Novak helped me get my blood pressure under control after two other doctors just kept adjusting my prescription without asking questions. He actually looked at the whole picture.",
    avatar: "patientAvatar2",
    rating: 5,
  },
  {
    name: "James Okonjo",
    context: "Patient since 2022",
    quote:
      "The telehealth option alone is worth it. I renewed a prescription on a video call during my lunch break and never had to leave the office.",
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
      "Transparent pricing was the deciding factor for me. I knew what my visit would cost before I walked in, and there were no surprise bills afterward.",
    avatar: "patientAvatar6",
    rating: 5,
  },
];

export const VALUES = [
  {
    title: "Same-week appointments",
    description: "Most patients are seen within 48 hours, and urgent concerns are seen the same day.",
    icon: "calendar",
  },
  {
    title: "Doctors who know your history",
    description: "You see the same small team of physicians visit after visit, not whoever is free.",
    icon: "users",
  },
  {
    title: "Transparent pricing",
    description: "Clear costs before your visit, with no surprise bills after the fact.",
    icon: "receipt",
  },
  {
    title: "Modern care, human pace",
    description: "Digital scheduling and telehealth, paired with appointments that are never rushed.",
    icon: "sparkles",
  },
];
