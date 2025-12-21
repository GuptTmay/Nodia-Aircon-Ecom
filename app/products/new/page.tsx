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
import { createProduct } from "../actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const id = await createProduct(formData);
    router.push(`/products/${id}`);
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upd Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">

          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="discountedPrice">Discounted Price</Label>
            <Input id="discountedPrice" name="discountedPrice" type="number" step="0.01" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="enquiry" name="enquiry" />
            <Label htmlFor="enquiry">Enquiry Enabled</Label>
          </div>

          <Button type="submit" className="w-full">
            Create Product
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
