"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/Form";

export default function AdminUI({ strains }) {
  const [form, setForm] = useState({ name: "", type: "Hybrid", summary: "", lineage: "", thcMin: "", thcMax: "", cbdMin: "", cbdMax: "", terpenes: "" });
  const [err, setErr] = useState("");

  const save = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await fetch("/admin/strains/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!res.ok) return setErr("Failed to save");
    window.location.reload();
  };

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Add Strain (Neutral Info Only)</h1>
        <form className="grid md:grid-cols-2 gap-3 mt-3" onSubmit={save}>
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          </div>
          <div>
            <Label>Type</Label>
            <Input value={form.type} onChange={e=>setForm({...form, type: e.target.value})} placeholder="Indica/Sativa/Hybrid" />
          </div>
          <div className="md:col-span-2">
            <Label>Summary (no how‑to instructions)</Label>
            <Textarea value={form.summary} onChange={e=>setForm({...form, summary: e.target.value})} />
          </div>
          <div>
            <Label>Lineage</Label>
            <Input value={form.lineage} onChange={e=>setForm({...form, lineage: e.target.value})} />
          </div>
          <div>
            <Label>Terpenes</Label>
            <Input value={form.terpenes} onChange={e=>setForm({...form, terpenes: e.target.value})} placeholder="e.g., Myrcene, Limonene" />
          </div>
          <div>
            <Label>THC Min %</Label>
            <Input type="number" step="0.1" value={form.thcMin} onChange={e=>setForm({...form, thcMin: e.target.value})} />
          </div>
          <div>
            <Label>THC Max %</Label>
            <Input type="number" step="0.1" value={form.thcMax} onChange={e=>setForm({...form, thcMax: e.target.value})} />
          </div>
          <div>
            <Label>CBD Min %</Label>
            <Input type="number" step="0.1" value={form.cbdMin} onChange={e=>setForm({...form, cbdMin: e.target.value})} />
          </div>
          <div>
            <Label>CBD Max %</Label>
            <Input type="number" step="0.1" value={form.cbdMax} onChange={e=>setForm({...form, cbdMax: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Save</Button>
            {err && <span className="text-sm text-red-400 ml-3">{err}</span>}
          </div>
        </form>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {strains.map(s => (
          <div key={s.id} className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{s.name}</h2>
              <span className="badge">{s.type || "Hybrid"}</span>
            </div>
            {s.summary && <p className="mt-2 text-neutral-300 line-clamp-4">{s.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}