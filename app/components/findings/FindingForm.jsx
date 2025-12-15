"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Card from "../UI/Card";

export default function FindingForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      id: Date.now(), // temp ID for frontend-only
      title,
      category,
      severity,
      date: new Date().toISOString().split("T")[0],
    });

    setTitle("");
    setCategory("");
    setSeverity("Low");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="SQL Injection"
          required
        />

        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Web, Auth, Cloud…"
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-200">
            Severity
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 
                       px-3 py-2 text-sm text-slate-100
                       focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <Button type="submit">Add Finding</Button>
      </form>
    </Card>
  );
}
