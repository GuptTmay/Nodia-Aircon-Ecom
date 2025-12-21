// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";



// GET - Fetch all products or a single product by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const product = prisma.product.findUnique({
      where: {id: id}
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }
  const products = prisma.product.findMany();

  return NextResponse.json(products);
}

// // POST - Create a new product
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, price, category } = body;

//     // Validation
//     if (!name || !price || !category) {
//       return NextResponse.json(
//         { error: 'Missing required fields: name, price, category' },
//         { status: 400 }
//       );
//     }

//     const newProduct = {
//       id: nextId++,
//       name,
//       price,
//       category,
//     };

//     products.push(newProduct);
//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
//   }
// }

// // PUT - Update a product
// export async function PUT(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
//     }

//     const body = await request.json();
//     const productIndex = products.findIndex(p => p.id === parseInt(id));

//     if (productIndex === -1) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     products[productIndex] = {
//       ...products[productIndex],
//       ...body,
//       id: products[productIndex].id, // Prevent ID change
//     };

//     return NextResponse.json(products[productIndex]);
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
//   }
// }

// // DELETE - Delete a product
// export async function DELETE(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
//   }

//   const productIndex = products.findIndex(p => p.id === parseInt(id));

//   if (productIndex === -1) {
//     return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//   }

//   const deletedProduct = products.splice(productIndex, 1);
//   return NextResponse.json(deletedProduct[0]);
// }