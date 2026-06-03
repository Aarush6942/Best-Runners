import { motion } from "framer-motion";
import { BookOpen, PenLine, Monitor, Clock, MapPin } from "lucide-react";
import juniorsBanner from "@/assets/images/juniors-banner.png";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAME = "June 2025";

const calendarEvents: Record<number, { label: string; color: string }[]> = {
  1:  [{ label: "Intelligo, 3–5 PM", color: "bg-orange-400" }],
  8:  [{ label: "Intelligo, 3–5 PM", color: "bg-orange-400" }],
  14: [{ label: "Essay Competition", color: "bg-sky-400" }],
  15: [{ label: "Intelligo, 3–5 PM", color: "bg-orange-400" }],
  22: [{ label: "Intelligo, 3–5 PM", color: "bg-orange-400" }],
  29: [{ label: "Intelligo, 3–5 PM", color: "bg-orange-400" }],
};

// June 2025 starts on Sunday (day 0)
const FIRST_DAY_OF_WEEK = 0;
const DAYS_IN_MONTH = 30;

const programs = [
  {
    id: 1,
    tag: "In-Person Tutoring",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Intelligo",
    description:
      "Intelligo is our flagship in-person tutoring program, connecting high school volunteers with younger students who need academic support. Sessions are held every Sunday at Gum Spring Library, covering core subjects like math, reading, and science. Volunteers gain mentorship experience while students get the one-on-one attention they need to thrive.",
    details: [
      { label: "Schedule", value: "Every Sunday, 3:00 PM – 5:00 PM" },
      { label: "Location", value: "Gum Spring Library" },
    ],
  },
  {
    id: 2,
    tag: "Writing & Competition",
    icon: <PenLine className="w-6 h-6" />,
    title: "Essay Competitions",
    description:
      "Our essay competitions challenge students to think critically and write persuasively on topics related to community service, social impact, and global citizenship. Held quarterly, these competitions offer cash prizes, certificates, and recognition at our annual banquet. They're open to all Juniors members and serve as a platform for young voices to be heard.",
    details: [
      { label: "Frequency", value: "Quarterly (March, June, Sept, Dec)" },
      { label: "Format", value: "500–800 word essay on a given theme" },
    ],
  },
  {
    id: 3,
    tag: "Online Learning",
    icon: <Monitor className="w-6 h-6" />,
    title: "Online Classes",
    description:
      "Our virtual education series runs throughout July, letting Juniors members teach what they know — and learn what they don't. Each week, a student volunteer leads a 45-minute class on a subject they're passionate about, from history and literature to environmental science and coding. Classes are streamed live and recorded for on-demand viewing, making education accessible to anyone, anywhere.",
    details: [
      { label: "When", value: "July 2025 — Saturdays, 11:00 AM – 12:00 PM (online)" },
      { label: "Subjects", value: "History, Literature, Environmental Science, Coding" },
      { label: "Platform", value: "Google Meet (link sent to members)" },
    ],
  },
];

export default function Juniors() {
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < FIRST_DAY_OF_WEEK; i++) calendarDays.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={juniorsBanner}
          alt="Juniors Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-md"
          >
            Juniors Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 font-medium drop-shadow-sm max-w-xl mx-auto px-4"
          >
            Empowering the next generation of community leaders.
          </motion.p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Our Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Juniors program offers three distinct ways to learn, teach, and make an impact.
            </p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
              >
                {/* Image placeholder */}
                <div className="w-full md:w-5/12 shrink-0">
                  <div className="aspect-[4/3] bg-orange-100 rounded-2xl flex items-center justify-center border border-orange-100 shadow-sm">
                    <span className="text-primary/50 font-semibold text-sm">[Program Photo Placeholder]</span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-7/12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-primary font-bold text-xs uppercase rounded-full mb-4">
                    <span className="text-primary">{program.icon}</span>
                    {program.tag}
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4">{program.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{program.description}</p>
                  <div className="space-y-3 border-t border-gray-100 pt-6">
                    {program.details.map((d, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="font-bold text-foreground min-w-[120px] shrink-0">{d.label}:</span>
                        <span className="text-muted-foreground">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-24 bg-orange-50 border-t border-orange-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Upcoming Schedule</h2>
            <p className="text-lg text-muted-foreground">Mark your calendar — here's what's happening in {MONTH_NAME}.</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {[
              { color: "bg-orange-400", label: "Intelligo Sessions" },
              { color: "bg-sky-400", label: "Essay Events" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className={`w-3 h-3 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
            {/* Month header */}
            <div className="bg-primary text-white text-center py-4 font-black text-xl tracking-tight">
              {MONTH_NAME}
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAYS.map((d) => (
                <div key={d} className="py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, i) => {
                const events = day ? calendarEvents[day] ?? [] : [];
                const isToday = day === 25; // highlight a sample "today"
                return (
                  <div
                    key={i}
                    className={`min-h-[90px] p-2 border-b border-r border-gray-100 ${
                      i % 7 === 6 ? "border-r-0" : ""
                    } ${!day ? "bg-gray-50/50" : "hover:bg-orange-50/50 transition-colors"}`}
                  >
                    {day && (
                      <>
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${
                            isToday
                              ? "bg-primary text-white"
                              : "text-foreground"
                          }`}
                        >
                          {day}
                        </div>
                        <div className="space-y-1">
                          {events.map((ev, ei) => (
                            <div
                              key={ei}
                              className={`${ev.color} text-white text-[10px] font-semibold rounded px-1.5 py-0.5 leading-tight truncate`}
                              title={ev.label}
                            >
                              {ev.label}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event detail list below calendar */}
          <div className="mt-8 space-y-3">
            {Object.entries(calendarEvents)
              .sort(([a], [b]) => Number(a) - Number(b))
              .flatMap(([day, evs]) =>
                evs.map((ev, i) => (
                  <div key={`${day}-${i}`} className="flex items-center gap-4 bg-white rounded-xl px-5 py-3 border border-orange-100 shadow-sm">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${ev.color}`} />
                    <span className="font-bold text-foreground text-sm min-w-[100px]">June {day}</span>
                    <span className="text-muted-foreground text-sm">{ev.label}</span>
                  </div>
                ))
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
