import { getProduct } from "@/app/products/actions";
import { notFound } from "next/navigation";
import UpdProductForm from "./upd-form";

interface PageProps {
  params: Promise<{ id: string }>
}
export default async function Page({ params }: PageProps) {
  const {id} = await params
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <UpdProductForm product={product} />;
}
