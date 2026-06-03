import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    let user = await db.select().from(users).limit(1);
    if (user.length === 0) {
      const newUser = await db.insert(users).values({
        id: nanoid(),
        name: "Entregador",
        email: "entregador@email.com",
      }).returning();
      return NextResponse.json(newUser[0]);
    }
    return NextResponse.json(user[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    let user = await db.select().from(users).limit(1);
    if (user.length === 0) {
      const newUser = await db.insert(users).values({
        id: nanoid(),
        name: name || "Entregador",
        email: email || "entregador@email.com",
      }).returning();
      return NextResponse.json(newUser[0]);
    }

    await db.update(users).set({ name, email }).where(eq(users.id, user[0].id));
    const updatedUser = await db.select().from(users).where(eq(users.id, user[0].id));
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
