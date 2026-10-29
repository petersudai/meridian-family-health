import { ArrowRight } from "lucide-react";

export default function Icon({ className = "h-5 w-5" }: { name?: "arrowright"; className?: string }) {
  return <ArrowRight className={className} aria-hidden />;
}
