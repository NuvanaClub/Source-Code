"use client";

import { useState } from "react";
import { Button, Input, Textarea, Label } from "@/components/Form";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function GrowEditor({ grow }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");
  const [stage, setStage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [leafCount, setLeafCount] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [nutrients, setNutrients] = useState("");
  const [isPublic, setIsPublic] = useState(grow.isPublic || false);

  const addEntry = async (e) => {
    e.preventDefault();
    setErr("");
    let photoPath = "";
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (!up.ok) return setErr("Upload failed");
      photoPath = (await up.json()).path;
    }
    const res = await fetch(`/grow/api/${grow.id}/entry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        note, 
        photoPath,
        stage: stage || null,
        plantHeight: plantHeight ? parseFloat(plantHeight) : null,
        leafCount: leafCount ? parseInt(leafCount) : null,
        temperature: temperature ? parseFloat(temperature) : null,
        humidity: humidity ? parseFloat(humidity) : null,
        ph: ph ? parseFloat(ph) : null,
        nutrients: nutrients || null
      })
    });
    if (!res.ok) return setErr("Failed to save");
    window.location.reload();
  };

  // Prepare chart data
  const chartData = grow.entries
    .filter(entry => entry.plantHeight || entry.leafCount)
    .map(entry => ({
      date: new Date(entry.createdAt).toLocaleDateString(),
      height: entry.plantHeight || 0,
      leaves: entry.leafCount || 0,
      temperature: entry.temperature || 0,
      humidity: entry.humidity || 0,
      ph: entry.ph || 0
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="card">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">{grow.title}</h1>
            <p className="text-sm text-neutral-400 mt-1">
              {isPublic ? "Public journal" : "Private journal"}. Be mindful of local laws—do not log illegal activities.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                const res = await fetch(`/api/grow/${grow.id}/toggle-public`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ isPublic: !isPublic })
                });
                if (res.ok) {
                  setIsPublic(!isPublic);
                }
              }}
              className={`btn text-sm px-4 py-2 ${
                isPublic 
                  ? "bg-green-600 hover:bg-green-700 border-green-500" 
                  : "bg-gray-600 hover:bg-gray-700 border-gray-500"
              }`}
            >
              {isPublic ? "🌍 Public" : "🔒 Private"}
            </button>
            <button
              onClick={() => window.open(`/api/grow/${grow.id}/export?format=pdf`, '_blank')}
              className="btn text-sm px-4 py-2 bg-red-600 hover:bg-red-700 border-red-500"
            >
              📄 Export PDF
            </button>
            <button
              onClick={() => window.open(`/api/grow/${grow.id}/export?format=csv`, '_blank')}
              className="btn text-sm px-4 py-2 bg-green-600 hover:bg-green-700 border-green-500"
            >
              📊 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {chartData.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-green-300 mb-4">Growth Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line type="monotone" dataKey="height" stroke="#22C55E" strokeWidth={2} name="Height (cm)" />
                <Line type="monotone" dataKey="leaves" stroke="#3B82F6" strokeWidth={2} name="Leaf Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-green-300 mb-4">Environmental Conditions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="temperature" fill="#F59E0B" name="Temperature (°C)" />
                <Bar dataKey="humidity" fill="#8B5CF6" name="Humidity (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Add Entry Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-green-300 mb-4">Add New Entry</h2>
        <form className="grid gap-4" onSubmit={addEntry}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Growth Stage</Label>
              <select 
                value={stage} 
                onChange={e => setStage(e.target.value)}
                className="input"
              >
                <option value="">Select stage</option>
                <option value="seedling">Seedling</option>
                <option value="vegetative">Vegetative</option>
                <option value="flowering">Flowering</option>
                <option value="harvest">Harvest</option>
              </select>
            </div>
            <div>
              <Label>Plant Height (cm)</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={plantHeight} 
                onChange={e => setPlantHeight(e.target.value)}
                placeholder="e.g., 15.5"
              />
            </div>
            <div>
              <Label>Leaf Count</Label>
              <Input 
                type="number" 
                value={leafCount} 
                onChange={e => setLeafCount(e.target.value)}
                placeholder="e.g., 8"
              />
            </div>
            <div>
              <Label>Temperature (°C)</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={temperature} 
                onChange={e => setTemperature(e.target.value)}
                placeholder="e.g., 24.5"
              />
            </div>
            <div>
              <Label>Humidity (%)</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={humidity} 
                onChange={e => setHumidity(e.target.value)}
                placeholder="e.g., 65.0"
              />
            </div>
            <div>
              <Label>pH Level</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={ph} 
                onChange={e => setPh(e.target.value)}
                placeholder="e.g., 6.2"
              />
            </div>
          </div>
          
          <div>
            <Label>Nutrients Used</Label>
            <Input 
              value={nutrients} 
              onChange={e => setNutrients(e.target.value)}
              placeholder="e.g., NPK 10-10-10, CalMag"
            />
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea 
              placeholder="Additional observations, no unlawful content" 
              value={note} 
              onChange={e => setNote(e.target.value)} 
              required 
            />
          </div>

          <div>
            <Label>Photo</Label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="input"
            />
          </div>

          <Button type="submit">Add Entry</Button>
          {err && <div className="text-sm text-red-400">{err}</div>}
        </form>
      </div>

      {/* Entries List */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold text-green-300">Grow Log Entries</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {grow.entries.map(entry => (
            <div key={entry.id} className="card">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-neutral-400">
                  {new Date(entry.createdAt).toLocaleString()}
                </div>
                {entry.stage && (
                  <span className="badge bg-blue-900/30 border-blue-700/50 text-blue-300">
                    {entry.stage}
                  </span>
                )}
              </div>
              
              {entry.photoPath && (
                <img src={entry.photoPath} alt="Entry photo" className="rounded-xl mb-3 w-full" />
              )}
              
              {/* Metrics Display */}
              {(entry.plantHeight || entry.leafCount || entry.temperature || entry.humidity || entry.ph) && (
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  {entry.plantHeight && (
                    <div className="text-green-400">
                      <strong>Height:</strong> {entry.plantHeight}cm
                    </div>
                  )}
                  {entry.leafCount && (
                    <div className="text-blue-400">
                      <strong>Leaves:</strong> {entry.leafCount}
                    </div>
                  )}
                  {entry.temperature && (
                    <div className="text-orange-400">
                      <strong>Temp:</strong> {entry.temperature}°C
                    </div>
                  )}
                  {entry.humidity && (
                    <div className="text-purple-400">
                      <strong>Humidity:</strong> {entry.humidity}%
                    </div>
                  )}
                  {entry.ph && (
                    <div className="text-cyan-400">
                      <strong>pH:</strong> {entry.ph}
                    </div>
                  )}
                </div>
              )}
              
              {entry.nutrients && (
                <div className="text-sm text-yellow-400 mb-2">
                  <strong>Nutrients:</strong> {entry.nutrients}
                </div>
              )}
              
              <p className="text-neutral-200 whitespace-pre-wrap">{entry.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}