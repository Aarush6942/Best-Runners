import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Plus, Trash2, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

interface Member {
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  runDistance: string;
  shirtSize: string;
}

interface FormData {
  email: string;
  members: Member[];
  emergencyContact: string;
  donationAmount: string;
  sponsorCode: string;
  schoolReferralCode: string;
  termsAccepted: boolean;
}

const defaultMember: Member = {
  firstName: "",
  lastName: "",
  gender: "",
  age: "",
  runDistance: "",
  shirtSize: "",
};

function memberCost(age: string): number {
  const n = parseInt(age, 10);
  if (isNaN(n) || n <= 0) return 0;
  return n >= 12 ? 25 : 15;
}

const TERMS = `By registering for the 13th Annual BR Run for Charity 2025, participants agree to the following terms and conditions:

1. Participation Risk: Running is a physically demanding activity. Participants confirm they are medically fit to participate and do so at their own risk. Best Runners is not liable for any injury, illness, or loss.

2. Waiver of Liability: Participants waive all claims against Best Runners, its volunteers, and affiliates for any injury or damage arising from participation.

3. Race Rules: Participants agree to follow all race rules and the directions of race officials. Violations may result in disqualification.

4. Photo/Media Release: Best Runners may use photos and videos taken at the event for promotional purposes.

5. Refunds: Registration fees are non-refundable. Race entries may be transferred to another person with prior approval.

6. Emergency: In the event of a medical emergency, participants consent to receive first aid and emergency medical treatment.

7. Packet Pickup: Race packets MUST be collected at designated packet pickup locations. Packets will NOT be available on race day.`;

export default function SignUp() {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [savedSecretCode, setSavedSecretCode] = useState("");

  const { register, control, watch, formState: { errors, isValid } } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      members: [{ ...defaultMember }],
      emergencyContact: "",
      donationAmount: "",
      sponsorCode: "",
      schoolReferralCode: "",
      termsAccepted: false,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "members" });

  const watchedValues = watch();
  const membersList = watchedValues.members ?? [];
  const donationRaw = parseFloat(watchedValues.donationAmount || "0");
  const donation = isNaN(donationRaw) || donationRaw < 0 ? 0 : donationRaw;
  const registrationSubtotal = membersList.reduce((s, m) => s + memberCost(m.age), 0);
  const total = registrationSubtotal + donation;

  const canShowPayPal =
    isValid &&
    watchedValues.termsAccepted &&
    total > 0 &&
    membersList.every((m) => m.firstName && m.lastName && m.gender && m.age && m.runDistance && m.shirtSize);

  async function saveRegistration(paypalOrderId: string) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const secretCode = "BR-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      const { error } = await supabase
        .from("registrations")
        .insert([{
          email: watchedValues.email,
          members: membersList.map((m) => ({
            firstName: m.firstName,
            lastName: m.lastName,
            gender: m.gender,
            age: parseInt(m.age, 10),
            runDistance: m.runDistance,
            shirtSize: m.shirtSize,
            cost: memberCost(m.age),
          })),
          emergency_contact: watchedValues.emergencyContact,
          donation_amount: donation,
          sponsor_code: watchedValues.sponsorCode || null,
          school_referral_code: watchedValues.schoolReferralCode || null,
          total_amount: total,
          paypal_order_id: paypalOrderId,
          terms_accepted: true,
          secret_code: secretCode,
        }]);
      await supabase.functions.invoke('send-confirmation-email', {
      body: {
          email: watchedValues.email,
          members: membersList.map((m) => ({
            firstName: m.firstName,
            lastName: m.lastName,
            gender: m.gender,
            age: m.age,
            runDistance: m.runDistance,
            shirtSize: m.shirtSize,
            cost: memberCost(m.age),
          })),
          secretCode: secretCode,
          emergencyContact: watchedValues.emergencyContact,
          donationAmount: donation,
          sponsorCode: watchedValues.sponsorCode || null,
          schoolReferralCode: watchedValues.schoolReferralCode || null,
          totalAmount: total,
        }
      });
      if (error) throw error;
      setSavedSecretCode(secretCode);
      setSubmitted(true);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong. Please contact info@bestrunners.org.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col w-full min-h-screen pt-20 bg-orange-50 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-orange-100 p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-2">You're registered!</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Welcome to the 13th Annual BR Run for Charity 2025!
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-bold">Your Secret Code</p>
            <p className="text-3xl font-black text-primary tracking-widest">{savedSecretCode}</p>
            <p className="text-xs text-muted-foreground mt-2">Save this code to look up your registration later!</p>
          </div>

          <Button variant="outline" className="w-full" onClick={() => navigate("/volunteer")}>
            Back to Volunteer Page
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD" }}>
      <div className="flex flex-col w-full min-h-screen pt-20 bg-orange-50">
        <div className="flex-1 py-12 px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Link href="/register">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </Link>
              <h1 className="text-3xl font-black text-foreground">Register for BR Run 2025</h1>
              <p className="text-muted-foreground text-sm mt-1">
                September 14, 2025 · Rock Ridge High School, Ashburn, VA
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl border border-orange-100 p-6">
              <h2 className="font-black text-foreground mb-4">Contact Email</h2>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-orange-100 p-6 space-y-6">
              <h2 className="font-black text-foreground">Runners</h2>

              {fields.map((field, idx) => {
                const age = watchedValues.members?.[idx]?.age ?? "";
                const cost = memberCost(age);
                return (
                  <div key={field.id} className="border border-orange-100 rounded-xl p-5 space-y-4 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground text-sm">Runner {idx + 1}</span>
                      <div className="flex items-center gap-3">
                        {cost > 0 && (
                          <span className="text-xs font-bold text-primary bg-orange-50 px-2 py-1 rounded-full">
                            ${cost}.00
                          </span>
                        )}
                        {fields.length > 1 && (
                          <button type="button" onClick={() => remove(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input placeholder="Jane" className="mt-1"
                          {...register(`members.${idx}.firstName`, { required: true })} />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input placeholder="Doe" className="mt-1"
                          {...register(`members.${idx}.lastName`, { required: true })} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Gender *</Label>
                        <Controller name={`members.${idx}.gender`} control={control} rules={{ required: true }}
                          render={({ field: f }) => (
                            <select {...f} className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                              <option value="">Select…</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other / Prefer not to say</option>
                            </select>
                          )} />
                      </div>
                      <div>
                        <Label>Age *</Label>
                        <Input type="number" min={1} max={120} placeholder="30" className="mt-1"
                          {...register(`members.${idx}.age`, { required: true, min: 1 })} />
                        {age && cost > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {parseInt(age) >= 12 ? "Age 12+" : "Under 12"} — ${cost}.00
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Race Distance *</Label>
                        <Controller name={`members.${idx}.runDistance`} control={control} rules={{ required: true }}
                          render={({ field: f }) => (
                            <div className="flex gap-2 mt-1">
                              {["1K", "5K"].map((d) => (
                                <button key={d} type="button"
                                  onClick={() => f.onChange(d)}
                                  className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${f.value === d ? "bg-primary text-white border-primary" : "bg-white text-foreground border-orange-200 hover:border-primary"}`}>
                                  {d}
                                </button>
                              ))}
                            </div>
                          )} />
                      </div>
                      <div>
                        <Label>Shirt Size *</Label>
                        <Controller name={`members.${idx}.shirtSize`} control={control} rules={{ required: true }}
                          render={({ field: f }) => (
                            <div className="flex gap-1.5 mt-1">
                              {["S", "M", "L", "XL"].map((s) => (
                                <button key={s} type="button"
                                  onClick={() => f.onChange(s)}
                                  className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${f.value === s ? "bg-primary text-white border-primary" : "bg-white text-foreground border-orange-200 hover:border-primary"}`}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          )} />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button type="button"
                onClick={() => append({ ...defaultMember })}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-orange-200 rounded-xl py-3 text-sm font-semibold text-primary hover:border-primary hover:bg-orange-50 transition-all">
                <Plus className="w-4 h-4" /> Add Another Runner
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-orange-100 p-6 space-y-4">
              <h2 className="font-black text-foreground">Additional Information</h2>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input id="emergencyContact" placeholder="Full name and phone number" className="mt-1"
                  {...register("emergencyContact", { required: true })} />
                {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">Emergency contact is required.</p>}
              </div>

              <div>
                <Label htmlFor="donationAmount">Additional Donation (optional)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input id="donationAmount" type="number" min={0} step={1} placeholder="0"
                    className="pl-7"
                    {...register("donationAmount", { min: 0 })} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">All donations go directly to charity.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sponsorCode">Sponsor Code</Label>
                  <Input id="sponsorCode" placeholder="Optional" className="mt-1"
                    {...register("sponsorCode")} />
                </div>
                <div>
                  <Label htmlFor="schoolReferralCode">School / Referral Code</Label>
                  <Input id="schoolReferralCode" placeholder="Optional" className="mt-1"
                    {...register("schoolReferralCode")} />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-orange-100 p-6 space-y-5">
              <h2 className="font-black text-foreground">Terms & Payment</h2>

              <div>
                <button type="button" onClick={() => setShowTerms((v) => !v)}
                  className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline mb-3">
                  {showTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showTerms ? "Hide" : "View"} Terms & Conditions
                </button>
                {showTerms && (
                  <div className="bg-orange-50 rounded-xl p-4 text-xs text-muted-foreground whitespace-pre-wrap mb-4 max-h-48 overflow-y-auto">
                    {TERMS}
                  </div>
                )}
                <Controller name="termsAccepted" control={control} rules={{ required: true }}
                  render={({ field: f }) => (
                    <div className="flex items-start gap-3">
                      <Checkbox id="terms" checked={f.value}
                        onCheckedChange={(v) => f.onChange(!!v)} className="mt-0.5" />
                      <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
                        I have read and agree to the{" "}
                        <button type="button" onClick={() => setShowTerms(true)}
                          className="text-primary font-semibold underline">
                          terms and conditions
                        </button>
                      </label>
                    </div>
                  )} />
              </div>

              <div className="bg-orange-50 rounded-xl p-4 space-y-2">
                {membersList.map((m, i) => {
                  const c = memberCost(m.age);
                  if (!c || !m.firstName) return null;
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {m.firstName || `Runner ${i + 1}`} ({m.runDistance || "—"})
                      </span>
                      <span className="font-semibold">${c}.00</span>
                    </div>
                  );
                })}
                {donation > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Donation</span>
                    <span className="font-semibold">${donation.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-orange-200 pt-2 flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              {canShowPayPal ? (
                <div>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Click the PayPal button below to complete your payment securely.
                  </p>
                  <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                    disabled={submitting}
                    createOrder={(_data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            description: "BR Run 2025 Registration",
                            amount: {
                              currency_code: "USD",
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      await actions.order?.capture();
                      await saveRegistration(data.orderID);
                    }}
                    onError={() => {
                      setSubmitError("PayPal payment failed. Please try again or contact info@bestrunners.org.");
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    {!watchedValues.termsAccepted
                      ? "Please accept the terms and conditions to proceed to payment."
                      : total === 0
                      ? "Please add at least one runner to proceed."
                      : "Please complete all required fields to proceed to payment."}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}