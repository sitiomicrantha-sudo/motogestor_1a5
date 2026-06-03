"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  name: string;
  email: string;
}

type Theme = "light" | "dark" | "amber" | "system";

export default function ConfigPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState<Theme>("system");

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  const handleSave = async () => {
    if (!name || !email) return;

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    document.documentElement.classList.remove("light", "dark", "amber");
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(newTheme);
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
      <h1 className="text-2xl font-bold text-foreground mb-4">Config</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Perfil do Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => handleThemeChange("light")}
              className="flex-1"
            >
              Claro
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => handleThemeChange("dark")}
              className="flex-1"
            >
              Escuro
            </Button>
            <Button
              variant={theme === "amber" ? "default" : "outline"}
              onClick={() => handleThemeChange("amber")}
              className="flex-1"
            >
              Âmbar
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => handleThemeChange("system")}
              className="flex-1"
            >
              Sistema
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={!name || !email}
        className="w-full mb-3"
        size="lg"
      >
        Salvar
      </Button>

      <Button
        variant="outline"
        onClick={() => console.log("Em breve")}
        className="w-full mb-3"
      >
        Alterar Senha
      </Button>

      <Button
        variant="destructive"
        onClick={() => console.log("Em breve")}
        className="w-full"
      >
        Sair
      </Button>
    </div>
  );
}
