"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function createUser(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  if (!name || !email || !password) return { error: "सर्व माहिती भरणे आवश्यक आहे" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "हा email आधीच वापरात आहे" };

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUser(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const role = formData.get("role") as Role;
  const password = formData.get("password") as string;

  const updateData: Record<string, string> = { name, role };
  if (password?.trim()) {
    updateData.password = await bcrypt.hash(password, 12);
  }

  await prisma.user.update({ where: { id }, data: updateData });
  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Unauthorized");
  if (session.user.id === id) return { error: "स्वतःला हटवू शकत नाही" };

  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
}
