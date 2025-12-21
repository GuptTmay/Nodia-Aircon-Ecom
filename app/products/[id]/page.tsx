import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Heart, Share2, MessageSquare } from "lucide-react"
import { notFound } from "next/navigation"
import { getProduct } from '@/app/products/actions'


interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params

  const product = await getProduct(id)
  if (!product || product.deletedAt) {
    notFound()
  }

  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
    : 0

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercent}%
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm text-gray-600 font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-700 ml-2">(0 reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-b pb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${(product.discountedPrice || product.price).toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t pt-6">
              <Button size="lg" className="w-full">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Enquiry
              </Button>
            </div>

            {/* Share */}
            <Button variant="ghost" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Product
            </Button>
          </div>
        </div>

        <div>
          <h1 className='text-2xl font-bold'>{product.id}</h1>
        </div>
      </div>
    </main>
  )
}

// generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id) 

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: product.title,
    description: product.description || `Buy ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.imageUrl]
    }
  }
}