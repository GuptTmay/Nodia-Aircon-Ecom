export default async function ProductDetails({ 
  params, 
}: { 
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId; 
  console.log(productId)
  return (
    <h1 className="text-3xl font-bold underline">
      My Product id {productId}
    </h1>
  )
}
