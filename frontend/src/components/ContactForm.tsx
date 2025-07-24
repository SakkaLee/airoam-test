'use client';
import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with real backend API
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
    }, 1200);
  }

  return (
    <form className="w-full max-w-md bg-blue-900/80 rounded-xl shadow-xl p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <input required name="name" placeholder="Your Name" className="rounded px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <input required name="email" type="email" placeholder="Your Email" className="rounded px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <textarea required name="message" placeholder="Your Message" className="rounded px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
      <button type="submit" disabled={loading} className="mt-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-400 text-white font-semibold text-lg shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Sending..." : "Send"}
      </button>
      {status === "success" && <div className="text-green-400 font-medium">Thank you! We will reply to you via Airoam@gmail.com.</div>}
      {status === "error" && <div className="text-red-400 font-medium">Failed to send. Please try again later.</div>}
    </form>
  );
} 