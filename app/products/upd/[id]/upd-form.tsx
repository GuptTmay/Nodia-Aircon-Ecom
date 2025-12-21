// app/products/[id]/edit/edit-form.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateProduct } from "@/app/products/actions";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const id = await updateProduct(product.id, formData);
    router.push(`/products/${id}`);
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">

          <div>
            <Label>Title</Label>
            <Input name="title" defaultValue={product.title} required />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              defaultValue={product.description ?? ""}
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product.price}
              required
            />
          </div>

          <div>
            <Label>Discounted Price</Label>
            <Input
              name="discountedPrice"
              type="number"
              step="0.01"
              defaultValue={product.discountedPrice ?? ""}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input name="category" defaultValue={product.category} />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input name="image_url" defaultValue={product.imageUrl} />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox name="enquiry" defaultChecked={product.enquiry} />
            <Label>Enquiry Enabled</Label>
          </div>

          <Button type="submit" className="w-full">
            Update Product
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
