import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditUserForm from "@/components/edit-user-form";
import { auth } from "@/auth";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/dashboard");

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, role: true } });
  if (!user) notFound();

  return <EditUserForm user={user} />;
}
