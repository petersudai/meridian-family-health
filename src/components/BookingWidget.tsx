import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, Check, ChevronLeft, ChevronRight, Loader2, Stethoscope, User, X } from "lucide-react";
import { SERVICES, DOCTORS } from "../lib/site";

type Step = 1 | 2 | 3 | 4 | 5;

function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const TIME_SLOTS = ["8:30 AM", "9:15 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "3:45 PM", "4:30 PM"];

function formatDay(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function BookingWidget({
  label = "Book an Appointment",
  initialServiceSlug,
}: {
  label?: string;
  initialServiceSlug?: string;
}) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(initialServiceSlug ? 2 : 1);
  const [serviceSlug, setServiceSlug] = useState<string | null>(initialServiceSlug ?? null);
  const [doctorSlug, setDoctorSlug] = useState<string | null>("any");
  const [dateIndex, setDateIndex] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const days = useMemo(() => nextWeekdays(6), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function reset() {
    setStep(initialServiceSlug ? 2 : 1);
    setServiceSlug(initialServiceSlug ?? null);
    setDoctorSlug("any");
    setDateIndex(null);
    setTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setSubmitting(false);
  }

  function close() {
    setOpen(false);
    setTimeout(reset, 300);
  }

  const selectedService = SERVICES.find((s) => s.slug === serviceSlug);
  const selectedDoctor = DOCTORS.find((d) => d.slug === doctorSlug);

  const canContinue =
    (step === 1 && !!serviceSlug) ||
    (step === 2 && !!doctorSlug) ||
    (step === 3 && dateIndex !== null && !!time) ||
    step === 4;

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep(5);
    }, 1100);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition hover:bg-ink hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 cursor-pointer"
      >
        <Calendar className="h-4 w-4" aria-hidden />
        {label}
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

            <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden border-t border-ink/15 bg-paper shadow-2xl sm:max-w-lg sm:border">
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <div>
                  <p className="font-display text-lg font-bold text-ink">Request an appointment</p>
                  {step < 5 && <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Step {step} of 4</p>}
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink-soft transition hover:border-ink hover:text-ink cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {step < 5 && (
                <div className="flex gap-1.5 px-6 pt-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`h-[3px] flex-1 transition-colors ${s <= step ? "bg-gold" : "bg-ink/10"}`} />
                  ))}
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {step === 1 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">What can we help with?</h3>
                    <p className="mt-1 text-sm text-ink-soft">Choose the type of visit you need.</p>
                    <div className="mt-5 grid gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => setServiceSlug(s.slug)}
                          className={`flex items-center justify-between border px-4 py-3.5 text-left transition cursor-pointer ${
                            serviceSlug === s.slug ? "border-ink bg-ink/5" : "border-ink/12 hover:border-ink/40"
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-semibold text-ink">{s.name}</span>
                            <span className="mt-0.5 block text-xs text-ink-soft">{s.summary}</span>
                          </span>
                          {serviceSlug === s.slug && <Check className="ml-3 h-5 w-5 flex-shrink-0 text-gold-dark" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Choose your doctor</h3>
                    <p className="mt-1 text-sm text-ink-soft">Pick a provider, or let us match you with the first available.</p>
                    <div className="mt-5 grid gap-2">
                      <button
                        onClick={() => setDoctorSlug("any")}
                        className={`flex items-center gap-3 border px-4 py-3 text-left transition cursor-pointer ${
                          doctorSlug === "any" ? "border-ink bg-ink/5" : "border-ink/12 hover:border-ink/40"
                        }`}
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-ink/8 text-verdigris">
                          <User className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-ink">No preference, first available</span>
                      </button>
                      {DOCTORS.map((d) => (
                        <button
                          key={d.slug}
                          onClick={() => setDoctorSlug(d.slug)}
                          className={`flex items-center gap-3 border px-4 py-3 text-left transition cursor-pointer ${
                            doctorSlug === d.slug ? "border-ink bg-ink/5" : "border-ink/12 hover:border-ink/40"
                          }`}
                        >
                          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-ink/8 text-verdigris">
                            <Stethoscope className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{d.name}</span>
                            <span className="block text-xs text-ink-soft">{d.role}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Pick a date and time</h3>
                    <p className="mt-1 text-sm text-ink-soft">Times shown in your local time zone.</p>
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {days.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => setDateIndex(i)}
                          className={`border px-3 py-2.5 text-center font-mono text-xs transition cursor-pointer ${
                            dateIndex === i ? "border-ink bg-ink/5 text-ink" : "border-ink/12 text-ink-soft hover:border-ink/40"
                          }`}
                        >
                          {formatDay(d)}
                        </button>
                      ))}
                    </div>

                    {dateIndex !== null && (
                      <div className="mt-6">
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Available times</p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              className={`border px-2 py-2 font-mono text-xs transition cursor-pointer ${
                                time === t ? "border-ink bg-ink text-paper" : "border-ink/12 text-ink-soft hover:border-ink/40"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Your details</h3>
                    <p className="mt-1 text-sm text-ink-soft">We will confirm your visit by email or phone within one business hour.</p>
                    <div className="mt-5 grid gap-4">
                      <div>
                        <label htmlFor={`${uid}-name`} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                          Full name
                        </label>
                        <input
                          id={`${uid}-name`}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jordan Lee"
                          className="w-full border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-gold-dark focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-email`} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                          Email address
                        </label>
                        <input
                          id={`${uid}-email`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="you@email.com"
                          className="w-full border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-gold-dark focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-phone`} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                          Phone number
                        </label>
                        <input
                          id={`${uid}-phone`}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="w-full border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-gold-dark focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-notes`} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                          Notes <span className="text-ink-soft">(optional)</span>
                        </label>
                        <textarea
                          id={`${uid}-notes`}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Anything we should know before your visit?"
                          rows={3}
                          className="w-full border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-gold-dark focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-5 border-l-2 border-gold bg-paper-warm px-4 py-3.5 text-xs text-ink-soft">
                      <p className="font-semibold text-ink">{selectedService?.name}</p>
                      <p className="mt-0.5 font-mono">
                        {selectedDoctor ? selectedDoctor.name : "First available provider"}
                        {dateIndex !== null && ` · ${formatDay(days[dateIndex])}`}
                        {time && ` · ${time}`}
                      </p>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="flex flex-col items-center py-6 text-center">
                    <span className="flex h-14 w-14 items-center justify-center bg-ink text-gold">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-bold text-ink">Request received</h3>
                    <p className="mt-2 max-w-sm text-sm text-ink-soft">
                      Thank you, {name.split(" ")[0] || "there"}. Our care team will confirm your {selectedService?.name.toLowerCase()} visit
                      {dateIndex !== null ? ` on ${formatDay(days[dateIndex])}` : ""}
                      {time ? ` at ${time}` : ""} shortly by email or phone.
                    </p>
                    <p className="mt-4 font-mono text-[11px] text-ink-soft">This is a portfolio demo. No appointment has actually been booked.</p>
                    <button
                      onClick={close}
                      className="mt-6 border border-ink bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition hover:bg-transparent hover:text-ink cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {step < 5 && (
                <div className="flex items-center justify-between border-t border-ink/10 px-6 py-4">
                  <button
                    onClick={() => (step === 1 ? close() : setStep((s) => (s - 1) as Step))}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition hover:text-ink cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {step === 1 ? "Cancel" : "Back"}
                  </button>

                  {step === 4 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!name || !email || submitting}
                      className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink transition hover:bg-ink hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      {submitting ? "Sending" : "Confirm request"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep((s) => (s + 1) as Step)}
                      disabled={!canContinue}
                      className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      Continue
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
