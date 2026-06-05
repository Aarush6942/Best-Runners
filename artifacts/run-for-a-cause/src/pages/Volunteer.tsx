import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Heart, ShoppingBag, BookOpen, Shirt } from "lucide-react";
import volunteerBanner from "@/assets/images/volunteer-banner.png";

export default function Volunteer() {
  const latestEvents = [
    {
      title: "5-Day Healthy Lifestyle Practice",
      date: "Ongoing",
      location: "Community-Wide",
      description: "A 5-day wellness challenge focused on eating what truly fuels the body — not just what the tongue craves. Participants learn about nutrition, whole foods, and building habits that last a lifetime.",
    },
    {
      title: "Ekadasi Fasting Day",
      date: "May 26, 2025",
      location: "Community-Wide",
      description: "Join us in observing Ekadasi — a full day of fasting practiced to cleanse the body and mind. We come together as a community to support one another through mindful rest and reflection.",
    },
    {
      title: "School Donation Drive",
      date: "Rolling Submissions",
      location: "Volunteer-Requested Schools",
      description: "Volunteers can submit requests to donate supplies to schools in need. Fill out the form below to nominate a school and we will coordinate the donation directly with staff.",
      hasForm: true,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={volunteerBanner} 
          alt="Volunteering Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-md"
          >
            Volunteering
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 bg-primary mx-auto rounded-full"
          />
        </div>
      </section>

      {/* Volunteer Work Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-6">More than just running.</h2>
            <p className="text-xl text-muted-foreground">
              Our volunteers are the heartbeat of our organization. Whether it's handing out water at a race station, organizing food drives, or mentoring youth, there is a place for your talents here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative group">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold p-6 text-center">
                [Placeholder Image: Volunteers setting up a race]
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative group">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold p-6 text-center">
                [Placeholder Image: Volunteers sorting donations]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charity Work Sections */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-foreground mb-4">How We Give Back</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our charity work spans food, clothing, education, and global aid — every effort driven entirely by community volunteers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-6 h-6" />, title: "Food Drives", desc: "Weekly food distribution to local families in partnership with area food banks and shelters." },
              { icon: <Shirt className="w-6 h-6" />, title: "Tutoring & Mentorship", desc: "Connecting volunteers with students who need academic support, offering one-on-one and group tutoring sessions across core subjects." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Educational Supplies", desc: "Gathering school supplies and books for underprivileged students in local schools and in India." },
              { icon: <ShoppingBag className="w-6 h-6" />, title: "Healthy Habits Outreach", desc: "Teaching and spreading good health habits in our communities — from nutrition workshops to active lifestyle programs." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-primary mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Back to the Community */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-black text-foreground mb-6">Giving Back to the Community</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our impact extends far beyond the finish line. We actively partner with local shelters, food banks, and youth centers to provide hands-on support all year round.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Community Cleanups", desc: "Monthly neighborhood restoration projects that bring residents together." },
                  { title: "Food Distribution", desc: "Weekly drives providing meals to those in need across our city." },
                  { title: "Youth Mentorship", desc: "Pairing adult volunteers with students through our Juniors program." },
                  { title: "Senior Outreach", desc: "Delivering groceries and companionship to elderly residents in our community." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary mr-4 mt-1 shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center p-4">
                <span className="text-primary/60 text-sm font-bold text-center">Image Placeholder</span>
              </div>
              <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center p-4 mt-8">
                <span className="text-primary/60 text-sm font-bold text-center">Image Placeholder</span>
              </div>
              <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center p-4">
                <span className="text-primary/60 text-sm font-bold text-center">Image Placeholder</span>
              </div>
              <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center p-4 mt-8">
                <span className="text-primary/60 text-sm font-bold text-center">Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The BR Run Event Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white font-bold text-xs uppercase rounded-full mb-4 tracking-wider">
              Flagship Event
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">13th Annual Run for Charity 2025</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">5K &amp; 1K Run/Walk — It's more than a run. It's a celebration of community, health, and giving back.</p>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-foreground mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Left: key details */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-black text-foreground mb-4">Race Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 font-medium">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-primary shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Race Date</div>
                        <div className="font-bold">Sunday, September 14, 2025 — 8:00 AM EST</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 font-medium">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Race Location &amp; Parking</div>
                        <div className="font-bold">Rock Ridge High School</div>
                        <div className="text-sm text-muted-foreground">43460 Loudoun Reserve Dr, Ashburn, VA 20148</div>
                        <div className="text-xs text-orange-600 font-semibold mt-1">Parking accessible until 7:45 AM only</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 font-medium">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-primary shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Prizes</div>
                        <div className="font-bold">15 post-race raffle prizes</div>
                        <div className="text-sm text-muted-foreground">All participants entered — must be present to win</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-black text-foreground mb-3">Packet Pickup</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="font-bold text-foreground">Friday, September 12 — 5:00–8:00 PM</div>
                      <div className="text-muted-foreground">Country Oven — 2501 Centreville Rd, Herndon, VA</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="font-bold text-foreground">Saturday, September 13 — 10:00 AM–2:00 PM</div>
                      <div className="text-muted-foreground">RRHS — 43460 Loudoun Reserve Dr, Ashburn, VA</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="font-bold text-foreground">Saturday, September 13 — 5:00–7:00 PM</div>
                      <div className="text-muted-foreground">Ashburn Biryani Grill — 43530 Yukon Dr, Ashburn, VA 20147</div>
                    </div>
                    <p className="text-xs text-red-600 font-bold uppercase tracking-wide">Race packets will NOT be available on race day.</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-full text-lg py-6 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mt-2"
                  asChild
                >
                  <a href="#/register/login">Register Now</a>
                </Button>
              </div>

              {/* Right: what you get + entertainment */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-black text-foreground mb-4">What's Waiting for You</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {[
                      "Awesome Race T-Shirt",
                      "Custom Race Bag",
                      "Finisher Medal — every charity runner is a winner",
                      "Signature Healthy Snack (sprouts, nuts, dates & coconut)",
                      "Gluten & Allergy-Free Snack Options",
                      "Fresh BRT — energizing morning drink",
                      "Fresh Lemonade — made on-site",
                      "FREE Falafel Sandwich — redeem with your BIB at Falafel Inc",
                      "Fresh Fruits — banana, watermelon & oranges",
                      "Plenty of Clean Drinking Water",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xl font-black text-foreground mb-4">Entertainment</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {[
                      "Live Music by Notes N Beats",
                      "DJ Set by BR's own Shiv",
                      "Flash Mob Performances led by Navya & Anu",
                      "15 Raffle Drawings — drop your BIB in the Raffle Box",
                      "Prizes for Winners",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-sm mt-auto">
                  <h4 className="font-bold text-foreground mb-2">Need Help?</h4>
                  <p className="text-muted-foreground">Race day volunteers wear <span className="font-semibold text-foreground">royal blue T-shirts</span> — ask any volunteer for assistance.</p>
                  <p className="text-muted-foreground mt-1">Email: <a href="mailto:info@bestrunners.org" className="text-primary hover:underline">info@bestrunners.org</a></p>
                  <p className="text-muted-foreground mt-3 font-medium">High &amp; middle school students can volunteer to earn service hours — sign up at the race venue.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Latest Events */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-foreground mb-4">Latest Events</h2>
            <p className="text-lg text-muted-foreground">A look back at our most recent volunteer efforts and charity activities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {latestEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="h-44 bg-orange-100 flex items-center justify-center">
                  <span className="text-primary/50 font-semibold text-sm">[Event Photo]</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5" /> {event.location}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{event.description}</p>
                  {event.hasForm && (
                    <div className="mt-2 border-t border-gray-100 pt-4">
                      <a
                        href="mailto:info@bestrunners.org?subject=School%20Donation%20Nomination"
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                        data-testid="link-nominate-school"
                      >
                        Email us to nominate a school
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
