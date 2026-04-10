"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  if (!name?.trim()) return { error: "श्रेणीचे नाव आवश्यक आहे" };

  const productIds = formData.getAll("productIds") as string[];

  const category = await prisma.category.create({
    data: {
      name: name.trim(),
      products: {
        create: productIds.map((id, idx) => ({
          productId: id,
          order: idx + 1,
        })),
      },
    },
  });

  revalidatePath("/dashboard/categories");
  return { success: true, id: category.id };
}

export async function updateCategory(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const productIds = formData.getAll("productIds") as string[];

  await prisma.categoryProduct.deleteMany({ where: { categoryId: id } });
  await prisma.category.update({
    where: { id },
    data: {
      name: name.trim(),
      products: {
        create: productIds.map((pid, idx) => ({
          productId: pid,
          order: idx + 1,
        })),
      },
    },
  });

  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.category.delete({ where: { id } });
  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function getCategoryWithProducts(id: string) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: { product: true },
        orderBy: { order: "asc" },
      },
    },
  });
}
