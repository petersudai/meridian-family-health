import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
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

const field =
  "w-full border border-ink/40 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const choice = (active: boolean) =>
  `flex w-full items-center justify-between gap-3 border px-4 py-3.5 text-left transition cursor-pointer ${
    active ? "border-ink bg-white" : "border-ink/25 hover:border-ink/60"
  }`;

export default function BookingWidget({
  label = "Book an appointment",
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
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        {label}
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Request an appointment">
            <div className="absolute inset-0 bg-ink/65" onClick={close} />

            <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden border-t border-ink/20 bg-paper shadow-2xl sm:max-w-lg sm:border">
              <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
                <div>
                  <p className="font-display text-lg font-bold text-ink">Request an appointment</p>
                  {step < 5 && <p className="text-sm text-ink-soft">Step {step} of 4</p>}
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="flex h-11 w-11 items-center justify-center border border-ink/40 text-ink transition hover:bg-ink hover:text-paper cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {step < 5 && (
                <div className="flex gap-1.5 px-6 pt-4" aria-hidden="true">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`h-[3px] flex-1 transition-colors ${s <= step ? "bg-gold" : "bg-ink/15"}`} />
                  ))}
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {step === 1 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">What can we help with?</h3>
                    <p className="mt-1 text-ink-soft">Choose the type of visit you need.</p>
                    <div className="mt-5 grid gap-2">
                      {SERVICES.map((s) => (
                        <button key={s.slug} onClick={() => setServiceSlug(s.slug)} aria-pressed={serviceSlug === s.slug} className={choice(serviceSlug === s.slug)}>
                          <span>
                            <span className="block font-semibold text-ink">{s.name}</span>
                            <span className="mt-0.5 block text-sm text-ink-soft">{s.summary}</span>
                          </span>
                          {serviceSlug === s.slug && <Check className="h-5 w-5 flex-shrink-0 text-ink" aria-hidden />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Choose your doctor</h3>
                    <p className="mt-1 text-ink-soft">Pick a provider, or let us match you with the first available.</p>
                    <div className="mt-5 grid gap-2">
                      <button onClick={() => setDoctorSlug("any")} aria-pressed={doctorSlug === "any"} className={choice(doctorSlug === "any")}>
                        <span className="font-semibold text-ink">No preference, first available</span>
                        {doctorSlug === "any" && <Check className="h-5 w-5 flex-shrink-0 text-ink" aria-hidden />}
                      </button>
                      {DOCTORS.map((d) => (
                        <button key={d.slug} onClick={() => setDoctorSlug(d.slug)} aria-pressed={doctorSlug === d.slug} className={choice(doctorSlug === d.slug)}>
                          <span>
                            <span className="block font-semibold text-ink">{d.name}</span>
                            <span className="block text-sm text-ink-soft">{d.role}</span>
                          </span>
                          {doctorSlug === d.slug && <Check className="h-5 w-5 flex-shrink-0 text-ink" aria-hidden />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Pick a date and time</h3>
                    <p className="mt-1 text-ink-soft">Times are shown in your local time zone.</p>
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {days.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => setDateIndex(i)}
                          aria-pressed={dateIndex === i}
                          className={`min-h-11 border px-3 py-2.5 text-center font-medium transition cursor-pointer ${
                            dateIndex === i ? "border-ink bg-white text-ink" : "border-ink/25 text-ink hover:border-ink/60"
                          }`}
                        >
                          {formatDay(d)}
                        </button>
                      ))}
                    </div>

                    {dateIndex !== null && (
                      <div className="mt-6">
                        <p className="mb-2 text-sm font-semibold text-ink">Available times</p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              onClick={() => setTime(t)}
                              aria-pressed={time === t}
                              className={`min-h-11 border px-2 py-2 text-sm font-medium transition cursor-pointer ${
                                time === t ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink/60"
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
                    <p className="mt-1 text-ink-soft">We will confirm your visit by email or phone within one business hour.</p>
                    <div className="mt-5 grid gap-4">
                      <div>
                        <label htmlFor={`${uid}-name`} className={labelCls}>
                          Full name <span aria-hidden="true">*</span>
                        </label>
                        <input id={`${uid}-name`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" autoComplete="name" className={field} />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-email`} className={labelCls}>
                          Email address <span aria-hidden="true">*</span>
                        </label>
                        <input id={`${uid}-email`} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" autoComplete="email" className={field} />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-phone`} className={labelCls}>
                          Phone number
                        </label>
                        <input id={`${uid}-phone`} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(555) 123-4567" autoComplete="tel" className={field} />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-notes`} className={labelCls}>
                          Notes <span className="font-normal text-ink-soft">(optional)</span>
                        </label>
                        <textarea id={`${uid}-notes`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know before your visit?" rows={3} className={field} />
                      </div>
                    </div>

                    <div className="mt-5 border-l-2 border-gold bg-paper-warm px-4 py-3.5 text-sm text-ink-soft">
                      <p className="font-semibold text-ink">{selectedService?.name}</p>
                      <p className="mt-0.5">
                        {selectedDoctor ? selectedDoctor.name : "First available provider"}
                        {dateIndex !== null && `, ${formatDay(days[dateIndex])}`}
                        {time && ` at ${time}`}
                      </p>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="py-6">
                    <h3 className="font-display text-2xl font-bold text-ink">Request received</h3>
                    <p className="mt-3 max-w-sm text-ink-soft">
                      Thank you, {name.split(" ")[0] || "there"}. Our care team will confirm your {selectedService?.name.toLowerCase()} visit
                      {dateIndex !== null ? ` on ${formatDay(days[dateIndex])}` : ""}
                      {time ? ` at ${time}` : ""} by email or phone.
                    </p>
                    <p className="mt-4 text-sm text-ink-soft">This is a portfolio demo. No appointment has been booked.</p>
                    <button onClick={close} className="btn btn-secondary mt-6">
                      Done
                    </button>
                  </div>
                )}
              </div>

              {step < 5 && (
                <div className="flex items-center justify-between border-t border-ink/15 px-6 py-4">
                  <button
                    onClick={() => (step === 1 ? close() : setStep((s) => (s - 1) as Step))}
                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-ink-soft transition hover:text-ink cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                    {step === 1 ? "Cancel" : "Back"}
                  </button>

                  {step === 4 ? (
                    <button onClick={handleSubmit} disabled={!name || !email || submitting} className="btn btn-primary">
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                      {submitting ? "Sending" : "Confirm request"}
                    </button>
                  ) : (
                    <button onClick={() => setStep((s) => (s + 1) as Step)} disabled={!canContinue} className="btn btn-secondary">
                      Continue
                      <ChevronRight className="h-4 w-4" aria-hidden />
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
