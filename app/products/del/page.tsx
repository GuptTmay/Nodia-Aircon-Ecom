"use client"

import {deleteProduct} from "@/app/products/actions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const prodId = await deleteProduct(formData.get('id') as string);
    router.push(`/`);
  }


  return (
   <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Delete Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">

          <div className="space-y-1">
            <Label htmlFor="id">Product to Delete Title</Label>
            <Input id="id" name="id" required />
          </div>

          <Button type="submit" className="w-full">
            Delete Product
          </Button>

        </form>
      </CardContent>
    </Card> 
  )
}
