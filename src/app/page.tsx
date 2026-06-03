"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Shift {
  id: string;
  status: string;
  startKm: number;
  goal: number;
  startTime: string;
  snapshots: Snapshot[];
}

interface Snapshot {
  id: string;
  km: number;
  platform: string;
  earnings: number;
  totalRides: number;
}

interface Motorcycle {
  fuelEfficiency: number;
  fuelPrice: number;
}

export default function DashboardPage() {
  const [activeShift, setActiveShift] = useState<Shift | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [startKm, setStartKm] = useState("");
  const [goal, setGoal] = useState("");
  const [snapshotKm, setSnapshotKm] = useState("");
  const [snapshotPlatform, setSnapshotPlatform] = useState("iFood");
  const [snapshotEarnings, setSnapshotEarnings] = useState("");
  const [snapshotTotalRides, setSnapshotTotalRides] = useState("");
  const [endKm, setEndKm] = useState("");
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    fetchActiveShift();
    fetchMotorcycle();
  }, []);

  useEffect(() => {
    if (!activeShift) return;

    const startTime = new Date(activeShift.startTime).getTime();
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeShift]);

  const fetchActiveShift = async () => {
    try {
      const response = await fetch("/api/shifts?action=active");
      if (response.ok) {
        const data = await response.json();
        setActiveShift(data);
        if (data?.snapshots?.length) {
          setSnapshotKm(String(data.snapshots[data.snapshots.length - 1].km));
        }
      }
    } catch (error) {
      console.error("Failed to fetch active shift:", error);
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

  const handleStartShift = async () => {
    if (!startKm || !goal) return;

    try {
      const response = await fetch("/api/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          startKm: parseFloat(startKm),
          goal: parseFloat(goal),
        }),
      });

      if (response.ok) {
        const shift = await response.json();
        setActiveShift({ ...shift, snapshots: [] });
        setShowStartModal(false);
        setStartKm("");
        setGoal("");
      }
    } catch (error) {
      console.error("Failed to start shift:", error);
    }
  };

  const handleSnapshot = async () => {
    if (!snapshotKm || !snapshotEarnings || !activeShift) return;

    try {
      const response = await fetch("/api/snapshots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shiftId: activeShift.id,
          km: parseFloat(snapshotKm),
          platform: snapshotPlatform,
          earnings: parseFloat(snapshotEarnings),
          totalRides: parseInt(snapshotTotalRides) || 0,
        }),
      });

      if (response.ok) {
        const snapshot = await response.json();
        setActiveShift({
          ...activeShift,
          snapshots: [...activeShift.snapshots, snapshot],
        });
        setShowSnapshotModal(false);
        setSnapshotEarnings("");
        setSnapshotTotalRides("");
      }
    } catch (error) {
      console.error("Failed to create snapshot:", error);
    }
  };

  const handleEndShift = async () => {
    if (!endKm || !activeShift) return;

    try {
      const response = await fetch("/api/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "end",
          shiftId: activeShift.id,
          endKm: parseFloat(endKm),
        }),
      });

      if (response.ok) {
        setActiveShift(null);
        setShowEndModal(false);
        setEndKm("");
      }
    } catch (error) {
      console.error("Failed to end shift:", error);
    }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const calculateMetrics = () => {
    if (!activeShift) return { kmDriven: 0, grossEarnings: 0, fuelCost: 0, netEarnings: 0 };

    const lastKm = activeShift.snapshots.length > 0
      ? Math.max(...activeShift.snapshots.map(s => s.km))
      : activeShift.startKm;

    const kmDriven = lastKm - activeShift.startKm;

    const platformMax: Record<string, number> = {};
    activeShift.snapshots.forEach(snapshot => {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!activeShift) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <Button
          onClick={() => setShowStartModal(true)}
          size="lg"
          className="px-8 py-6 text-xl font-bold min-w-[280px] min-h-[80px]"
        >
          INICIAR TURNO
        </Button>

        <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Iniciar Turno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startKm">KM atual do Odometro</Label>
                <Input
                  id="startKm"
                  type="number"
                  inputMode="decimal"
                  value={startKm}
                  onChange={(e) => setStartKm(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Meta de Ganhos (R$)</Label>
                <Input
                  id="goal"
                  type="number"
                  inputMode="decimal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStartModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleStartShift} disabled={!startKm || !goal}>
                Iniciar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-[calc(100vh-4rem)] p-4 gap-4">
      <div className="text-center">
        <p className="text-muted-foreground text-lg">Tempo de Turno</p>
        <p className="text-[72px] leading-none font-bold text-primary font-mono">
          {formatTime(elapsedTime)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 content-center">
        <Card className="min-h-[80px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">KM Rodado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[28px] font-bold text-foreground">
              {metrics.kmDriven.toFixed(1)} km
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-[80px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ganho Bruto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[28px] font-bold text-primary">
              R$ {metrics.grossEarnings.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-[80px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Custo Combustivel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[28px] font-bold text-destructive">
              - R$ {metrics.fuelCost.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card className="min-h-[80px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ganho Liquido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[28px] font-bold text-primary">
              R$ {metrics.netEarnings.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 pb-4">
        <Button
          onClick={() => {
            setSnapshotKm(activeShift.snapshots.length > 0
              ? String(activeShift.snapshots[activeShift.snapshots.length - 1].km)
              : String(activeShift.startKm));
            setShowSnapshotModal(true);
          }}
          size="lg"
          className="w-full text-lg font-bold min-h-[64px]"
        >
          NOVO SNAPSHOT
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEndKm(activeShift.snapshots.length > 0
              ? String(activeShift.snapshots[activeShift.snapshots.length - 1].km)
              : String(activeShift.startKm));
            setShowEndModal(true);
          }}
          className="w-full min-h-[56px]"
        >
          ENCERRAR TURNO
        </Button>
      </div>

      <Dialog open={showSnapshotModal} onOpenChange={setShowSnapshotModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Snapshot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="snapshotKm">KM atual</Label>
              <Input
                id="snapshotKm"
                type="number"
                inputMode="decimal"
                value={snapshotKm}
                onChange={(e) => setSnapshotKm(e.target.value)}
                className="min-h-[56px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Plataforma</Label>
              <Select value={snapshotPlatform} onValueChange={(value) => setSnapshotPlatform(value ?? "iFood")}>
                <SelectTrigger className="min-h-[56px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iFood">iFood</SelectItem>
                  <SelectItem value="99Food">99Food</SelectItem>
                  <SelectItem value="Lalamove">Lalamove</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="snapshotEarnings">Valor Total (R$)</Label>
              <Input
                id="snapshotEarnings"
                type="number"
                inputMode="decimal"
                value={snapshotEarnings}
                onChange={(e) => setSnapshotEarnings(e.target.value)}
                placeholder="0.00"
                className="min-h-[56px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="snapshotTotalRides">Total de Corridas</Label>
              <Input
                id="snapshotTotalRides"
                type="number"
                inputMode="numeric"
                value={snapshotTotalRides}
                onChange={(e) => setSnapshotTotalRides(e.target.value)}
                placeholder="0"
                className="min-h-[56px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSnapshotModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSnapshot} disabled={!snapshotKm || !snapshotEarnings}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Encerrar Turno</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="endKm">KM final</Label>
              <Input
                id="endKm"
                type="number"
                inputMode="decimal"
                value={endKm}
                onChange={(e) => setEndKm(e.target.value)}
                className="min-h-[56px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleEndShift} disabled={!endKm}>
              Encerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
