import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { shifts, snapshots, users } from "@/lib/schema";
import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "active") {
      const shift = await db.query.shifts.findFirst({
        where: eq(shifts.status, "em_andamento"),
        with: { snapshots: true },
      });
      return NextResponse.json(shift || null);
    }

    const allShifts = await db.query.shifts.findMany({
      where: eq(shifts.status, "encerrado"),
      orderBy: [desc(shifts.startTime)],
      with: { snapshots: true },
    });
    return NextResponse.json(allShifts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shifts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, shiftId, startKm, goal, endKm } = body;

    if (action === "start") {
      let user = await db.select().from(users).limit(1);
      if (user.length === 0) {
        const newUser = await db.insert(users).values({
          id: nanoid(),
          name: "Entregador",
          email: "entregador@email.com",
        }).returning();
        user = newUser;
      }

      const shift = await db.insert(shifts).values({
        id: nanoid(),
        startKm,
        goal,
        userId: user[0].id,
      }).returning();

      return NextResponse.json(shift[0]);
    }

    if (action === "end") {
      await db.update(shifts).set({
        status: "encerrado",
        endKm,
        endTime: new Date(),
      }).where(eq(shifts.id, shiftId));

      const updated = await db.select().from(shifts).where(eq(shifts.id, shiftId));
      return NextResponse.json(updated[0]);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process shift" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.delete(snapshots).where(eq(snapshots.shiftId, id));
    await db.delete(shifts).where(eq(shifts.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete shift" }, { status: 500 });
  }
}
