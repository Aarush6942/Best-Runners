import { motion } from "framer-motion";
import { Link } from "wouter";
import { UserPlus, LogIn, Heart } from "lucide-react";

export default function Register() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20 bg-orange-50">
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              BR Run 2026
            </h1>
            <p className="text-lg text-muted-foreground">
              13th Annual Run for Charity — September 14, 2026
            </p>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Link href="/register/signup">
              <div className="group bg-white rounded-2xl border-2 border-orange-100 hover:border-primary p-8 text-center cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-black text-foreground mb-2">Sign Up</h2>
                <p className="text-sm text-muted-foreground">
                  New to BR Run? Register your family and complete payment here.
                </p>
              </div>
            </Link>

            <Link href="/register/login">
              <div className="group bg-white rounded-2xl border-2 border-orange-100 hover:border-primary p-8 text-center cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
                  <LogIn className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-black text-foreground mb-2">Look Up Registration</h2>
                <p className="text-sm text-muted-foreground">
                  Already registered? Look up your registration using your secret code.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Questions? Email us at{" "}
            <a href="mailto:info@bestrunners.org" className="text-primary font-semibold hover:underline">
              info@bestrunners.org
            </a>
          </motion.p>
        </div>
      </section>
    </div>
  );
}