export const selectFilters = [
  {
    key: "status",
    label: "Status",
    placeholder: "Any Status",
    default: "all",
    options: [
      { value: "all", label: "Any Status" },
      { value: "for sale", label: "For Sale" },
      { value: "for rent", label: "For Rent" },
      { value: "sold", label: "Sold" },
    ],
  },
  {
    key: "homeType",
    label: "Home Type",
    placeholder: "Any Type",
    default: "all",
    options: [
      { value: "all", label: "Any Type" },
      { value: "house", label: "House" },
      { value: "condo", label: "Condo" },
      { value: "townhouse", label: "Townhouse" },
      { value: "apartment", label: "Apartment" },
      { value: "real states", label: "Real states" },
    ],
  },
  {
    key: "beds",
    label: "Bedrooms",
    placeholder: "Any",
    default: "any",
    options: [
      { value: "any", label: "Any" },
      { value: "1", label: "1+" },
      { value: "2", label: "2+" },
      { value: "3", label: "3+" },
      { value: "4", label: "4+" },
      { value: "5", label: "5+" },
    ],
  },
  {
    key: "baths",
    label: "Bathrooms",
    placeholder: "Any",
    default: "any",
    options: [
      { value: "any", label: "Any" },
      { value: "1", label: "1+" },
      { value: "2", label: "2+" },
      { value: "3", label: "3+" },
      { value: "4", label: "4+" },
    ],
  },
];

export const inputFilters = [
  {
    key: "minPrice",
    label: "Min Price",
    placeholder: "$0",
  },
  {
    key: "maxPrice",
    label: "Max Price",
    placeholder: "No limit",
  },
];
