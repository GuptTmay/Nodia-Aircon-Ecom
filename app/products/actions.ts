// app/actions/createProduct.ts
'use server';
import prisma from "@/lib/prisma";
import { ProductCreateInput } from "../generated/prisma/models";
import { Product } from "../generated/prisma/client";

export async function createProduct(formData: FormData): Promise<String>{
  const data: ProductCreateInput = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    discountedPrice: Number(formData.get('discountedPrice')) || null,
    category: formData.get('category') as string,
    imageUrl: formData.get('image_url') as string,
    enquiry: formData.get('enquiry') === 'on',
  };

  // console.log(formData)
  // console.log(data)
  
  const user = await prisma.product.create({ data })
  return user.id; 
}

export async function getProduct(
  productId: string,
): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  return product;
}

export async function updateProduct(
  productId: string,
  formData: FormData
): Promise<string> {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    discountedPrice: Number(formData.get('discountedPrice')) || null,
    category: formData.get('category') as string,
    imageUrl: formData.get('image_url') as string,
    enquiry: formData.get('enquiry') === 'on',
  };

  const product = await prisma.product.update({
    where: { id: productId },
    data,
  });

  return product.id;
}

export async function deleteProduct(productId: string): Promise<String>{
  const product = await prisma.product.delete({
    where: { id: productId },
  });
  return product.id
} 

// {
//   title: "Alpha Headphones",
      //   image_url: "https://picsum.photos/seed/1/200/300",
      //   description: "Wireless over-ear headphones",
      //   price: 199.99,
      //   discountedPrice: 149.99,
      //   category: "audio",
      //   enquiry: false,
      // },