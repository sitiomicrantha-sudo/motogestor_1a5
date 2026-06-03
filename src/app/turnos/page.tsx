"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Shift {
  id: string;
  status: string;
  startKm: number;
  endKm: number | null;
  goal: number;
  startTime: string;
  endTime: string | null;
  snapshots: Snapshot[];
}

interface Snapshot {
  id: string;
  km: number;
  platform: string;
  earnings: number;
}

interface Motorcycle {
  fuelEfficiency: number;
  fuelPrice: number;
}

export default function TurnosPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

  useEffect(() => {
    fetchShifts();
    fetchMotorcycle();
  }, []);

  const fetchShifts = async () => {
    try {
      const response = await fetch("/api/shifts");
      if (response.ok) {
        const data = await response.json();
        setShifts(data);
      }
    } catch (error) {
      console.error("Failed to fetch shifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMotorcycle = async () => {
    try {
      const response = await fetch("/api/motorcycle");
      if (response.ok) {
        const data = await response.json();
        setMotorcycle(data);
      }
    } catch (error) {
      console.error("Failed to fetch motorcycle:", error);
    }
  };

  const handleDelete = async (shiftId: string) => {
    if (!confirm("Tem certeza que deseja excluir este turno?")) return;

    try {
      const response = await fetch(`/api/shifts?id=${shiftId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShifts(shifts.filter((s) => s.id !== shiftId));
      }
    } catch (error) {
      console.error("Failed to delete shift:", error);
    }
  };

  const handleEdit = (shiftId: string) => {
    console.log("Em breve");
  };

  const calculateMetrics = (shift: Shift) => {
    const lastKm = shift.endKm || (shift.snapshots.length > 0
      ? Math.max(...shift.snapshots.map(s => s.km))
      : shift.startKm);

    const kmDriven = lastKm - shift.startKm;

    const platformMax: Record<string, number> = {};
    shift.snapshots.forEach(snapshot => {
      if (!platformMax[snapshot.platform] || snapshot.earnings > platformMax[snapshot.platform]) {
        platformMax[snapshot.platform] = snapshot.earnings;
      }
    });
    const grossEarnings = Object.values(platformMax).reduce((sum, val) => sum + val, 0);

    let fuelCost = 0;
    if (motorcycle && kmDriven > 0) {
      fuelCost = (kmDriven / motorcycle.fuelEfficiency) * motorcycle.fuelPrice;
    }

    const netEarnings = grossEarnings - fuelCost;

    return { kmDriven, grossEarnings, fuelCost, netEarnings };
  };

  const formatDuration = (start: string, end: string | null) => {
    if (!end) return "--:--";
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const totalSeconds = Math.floor(duration / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const filteredShifts = shifts.filter((shift) => {
    if (filter === "all") return true;
    const shiftDate = new Date(shift.startTime);
    const now = new Date();
    if (filter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return shiftDate >= weekAgo;
    }
    if (filter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return shiftDate >= monthAgo;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Turnos</h1>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        <Button
          variant={filter === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("week")}
        >
          Esta Semana
        </Button>
        <Button
          variant={filter === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("month")}
        >
          Este Mes
        </Button>
      </div>

      <div className="space-y-3">
        {filteredShifts.length === 0 ? (
          <p className="text-muted-foreground text-center">Nenhum turno encontrado</p>
        ) : (
          filteredShifts.map((shift) => {
            const metrics = calculateMetrics(shift);
            return (
              <Card key={shift.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-foreground font-medium">
                        {formatDate(shift.startTime)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDuration(shift.startTime, shift.endTime)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(shift.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(shift.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">KM: </span>
                      <span className="text-foreground">{metrics.kmDriven.toFixed(1)} km</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Liquido: </span>
                      <Badge variant="default" className="font-medium">
                        R$ {metrics.netEarnings.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
