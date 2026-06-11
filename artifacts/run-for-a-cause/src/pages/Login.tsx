import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, ArrowLeft, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface Member {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  runDistance: string;
  shirtSize: string;
  cost: number;
}

interface RegistrationData {
  id: number;
  email: string;
  emergency_contact: string;
  total_amount: number;
  donation_amount: number;
  sponsor_code: string | null;
  school_referral_code: string | null;
  created_at: string;
  members: Member[];
  bib_numbers: number[];
  secret_code: string;
}

export default function Login() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegistrationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: sbError } = await supabase
        .from("registrations")
        .select("*")
        .eq("secret_code", code.trim().toUpperCase())
        .single();

      if (sbError || !data) {
        setError("No registration found for that code. Please check and try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shirtLabel: Record<string, string> = { S: "Small", M: "Medium", L: "Large", XL: "X-Large" };

  return (
    <div className="flex flex-col w-full min-h-screen pt-20 bg-orange-50">
      <div className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/register">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Registration
              </button>
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
              <h1 className="text-2xl font-black text-foreground mb-1">Look Up Registration</h1>
              <p className="text-muted-foreground text-sm mb-8">
                Enter the secret code you received after registering.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Secret Code</Label>
                  <div className="flex gap-3 mt-1">
                    <Input
                      id="code"
                      type="text"
                      placeholder="e.g. BR-A1B2C3"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                      className="flex-1 uppercase"
                    />
                    <Button onClick={handleLookup} disabled={loading || !code.trim()}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Searching…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Search
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4"
                  >
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-700">{error}</p>
                      <p className="text-xs text-red-600 mt-1">
                        Haven't registered yet?{" "}
                        <Link href="/register/signup">
                          <span className="underline cursor-pointer">Sign up here</span>
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5 pt-2"
                  >
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Registration found!</span>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-5 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-semibold">{result.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Emergency Contact</span>
                        <span className="font-semibold">{result.emergency_contact}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Paid</span>
                        <span className="font-black text-primary">${Number(result.total_amount).toFixed(2)}</span>
                      </div>
                      {Number(result.donation_amount) > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Donation Included</span>
                          <span className="font-semibold">${Number(result.donation_amount).toFixed(2)}</span>
                        </div>
                      )}
                      {result.sponsor_code && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sponsor Code</span>
                          <span className="font-semibold">{result.sponsor_code}</span>
                        </div>
                      )}
                      {result.school_referral_code && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">School / Referral Code</span>
                          <span className="font-semibold">{result.school_referral_code}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-black text-foreground mb-3">
                        Registered Runners ({result.members.length})
                      </h3>
                      <div className="space-y-3">
                        {result.members.map((m, i) => (
                          <div key={i} className="bg-white border border-orange-100 rounded-xl p-4 text-sm">
                            <div className="font-bold text-foreground mb-2">
                              {m.firstName} {m.lastName}
                              {result.bib_numbers?.[i] && (
                                <span className="ml-2 text-primary font-black">BIB #{result.bib_numbers[i]}</span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                              <span>Gender: <span className="text-foreground capitalize">{m.gender}</span></span>
                              <span>Age: <span className="text-foreground">{m.age}</span></span>
                              <span>Race: <span className="text-foreground font-semibold">{m.runDistance}</span></span>
                              <span>Shirt: <span className="text-foreground">{shirtLabel[m.shirtSize] ?? m.shirtSize}</span></span>
                              <span>Cost: <span className="text-primary font-semibold">${Number(m.cost).toFixed(2)}</span></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Registered on {new Date(result.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Need to register?{" "}
              <Link href="/register/signup">
                <span className="text-primary font-semibold hover:underline cursor-pointer inline-flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5" /> Sign up here
                </span>
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}