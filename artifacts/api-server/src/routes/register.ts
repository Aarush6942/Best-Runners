import { Router } from "express";
import { db, registrationsTable, registrationMembersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const registerRouter = Router();

registerRouter.post("/register", async (req, res) => {
  try {
    const {
      email,
      emergencyContact,
      donationAmount,
      sponsorCode,
      schoolReferralCode,
      totalAmount,
      paypalOrderId,
      termsAccepted,
      members,
    } = req.body;

    if (!email || !emergencyContact || !totalAmount || !members?.length || !termsAccepted) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [registration] = await db
      .insert(registrationsTable)
      .values({
        email: email.toLowerCase().trim(),
        emergencyContact,
        donationAmount: donationAmount?.toString() ?? "0",
        sponsorCode: sponsorCode || null,
        schoolReferralCode: schoolReferralCode || null,
        totalAmount: totalAmount.toString(),
        paymentStatus: paypalOrderId ? "completed" : "pending",
        paypalOrderId: paypalOrderId || null,
        termsAccepted: true,
      })
      .returning();

    await db.insert(registrationMembersTable).values(
      members.map((m: {
        firstName: string;
        lastName: string;
        gender: string;
        age: number;
        runDistance: string;
        shirtSize: string;
        cost: number;
      }) => ({
        registrationId: registration.id,
        firstName: m.firstName,
        lastName: m.lastName,
        gender: m.gender,
        age: m.age,
        runDistance: m.runDistance,
        shirtSize: m.shirtSize,
        cost: m.cost.toString(),
      })),
    );

    res.status(201).json({ id: registration.id });
  } catch (err) {
    req.log.error(err, "Failed to create registration");
    res.status(500).json({ error: "Failed to save registration" });
  }
});

registerRouter.get("/register/lookup", async (req, res) => {
  try {
    const email = (req.query.email as string)?.toLowerCase().trim();
    if (!email) return res.status(400).json({ error: "Email required" });

    const regs = await db
      .select()
      .from(registrationsTable)
      .where(eq(registrationsTable.email, email))
      .orderBy(registrationsTable.createdAt)
      .limit(1);

    if (!regs.length) return res.status(404).json({ error: "Not found" });

    const members = await db
      .select()
      .from(registrationMembersTable)
      .where(eq(registrationMembersTable.registrationId, regs[0].id));

    res.json({ ...regs[0], members });
  } catch (err) {
    req.log.error(err, "Failed to look up registration");
    res.status(500).json({ error: "Failed to look up registration" });
  }
});

export default registerRouter;
