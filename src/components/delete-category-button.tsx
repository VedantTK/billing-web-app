"use client";

import { useState } from "react";
import { deleteCategory } from "@/actions/categories";
import { Trash2 } from "lucide-react";

export default function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!confirm(`"${name}" श्रेणी हटवायची? / Delete "${name}" category?`)) return;
    setLoading(true);
    await deleteCategory(id);
    setLoading(false);
  };
  return (
    <button onClick={handleDelete} disabled={loading} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
