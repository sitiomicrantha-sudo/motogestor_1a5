import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { motorcycles, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    const motorcycle = await db.select().from(motorcycles).limit(1);
    return NextResponse.json(motorcycle[0] || null);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch motorcycle" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { model, year, fuelEfficiency, fuelPrice } = body;

    const existing = await db.select().from(motorcycles).limit(1);
    if (existing.length === 0) {
      let user = await db.select().from(users).limit(1);
      if (user.length === 0) {
        const newUser = await db.insert(users).values({
          id: nanoid(),
          name: "Entregador",
          email: "entregador@email.com",
        }).returning();
        user = newUser;
      }

      const newMotorcycle = await db.insert(motorcycles).values({
        id: nanoid(),
        model,
        year,
        fuelEfficiency,
        fuelPrice,
        userId: user[0].id,
      }).returning();

      return NextResponse.json(newMotorcycle[0]);
    }

    await db.update(motorcycles).set({ model, year, fuelEfficiency, fuelPrice }).where(eq(motorcycles.id, existing[0].id));
    const updated = await db.select().from(motorcycles).where(eq(motorcycles.id, existing[0].id));
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update motorcycle" }, { status: 500 });
  }
}
