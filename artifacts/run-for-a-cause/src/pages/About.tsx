import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import aboutBanner from "@/assets/images/about-banner.png";

export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={aboutBanner} 
          alt="About Us Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-md"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 bg-primary mx-auto rounded-full"
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange-100 text-primary font-bold tracking-wide text-sm rounded-full mb-6"
          >
            OUR MISSION
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight tracking-tight"
          >
            We believe that communities thrive when they move together.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed mb-6"
          >
            Run for a Cause is built on a simple premise: combine the physical benefits of running with the moral imperative of giving back. Every week, we gather to run, and every week, we donate to local charities. Once a year, we host our flagship event, the BR Run, drawing thousands of participants.
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-l-4 border-primary pl-6 text-left max-w-2xl mx-auto mt-10 bg-orange-50 rounded-r-2xl py-6 pr-6"
          >
            <p className="text-xl font-semibold text-foreground italic leading-relaxed">
              "To unite people through the joy of movement, inspire a spirit of generosity, and create lasting change — one mile, one act of service at a time."
            </p>
            <footer className="mt-4 text-sm font-bold text-primary uppercase tracking-wider">Run for a Cause Mission Statement</footer>
          </motion.blockquote>
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
      {/* Two Column Layouts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Donating to India */}
          <div className="flex flex-col md:flex-row items-center gap-12 py-16 border-b border-gray-200">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-orange-100 rounded-2xl flex items-center justify-center p-8">
                <span className="text-primary/60 font-bold text-xl text-center">
                  [Placeholder Image: Aid arriving in rural India]
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 bg-white border border-gray-200 text-muted-foreground font-bold text-xs uppercase rounded-full mb-4">
                Global Impact
              </div>
              <h3 className="text-3xl font-black text-foreground mb-6">Donating to India</h3>
              <p className="text-muted-foreground text-lg mb-4">
                While our roots are local, our reach is global. We are committed to opening doors of opportunity for students in India by donating essential resources directly to schools in need.
              </p>
              <p className="text-muted-foreground text-lg">
                From computers and tablets to textbooks and classroom supplies, we work with local partners to ensure every donation reaches students who can truly benefit. Every mile we run helps give a child in India access to the tools they need to build a better future.
              </p>
            </div>
          </div>

          {/* Juniors Program */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 py-16 border-b border-gray-200">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-orange-100 rounded-2xl flex items-center justify-center p-8">
                <span className="text-primary/60 font-bold text-xl text-center">
                  [Placeholder Image: Teenagers volunteering]
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 bg-white border border-gray-200 text-muted-foreground font-bold text-xs uppercase rounded-full mb-4">
                Youth Leadership
              </div>
              <h3 className="text-3xl font-black text-foreground mb-6">The Juniors Program</h3>
              <p className="text-muted-foreground text-lg mb-4">
                We are shaping the next generation of empathetic leaders. Our Juniors program enlists high school students to help organize events, manage aid drives, and volunteer in their communities.
              </p>
              <p className="text-muted-foreground text-lg">
                Students earn community service hours, build impressive resumes, and most importantly, learn the profound joy of helping others.
              </p>
            </div>
          </div>

          {/* Weekly Charity Work */}
          <div className="flex flex-col md:flex-row items-center gap-12 py-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-orange-100 rounded-2xl flex items-center justify-center p-8">
                <span className="text-primary/60 font-bold text-xl text-center">
                  [Placeholder Image: Weekly charity work in action]
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="inline-block px-3 py-1 bg-white border border-gray-200 text-muted-foreground font-bold text-xs uppercase rounded-full mb-4">
                Every Week
              </div>
              <h3 className="text-3xl font-black text-foreground mb-6">Our Weekly Charity Work</h3>
              <p className="text-muted-foreground text-lg mb-4">
                Giving back isn't just something we do once a year — it's a weekly commitment. Every week our members come together to run and donate a portion of event proceeds to local charities.
              </p>
              <p className="text-muted-foreground text-lg">
                From food bank support to clothing drives and community outreach, our weekly charity efforts are the backbone of everything we do. No matter how big or small, every contribution adds up to something remarkable.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Have questions about our events or want to partner with us? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-muted-foreground">
                13901 Rembrandt Way<br />
                Chantilly, VA 20151, USA
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mail Us</h3>
              <p className="text-muted-foreground">
                <a href="mailto:info@bestrunners.org" className="hover:text-primary transition-colors">info@bestrunners.org</a>
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-orange-50/50 border border-orange-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Call Us</h3>
              <p className="text-muted-foreground">
                <a href="tel:+16125980467" className="hover:text-primary transition-colors">+1 612-598-0467</a><br />
                Mon-Fri, 9am - 5pm
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
