"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/users";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Role } from "@prisma/client";

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await createUser(fd);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard/users");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/users" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 hindi-text">नवीन वापरकर्ता</h1>
          <p className="text-gray-500 text-sm">Add New User</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2 hindi-text">नाव *</label>
            <input name="name" required className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Email *</label>
            <input name="email" type="email" required className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Password *</label>
            <input name="password" type="password" required className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2 hindi-text">भूमिका (Role) *</label>
            <select name="role" className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white">
              <option value="STAFF">Staff (फक्त बिले बनवू शकतात)</option>
              <option value="ADMIN">Admin (संपूर्ण प्रवेश)</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Link href="/dashboard/users" className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-50 hindi-text">रद्द करा</Link>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white rounded-xl font-bold hindi-text">
              {loading ? "जतन होत आहे..." : "✓ जतन करा"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
