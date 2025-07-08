// formConfig.ts
export const homeFormFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "e.g. Modern Apartment in Bole",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe your property...",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "e.g. Bole, near Edna Mall",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "e.g. Addis Ababa",
  },
  {
    name: "state",
    label: "Region/State",
    type: "text",
    placeholder: "e.g. Oromia",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "e.g. 1500000",
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    options: ["ETB", "USD"],
  },
  {
    name: "type",
    label: "Property Type",
    type: "select",
    options: ["house", "apartment", "condo", "townhouse", "real estate"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["for sale", "for rent", "sold"],
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    type: "number",
  },
  {
    name: "bathrooms",
    label: "Bathrooms",
    type: "number",
  },
  {
    name: "area",
    label: "Area (optional)",
    type: "text",
    placeholder: "e.g. 120 sqm",
  },
  {
    name: "pets_allowed",
    label: "Pets Allowed",
    type: "checkbox",
  },
];
