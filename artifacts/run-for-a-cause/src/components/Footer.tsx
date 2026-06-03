import { Link } from "wouter";
import { Heart, MapPin, Mail, Phone } from "lucide-react";
import { SiInstagram, SiFacebook, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-full">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Run for a Cause
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A community-driven organization raising money through running events 
              and volunteering our time to help people in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 hover:text-primary transition-colors text-sm">Volunteer Work</Link></li>
              <li><Link href="/juniors" className="text-gray-400 hover:text-primary transition-colors text-sm">Juniors Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>13901 Rembrandt Way<br />Chantilly, VA 20151, USA</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@bestrunners.org" className="hover:text-primary transition-colors">info@bestrunners.org</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+16125980467" className="hover:text-primary transition-colors">+1 612-598-0467</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Run for a Cause. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <SiInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <SiFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <SiX className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
