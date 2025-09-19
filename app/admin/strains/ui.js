"use client";

import { useState, useMemo } from "react";
import { Button, Input, Label, Textarea } from "@/components/Form";
import ImageUpload from "@/components/ImageUpload";

export default function AdminUI({ strains }) {
  const [form, setForm] = useState({ name: "", type: "Hybrid", summary: "", lineage: "", thcMin: "", thcMax: "", cbdMin: "", cbdMax: "", terpenes: "", tags: "" });
  const [err, setErr] = useState("");
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(null);

  const strainsPerPage = 8;

  // Filter strains
  const filteredStrains = useMemo(() => {
    return strains.filter(strain => {
      const matchesSearch = strain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           strain.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           strain.lineage?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || strain.type?.toLowerCase() === selectedType.toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [strains, searchTerm, selectedType]);

  // Pagination
  const totalPages = Math.ceil(filteredStrains.length / strainsPerPage);
  const startIndex = (currentPage - 1) * strainsPerPage;
  const paginatedStrains = filteredStrains.slice(startIndex, startIndex + strainsPerPage);

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

  const deleteStrain = async (strainId) => {
    if (!confirm("Are you sure you want to delete this strain? This action cannot be undone.")) {
      return;
    }
    
    setIsDeleting(strainId);
    try {
      const res = await fetch(`/admin/strains/api/delete?strainId=${strainId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete strain");
      }
    } catch (error) {
      alert("Error deleting strain");
    } finally {
      setIsDeleting(null);
    }
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

      {/* Search and Filter */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Manage Strains</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Search Strains</Label>
            <Input
              type="text"
              placeholder="Search by name, summary, or lineage..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div>
            <Label>Filter by Type</Label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-green-900/30 border border-green-700/50 rounded-lg text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="indica">Indica</option>
              <option value="sativa">Sativa</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-green-300">
          Showing {filteredStrains.length} of {strains.length} strains
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {paginatedStrains.map(s => (
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
              <Button
                onClick={() => deleteStrain(s.id)}
                disabled={isDeleting === s.id}
                className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting === s.id ? "Deleting..." : "🗑️ Remove"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="card">
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm disabled:opacity-50"
            >
              ← Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm ${
                    currentPage === page 
                      ? "bg-green-600 text-white" 
                      : "bg-green-900/30 hover:bg-green-800/50"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm disabled:opacity-50"
            >
              Next →
            </Button>
          </div>
          <div className="text-center text-sm text-green-300 mt-2">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

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