import { notFound } from "next/navigation";
import { branches } from "@/lib/branches";
import BranchPage from "@/components/branch-page";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // We need to use a sync approach since generateMetadata can be async
  return params.then(({ slug }) => {
    const branch = branches.find((b) => b.slug === slug);
    if (!branch) return { title: "Не найдено" };
    return {
      title: `${branch.name} — от ${branch.priceFrom}₸ | Забронировать`,
      description: `Гостиница Juldyz, ${branch.address}, ${branch.city}. Рейтинг ${branch.rating} на 2ГИС. Чистые номера от ${branch.priceFrom}₸. Круглосуточно. WhatsApp.`,
    };
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = branches.find((b) => b.slug === slug);
  if (!branch) notFound();
  return <BranchPage branch={branch} />;
}
