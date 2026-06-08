import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

import heroBg from "@/assets/images/hero.jpg";
import whoWeAreImg from "@/assets/images/who-we-are.png";
import whatWeDoImg from "@/assets/images/what-we-do.png";

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-sm border border-orange-50">
      <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={heroBg} 
          alt="Charity run at sunrise" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Run for a Cause
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-medium drop-shadow-md"
          >
            A community united by motion, driven by compassion, and dedicated to making a tangible difference.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold" asChild>
              <Link href="/volunteer">Join Our Next Run</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold bg-white/10 text-white border-white/30 hover:bg-white hover:text-foreground backdrop-blur-sm" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-orange-100 rounded-3xl transform rotate-3 -z-10" />
              <img 
                src={whoWeAreImg} 
                alt="Our volunteers" 
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block px-4 py-1.5 bg-orange-100 text-primary font-bold tracking-wide text-sm rounded-full mb-6">
                WHO WE ARE
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
                Neighborhood rooted. <br />Globally minded.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Best Runners is a non-profit charity organization &amp; NGO 501(c)(3). The Best Runners (BR) are a growing community based in Washington D.C that are determined to live healthy and improve the lives of underprivileged families across the world.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The BR donate 100% of their contributions to charity so that every single dollar goes to fight hunger, provide shelter, and offer scholarships to hard-working students in need.
              </p>
              <Button variant="ghost" className="group text-primary hover:text-primary hover:bg-orange-50 rounded-full px-6" asChild>
                <Link href="/about" className="flex items-center">
                  Read our story <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* BR Run Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white font-bold text-xs uppercase rounded-full mb-6 tracking-wider">
            Flagship Event
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            13th Annual BR Run for Charity 2025
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-4">
            Sunday, September 14, 2025 · Rock Ridge High School, Ashburn, VA
          </p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Join hundreds of runners for our biggest event of the year. Whether you're running the 5K or walking the 1K, every step you take makes a difference for those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#/register/signup"
              className="px-8 py-4 bg-white text-primary font-black rounded-full text-lg hover:bg-orange-50 transition-all hover:-translate-y-1 shadow-lg"
            >
              Register Now
            </a>
            <a
              href="#/volunteer"
              className="px-8 py-4 bg-white/20 text-white font-black rounded-full text-lg hover:bg-white/30 transition-all hover:-translate-y-1"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1)_0,transparent_100%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Counter end={12500} suffix="+" label="People We Helped" />
            <Counter end={250} suffix="K" label="Money Raised ($)" />
            <Counter end={850} suffix="+" label="Active Volunteers" />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block px-4 py-1.5 bg-orange-100 text-primary font-bold tracking-wide text-sm rounded-full mb-6">
                WHAT WE DO
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
                Turning hard work into <br />meaningful impact.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We organize local events, secure sponsorships, and use all proceeds to help give back to the community.
              </p>
              <ul className="space-y-4 mb-8">
                {['Weekly community charity runs', 'Direct aid distribution', 'Youth mentoring through our Juniors program', 'Annual BR Run event'].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="rounded-full px-8">
                <Link href="/volunteer">Get Involved</Link>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute -inset-4 bg-orange-50 rounded-3xl transform -rotate-3 -z-10" />
              <img 
                src={whatWeDoImg} 
                alt="Volunteers helping" 
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Our Community in Action</h2>
            <p className="text-muted-foreground text-lg">Moments from our runs, events, and volunteer efforts.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { caption: "Runners crossing the finish line at the Spring 5K Charity Run" },
              { caption: "Volunteers distributing meals at the downtown food drive" },
              { caption: "Juniors team setting up water stations before race day" },
              { caption: "Community cleanup at Riverfront Park" },
              { caption: "Award ceremony for top fundraisers at the BR Run" },
              { caption: "Students from the Juniors program at their first event" },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid group cursor-pointer"
              >
                <div
                  className="w-full rounded-2xl overflow-hidden bg-orange-100 border border-orange-100 shadow-sm hover:shadow-lg transition-shadow"
                  style={{ aspectRatio: i % 3 === 1 ? "4/5" : "4/3" }}
                >
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <span className="text-primary/50 font-semibold text-sm text-center">[Photo Placeholder]</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground font-medium px-1 group-hover:text-foreground transition-colors">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
