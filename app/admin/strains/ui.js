"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/Form";
import ImageUpload from "@/components/ImageUpload";

export default function AdminUI({ strains }) {
  const [form, setForm] = useState({ name: "", type: "Hybrid", summary: "", lineage: "", thcMin: "", thcMax: "", cbdMin: "", cbdMax: "", terpenes: "", tags: "" });
  const [err, setErr] = useState("");
  const [selectedStrain, setSelectedStrain] = useState(null);

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
          <div className="md:col-span-2">
            <Label>Tags (comma-separated)</Label>
            <Input value={form.tags} onChange={e=>setForm({...form, tags: e.target.value})} placeholder="e.g., fruity, relaxing, energizing" />
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
            <div className="mt-3 flex gap-2">
              <Button
                onClick={() => setSelectedStrain(s)}
                className="text-sm px-3 py-1"
              >
                📸 Manage Images
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedStrain && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Manage Images: {selectedStrain.name}</h3>
            <Button
              onClick={() => setSelectedStrain(null)}
              className="text-sm px-3 py-1"
            >
              ✕ Close
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Upload New Image</h4>
              <ImageUpload
                strainId={selectedStrain.id}
                onUpload={() => {
                  // Refresh the strain data
                  window.location.reload();
                }}
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Current Images</h4>
              <div className="space-y-2">
                {selectedStrain.images?.map(image => (
                  <div key={image.id} className="flex items-center gap-3 p-2 bg-green-900/20 rounded">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{image.alt}</p>
                      {image.isPrimary && (
                        <span className="text-xs text-green-400">Primary</span>
                      )}
                    </div>
                    <Button
                      onClick={async () => {
                        if (confirm("Delete this image?")) {
                          const res = await fetch(`/api/strains/${selectedStrain.id}/images?imageId=${image.id}`, {
                            method: "DELETE"
                          });
                          if (res.ok) {
                            window.location.reload();
                          }
                        }
                      }}
                      className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                )) || <p className="text-sm text-neutral-400">No images uploaded</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}