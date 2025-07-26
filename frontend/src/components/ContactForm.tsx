'use client';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6 text-blue-400" />
        Contact Us
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input 
            required 
            name="name" 
            placeholder="Your Name" 
            className="w-full rounded-lg px-4 py-3 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-slate-400" 
          />
        </div>
        <div className="relative">
          <input 
            required 
            name="email" 
            type="email" 
            placeholder="Your Email" 
            className="w-full rounded-lg px-4 py-3 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-slate-400" 
          />
        </div>
        <div className="relative">
          <textarea 
            required 
            name="message" 
            placeholder="Your Message" 
            className="w-full rounded-lg px-4 py-3 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none" 
            rows={4} 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            </>
          )}
        </button>
        
        {status === "success" && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-400" />
            <div className="text-green-400 font-medium">
              Thank you! We will reply to you via airoam.net@gmail.com.
            </div>
          </div>
        )}
        
        {status === "error" && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 text-red-400" />
            <div className="text-red-400 font-medium">
              Failed to send. Please try again later.
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 