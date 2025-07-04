export default function Description({ description }: { description: string }) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">Description</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
