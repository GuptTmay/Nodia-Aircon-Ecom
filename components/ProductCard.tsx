"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductCardProps {
  id: string
  imageUrl: string
  title: string
  description?: string | null
  price: number
  discountedPrice?: number | null
  category: string
}

export function ProductCard({
  id,
  imageUrl,
  title,
  description,
  price,
  discountedPrice,
  category
}: ProductCardProps) {
  const hasDiscount = discountedPrice && discountedPrice < price
  const router = useRouter();

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      
      <CardHeader className="flex-1">
        <div className="text-sm text-gray-600 mb-2">{category}</div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            ${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        <Button onClick={() => router.push("/products/" + id) } className="w-full" variant="default">
          View Product
        </Button>
      </CardContent>
    </Card>
  )
}