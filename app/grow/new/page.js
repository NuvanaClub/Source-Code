"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label } from "@/components/Form";

export default function NewGrow() {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    const res = await fetch("/grow/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({}));
      setErr(j.error || "Failed");
    } else {
      const j = await res.json();
      window.location.href = "/grow/" + j.id;
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">New Grow Log</h1>
      <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="My Private Log" required />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}