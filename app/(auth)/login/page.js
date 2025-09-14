"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button, Input, Label } from "@/components/Form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("Invalid credentials");
    else window.location.href = "/";
  };

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <Button type="submit">Sign in</Button>
      </form>
      <p className="mt-3 text-sm text-neutral-400">No account? <Link className="link" href="/register">Register</Link></p>
    </div>
  );
}