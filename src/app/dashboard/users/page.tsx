import { getUsers } from "@/actions/users";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Shield, User as UserIcon } from "lucide-react";
import DeleteUserButton from "@/components/delete-user-button";

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 hindi-text">वापरकर्ते</h1>
          <p className="text-gray-500 mt-1">Users & Roles Management</p>
        </div>
        <Link
          href="/dashboard/users/new"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md hindi-text"
        >
          <Plus className="w-5 h-5" /> नवीन वापरकर्ता
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b border-green-100">
            <tr>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">नाव</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold">Email</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">भूमिका (Role)</th>
              <th className="text-center py-4 px-4 text-green-800 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {user.role === 'ADMIN' ? <Shield className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  </div>
                  {user.name}
                </td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${user.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {user.role === 'ADMIN' ? 'Admin / मुख्य' : 'Staff / कर्मचारी'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/users/${user.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {session.user.id !== user.id && (
                      <DeleteUserButton id={user.id} name={user.name} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
