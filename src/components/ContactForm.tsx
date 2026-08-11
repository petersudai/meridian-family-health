import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("General question");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1000);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center border border-ink/12 bg-paper px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center bg-ink text-gold">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks, {name.split(" ")[0] || "there"}. Our front desk team will get back to you within one business
          day.
        </p>
        <p className="mt-4 font-mono text-[11px] text-ink-soft">This is a portfolio demo. No message has actually been sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/12 bg-paper p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
            className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-gold-dark focus:outline-none"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-gold-dark focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Reason for contact</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-gold-dark focus:outline-none"
          >
            <option>General question</option>
            <option>New patient enquiry</option>
            <option>Existing patient support</option>
            <option>Billing question</option>
            <option>Medical records request</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="How can we help?"
            className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-gold-dark focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
