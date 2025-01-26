"use client";
import { useState } from "react";
export default function Newsletter({ title, cta }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send email to backend
    setEmail("");
  };

  return (
    <section className="h-max px-4 py-8 flex flex-col justify-center items-center gap-6 text-black sm:px-24 sm:py-16 lg:gap-12">
      <div className="w-full p-12 flex flex-col gap-12 bg-[#E4B661] rounded-2xl">
        <h1 className="w-full text-2xl font-bold text-black sm:text-3xl sm:w-2/3">
          {title}
        </h1>
        <div className="w-full flex flex-col justify-start gap-2 sm:items-end sm:gap-0 sm:flex-row sm:w-2/3">
          <input
            type="email"
            placeholder="example@example.com"
            className="flex-[2] px-4 py-2 border-b-2 border-black bg-transparent text-sm placeholder:text-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            className="flex-1 bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center group"
          >
            {cta.text}
          </button>
        </div>
      </div>
    </section>
  );
}
