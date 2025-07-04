import { PropertyForm } from "@/types/home";

export function generateProperties(
  count: number,
  ownerId: string
): PropertyForm[] {
  const propertyTypes = [
    "condo",
    "house",
    "apartment",
    "townhouse",
    "real estate",
  ] as const;
  const statuses = ["for sale", "sold", "for rent"] as const;
  const cities = ["Addis Ababa", "Bole", "Kazanchis", "Arada"];
  const states = ["Addis Ababa"];
  const titles = [
    "Beautiful Home",
    "Cozy Apartment",
    "Luxury Condo",
    "Spacious Townhouse",
    "Modern House",
    "Charming Property",
  ];
  const descriptions = [
    "Lovely property with great views",
    "Close to amenities",
    "Recently renovated",
    "Perfect for families",
    "Spacious and bright",
    "Quiet neighborhood",
  ];
  const addresses = [
    "123 Main St",
    "456 Oak St",
    "789 Pine Ave",
    "101 Maple Rd",
    "202 Elm St",
    "303 Cedar Ln",
  ];
  const imagesList = [
    "https://photos.zillowstatic.com/fp/5b1ca422747838fa2a0102496066c95f-p_e.webp",
    "https://photos.zillowstatic.com/fp/f9aac1aacf87ed3db2aa85863ad5b5ec-p_e.webp",
    "https://photos.zillowstatic.com/fp/c3b2606baf0055cf67efd3bde38231c1-p_e.webp",
    "https://photos.zillowstatic.com/fp/bc800205096ec4d211a5c25d411dc937-p_e.webp",
    "https://photos.zillowstatic.com/fp/cd0d3e27d6460e0b8a4f2bd989e9a873-p_e.webp",
    "https://photos.zillowstatic.com/fp/b07b1cb9175fd96ade2c6288765cae49-p_e.webp",
  ];

  function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickRandomMultiple<T>(arr: T[], min: number, max: number): T[] {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function getRandomAddisAbabaCoords(): { lat: number; lng: number } {
    // Addis Ababa general coordinates: 9.03°N, 38.74°E
    const baseLat = 9.03;
    const baseLng = 38.74;
    const latOffset = (Math.random() - 0.5) * 0.1; // ±0.05°
    const lngOffset = (Math.random() - 0.5) * 0.1;
    return {
      lat: +(baseLat + latOffset).toFixed(6),
      lng: +(baseLng + lngOffset).toFixed(6),
    };
  }

  const properties: PropertyForm[] = [];

  for (let i = 1; i <= count; i++) {
    const city = pickRandom(cities);
    const state = pickRandom(states);
    const title = pickRandom(titles);
    const description = pickRandom(descriptions);
    const address = pickRandom(addresses);
    const images = pickRandomMultiple(imagesList, 5, 6); // At least 5 images
    const { lat, lng } = getRandomAddisAbabaCoords();

    properties.push({
      address,
      description,
      title,
      price: Math.floor(50000 + Math.random() * 450000),
      bedrooms: 1 + Math.floor(Math.random() * 6),
      bathrooms: 1 + Math.floor(Math.random() * 4),
      images,
      status: pickRandom([...statuses]),
      area: `${Math.floor(500 + Math.random() * 2500)} sqft`,
      city,
      state,
      zip_code: (10000 + Math.floor(Math.random() * 90000)).toString(),
      type: pickRandom([...propertyTypes]),
      is_verified: Math.random() < 0.5,
      owner_id: ownerId,
      is_price_reduced: Math.random() < 0.1,
      lat,
      lng,
      currency: "ETB",
      is_available: true,
      pets_allowed: Math.random() < 0.5,
      amenities: "WiFi, Parking",
      utilities: { water: "included", electricity: "included" },
    });
  }

  return properties;
}
