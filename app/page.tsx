import prisma from '@/lib/prisma'
import { ProductCard } from '@/components/ProductCard'

export default async function Home() {
  // const products = await prisma.product.findMany()
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Browse our collection of items</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                description={product.description}
                price={product.price}
                discountedPrice={product.discountedPrice}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}