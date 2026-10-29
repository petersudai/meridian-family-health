import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

const field =
  "w-full border border-ink/40 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

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
      <div className="border border-ink/25 bg-white p-8" role="status">
        <h3 className="font-display text-2xl font-bold text-ink">Message sent</h3>
        <p className="mt-3 max-w-sm text-ink-soft">
          Thanks, {name.split(" ")[0] || "there"}. The front desk will reply within one business day.
        </p>
        <p className="mt-4 text-sm text-ink-soft">This is a portfolio demo. No message has been sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/25 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input id="contact-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-reason" className={labelCls}>
            Reason for contact
          </label>
          <select id="contact-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={field}>
            <option>General question</option>
            <option>New patient enquiry</option>
            <option>Existing patient support</option>
            <option>Billing question</option>
            <option>Medical records request</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelCls}>
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea id="contact-message" required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="How can we help?" className={field} />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn btn-primary mt-6">
        {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {submitting ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
