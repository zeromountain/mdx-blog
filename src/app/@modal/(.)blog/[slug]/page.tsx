export default function SlugModal({ params }: { params: { slug: string } }) {
  return <div className="bg-red-500">SlugModal{params.slug}</div>;
}
