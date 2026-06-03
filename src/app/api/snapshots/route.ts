import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { snapshots } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shiftId = searchParams.get("shiftId");

    if (!shiftId) {
      return NextResponse.json({ error: "shiftId required" }, { status: 400 });
    }

    const snapshotList = await db.query.snapshots.findMany({
      where: eq(snapshots.shiftId, shiftId),
      orderBy: [desc(snapshots.createdAt)],
    });

    return NextResponse.json(snapshotList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch snapshots" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shiftId, km, platform, earnings, totalRides } = body;

    const snapshot = await db.insert(snapshots).values({
      id: nanoid(),
      shiftId,
      km,
      platform,
      earnings,
      totalRides: totalRides || 0,
    }).returning();

    return NextResponse.json(snapshot[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create snapshot" }, { status: 500 });
  }
}
