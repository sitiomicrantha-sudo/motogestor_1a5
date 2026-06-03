"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Motorcycle {
  id: string;
  model: string;
  year: number;
  fuelEfficiency: number;
  fuelPrice: number;
}

export default function GaragemPage() {
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  useEffect(() => {
    fetchMotorcycle();
  }, []);

  const fetchMotorcycle = async () => {
    try {
      const response = await fetch("/api/motorcycle");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setMotorcycle(data);
          setModel(data.model);
          setYear(String(data.year));
          setFuelEfficiency(String(data.fuelEfficiency));
          setFuelPrice(String(data.fuelPrice));
        }
      }
    } catch (error) {
      console.error("Failed to fetch motorcycle:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!model || !year || !fuelEfficiency || !fuelPrice) return;

    try {
      const response = await fetch("/api/motorcycle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          year: parseInt(year),
          fuelEfficiency: parseFloat(fuelEfficiency),
          fuelPrice: parseFloat(fuelPrice),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMotorcycle(data);
      }
    } catch (error) {
      console.error("Failed to save motorcycle:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Garagem</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Configuracoes da Moto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Modelo da Moto</Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Ex: Honda CG 160"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input
              id="year"
              type="number"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 2023"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelEfficiency">Media de Consumo (KM/L)</Label>
            <Input
              id="fuelEfficiency"
              type="number"
              inputMode="decimal"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
              placeholder="Ex: 35"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelPrice">Preco do Combustivel (R$/L)</Label>
            <Input
              id="fuelPrice"
              type="number"
              inputMode="decimal"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="Ex: 5.80"
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={!model || !year || !fuelEfficiency || !fuelPrice}
        className="w-full mb-3"
        size="lg"
      >
        Salvar
      </Button>

      <Button
        variant="outline"
        onClick={() => console.log("Em breve")}
        className="w-full"
      >
        Registrar Manutencao
      </Button>
    </div>
  );
}
