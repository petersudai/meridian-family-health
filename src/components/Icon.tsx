import {
  Activity,
  Baby,
  Calendar,
  Clock,
  Heart,
  Mail,
  MapPin,
  Phone,
  Receipt,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Video,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Quote,
} from "lucide-react";

const ICONS = {
  activity: Activity,
  baby: Baby,
  calendar: Calendar,
  clock: Clock,
  heart: Heart,
  mail: Mail,
  mappin: MapPin,
  phone: Phone,
  receipt: Receipt,
  sparkles: Sparkles,
  star: Star,
  stethoscope: Stethoscope,
  users: Users,
  video: Video,
  arrowright: ArrowRight,
  checkcircle: CheckCircle2,
  shieldcheck: ShieldCheck,
  quote: Quote,
};

export type IconName = keyof typeof ICONS;

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const Cmp = ICONS[name];
  return <Cmp className={className} aria-hidden />;
}
