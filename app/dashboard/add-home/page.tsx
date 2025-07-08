import AddPropertyForm from "@/components/dashboard/add-property-form";

export default function page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to list your property
        </p>
      </div>
      <AddPropertyForm />
    </div>
  );
}
