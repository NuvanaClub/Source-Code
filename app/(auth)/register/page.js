"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Label } from "@/components/Form";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({}));
      setErr(j.error || "Registration failed");
    } else {
      setMsg("Registered! You can sign in now.");
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        {msg && <div className="text-green-400 text-sm">{msg}</div>}
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <Button type="submit">Create account</Button>
      </form>
      <p className="mt-3 text-sm text-neutral-400">Have an account? <Link className="link" href="/login">Sign in</Link></p>
    </div>
  );
}