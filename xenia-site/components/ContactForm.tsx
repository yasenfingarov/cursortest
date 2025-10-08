"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-black outline-none ring-0 focus:border-black/30 dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-black outline-none ring-0 focus:border-black/30 dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white/30"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-black outline-none ring-0 focus:border-black/30 dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white/30"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status !== "idle"}
          className="rounded-md bg-black px-4 py-2 text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {status === "idle" && "Send"}
          {status === "sending" && "Sending..."}
          {status === "sent" && "Sent"}
        </button>
        {status === "sent" && (
          <span className="text-sm text-black/70 dark:text-white/70">
            Thanks! This demo form doesn’t send emails.
          </span>
        )}
      </div>
    </form>
  );
}
