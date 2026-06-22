"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
        setTimeout(() => setDone(false), 3000);
      }}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <label className="relative flex-1">
        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="w-full h-12 pl-11 pr-4 rounded-full bg-white/[.06] border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
        />
      </label>
      <button type="submit" className="btn btn-primary h-12">
        {done ? (<><Check className="w-4 h-4" /> Teşekkürler</>) : "Abone Ol"}
      </button>
    </form>
  );
}
