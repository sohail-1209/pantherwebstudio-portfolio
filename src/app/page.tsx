"use client";

import { useState } from "react";
import Loader from "@/components/sections/Loader";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Technology from "@/components/sections/Technology";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <div className="flex flex-col w-full">
          <Hero />
          <Services />
          <Portfolio />
          <Technology />
          <WhyChooseUs />
          <Testimonials />
          <Contact />
        </div>
      )}
    </>
  );
}

