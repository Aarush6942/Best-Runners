import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
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

interface Registration {
  id: number;
  email: string;
  members: Member[];
  emergency_contact: string;
  donation_amount: number;
  sponsor_code: string | null;
  school_referral_code: string | null;
  total_amount: number;
  paypal_order_id: string;
  created_at: string;
  bib_numbers: number[];
}

const ADMIN_PASSWORD = "bestrunners2025";

export default function Admin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    async function fetchAll() {
      const { data } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      setRegistrations(data ?? []);
      setLoading(false);
    }
    fetchAll();
  }, [authenticated]);

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    if (!q) return true;
    if (r.email.toLowerCase().includes(q)) return true;
    return r.members.some(
      (m) =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q)
    );
  });

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const shirtLabel: Record<string, string> = { S: "Small", M: "Medium", L: "Large", XL: "X-Large" };

  if (!authenticated) {
    return (
      <div className="flex flex-col w-full min-h-screen pt-20 bg-gray-50 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-black text-foreground mb-1">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter the admin password to continue.</p>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {passwordError && (
              <p className="text-red-500 text-xs">Incorrect password. Try again.</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-all"
            >
              Enter
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pt-20 bg-gray-50">
      <div className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-primary" />
              <h1 className="text-3xl font-black text-foreground">Admin — Registrations</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              {registrations.length} total registration{registrations.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No registrations found.</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div className="bg-orange-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-orange-100">
                    <div>
                      <div className="font-black text-foreground text-lg">#{r.id} — {r.email}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Registered {new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-primary">${Number(r.total_amount).toFixed(2)}</div>
                      {Number(r.donation_amount) > 0 && (
                        <div className="text-xs text-muted-foreground">incl. ${Number(r.donation_amount).toFixed(2)} donation</div>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs text-muted-foreground uppercase tracking-wide">
                          <th className="text-left px-6 py-3">BIB</th>
                          <th className="text-left px-6 py-3">Name</th>
                          <th className="text-left px-6 py-3">Gender</th>
                          <th className="text-left px-6 py-3">Age</th>
                          <th className="text-left px-6 py-3">Distance</th>
                          <th className="text-left px-6 py-3">Shirt</th>
                          <th className="text-left px-6 py-3">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.members.map((m, i) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3 font-black text-primary">{r.bib_numbers?.[i] ?? "—"}</td>
                            <td className="px-6 py-3 font-semibold text-foreground">{m.firstName} {m.lastName}</td>
                            <td className="px-6 py-3 capitalize text-muted-foreground">{m.gender}</td>
                            <td className="px-6 py-3 text-muted-foreground">{m.age}</td>
                            <td className="px-6 py-3 font-bold text-primary">{m.runDistance}</td>
                            <td className="px-6 py-3 text-muted-foreground">{shirtLabel[m.shirtSize] ?? m.shirtSize}</td>
                            <td className="px-6 py-3 font-semibold">${Number(m.cost).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-gray-50">
                    <span>Emergency: <span className="text-foreground font-medium">{r.emergency_contact}</span></span>
                    {r.sponsor_code && <span>Sponsor: <span className="text-foreground font-medium">{r.sponsor_code}</span></span>}
                    {r.school_referral_code && <span>School Code: <span className="text-foreground font-medium">{r.school_referral_code}</span></span>}
                    <span>PayPal: <span className="text-foreground font-medium">{r.paypal_order_id}</span></span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}