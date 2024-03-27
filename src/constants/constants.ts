// Define enums for store types
enum StoreType {
  GeneralStore = "general_store",
  Stationery = "stationery",
  Electronics = "electronics",
  Fashion = "fashion",
  Footwear = "footwear",
  Accessories = "accessories",
  Rental = "rental",
  Grocery = "grocery",
  Beauty = "beauty",
  Sports = "sports",
}

// Define interfaces for store and product categories
interface ProductCategory {
  categoryName: string;
  image: string;
}

interface StoreCategory {
  imageName: string;
  categoryName: string;
  productCategories: ProductCategory[];
  storeType: StoreType;
}

// Define a class to hold global constants
class GlobalConsts {
  // static readonly backend_url = "http://10.145.59.41:8080";
  static readonly backend_url = "https://backend.openzo.in";
  static readonly token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJwYXNzd29yZCI6InF3ZXJ0eTEyOCIsInVzZXJfZW1haWwiOiJ0YW51ZWR1MTI4QGdtYWlsLmNvbSJ9.j5m62NcdDLO5kTrM3bGW1oI0HU-4XkNOUF2Q5pfJuRg";
  static readonly StoreCategories: StoreCategory[] = [
    {
      imageName: "General stores.png",
      categoryName: "General Stores",
      productCategories: [
        { categoryName: "Household essentials", image: "House essentials" },
        { categoryName: "Cleaning supplies", image: "Pantry" },
        { categoryName: "Snacks and beverages", image: "Snacks and drinks" },
        { categoryName: "Personal care products", image: "Self care" },
        { categoryName: "Pet care items", image: "Pet care" },
        { categoryName: "Office supplies", image: "Office essentials" },
        { categoryName: "Toys and games", image: "Toys" },
        { categoryName: "Kitchenware", image: "Kitchen" },
        { categoryName: "Seasonal items", image: "Spices and powders" },
        { categoryName: "Health and wellness", image: "Health and wellness" },
      ],
      storeType: StoreType.GeneralStore,
    },
    {
      imageName: "Stationary stores.png",
      categoryName: "Stationary Stores",
      productCategories: [
        { categoryName: "Writing instruments", image: "writing_instruments" },
        { categoryName: "Notebooks and pads", image: "notebooks_and_pads" },
        { categoryName: "Art supplies", image: "art_supplies" },
        { categoryName: "Desk accessories", image: "desk_accessories" },
        {
          categoryName: "Calendars and planners",
          image: "calendars_and_planners",
        },
        {
          categoryName: "Filing and organization",
          image: "filing_and_organization",
        },
        { categoryName: "Crafting materials", image: "crafting_materials" },
        { categoryName: "School supplies", image: "school_supplies" },
        { categoryName: "Classroom essentials", image: "Classroom essentials" },
      ],
      storeType: StoreType.Stationery,
    },
    {
      imageName: "Electronic stores.png",
      categoryName: "Electronic Stores",
      productCategories: [
        { categoryName: "Smartphones and accessories", image: "Smartphones" },
        { categoryName: "Laptops and computers", image: "Laptop accessories" },
        { categoryName: "Audio devices", image: "Speakers" },
        {
          categoryName: "Cameras and photography equipment",
          image: "Cameras and equipment",
        },
        { categoryName: "Home appliances", image: "Home appliances" },
        {
          categoryName: "Gaming consoles and accessories",
          image: "Gaming Accessories",
        },
        { categoryName: "Wearable technology", image: "Wearables" },
        {
          categoryName: "Batteries and chargers",
          image: "Chargers and batteries",
        },
      ],
      storeType: StoreType.Electronics,
    },
    {
      imageName: "Fashion stores.png",
      categoryName: "Fashion Stores",
      productCategories: [
        { categoryName: "Men’s clothing", image: "mens_clothing" },
        { categoryName: "Women’s clothing", image: "womens_clothing" },
        { categoryName: "Kids’ clothing", image: "kids_clothing" },
        {
          categoryName: "Accessories (hats, scarves, etc.)",
          image: "accessories",
        },
        { categoryName: "Jewelery", image: "jewelery" },
        { categoryName: "Handbags and purses", image: "handbags_and_purses" },
        { categoryName: "Sunglasses", image: "sunglasses" },
      ],
      storeType: StoreType.Fashion,
    },
    {
      imageName: "Footwear stores.png",
      categoryName: "Footwear Stores",
      productCategories: [
        { categoryName: "Men’s shoes", image: "mens_shoes" },
        { categoryName: "Women’s shoes", image: "womens_shoes" },
        { categoryName: "Boots and booties", image: "boots_and_booties" },
        { categoryName: "Slippers", image: "slippers" },
        { categoryName: "Kids’ shoes", image: "kids_shoes" },
      ],
      storeType: StoreType.Footwear,
    },
    {
      imageName: "Accessory stores.png",
      categoryName: "Accessory Stores",
      productCategories: [
        {
          categoryName: "Handbags and clutches",
          image: "handbags_and_clutches.png",
        },
        { categoryName: "Jewelry", image: "jewelry.png" },
        { categoryName: "Hats and caps", image: "hats_and_caps.png" },
        { categoryName: "Scarves and wraps", image: "scarves_and_wraps.png" },
        { categoryName: "Sunglasses", image: "sunglasses.png" },
        { categoryName: "Watches", image: "watches.png" },
        { categoryName: "Belts", image: "belts.png" },
        { categoryName: "Gloves and mittens", image: "gloves_and_mittens.png" },
        { categoryName: "Hair accessories", image: "hair_accessories.png" },
        { categoryName: "Tech accessories", image: "tech_accessories.png" },
      ],
      storeType: StoreType.Accessories,
    },
    {
      imageName: "Rental stores.png",
      categoryName: "Rental Stores",
      productCategories: [
        { categoryName: "Event equipment", image: "event_equipment.png" },
        {
          categoryName: "Tools and machinery",
          image: "tools_and_machinery.png",
        },
        { categoryName: "Party supplies", image: "party_supplies.png" },
        {
          categoryName: "Formal attire rentals",
          image: "formal_attire_rentals.png",
        },
        { categoryName: "Outdoor gear", image: "outdoor_gear.png" },
        { categoryName: "Furniture rentals", image: "furniture_rentals.png" },
        {
          categoryName: "Home appliance rentals",
          image: "home_appliance_rentals.png",
        },
        { categoryName: "Vehicle rentals", image: "vehicle_rentals.png" },
        {
          categoryName: "Audio-visual equipment",
          image: "audio_visual_equipment.png",
        },
        {
          categoryName: "Recreational equipment",
          image: "recreational_equipment.png",
        },
      ],
      storeType: StoreType.Rental,
    },
    {
      imageName: "Grocery stores.png",
      categoryName: "Grocery Stores",
      productCategories: [
        { categoryName: "Fresh produce", image: "fresh_produce.png" },
        { categoryName: "Dairy and eggs", image: "dairy_and_eggs.png" },
        { categoryName: "Meat and seafood", image: "meat_and_seafood.png" },
        {
          categoryName: "Canned and packaged goods",
          image: "canned_and_packaged_goods.png",
        },
        { categoryName: "Bakery items", image: "bakery_items.png" },
        { categoryName: "Frozen foods", image: "frozen_foods.png" },
        { categoryName: "Beverages", image: "beverages.png" },
        { categoryName: "Snacks and sweets", image: "snacks_and_sweets.png" },
        {
          categoryName: "Organic and natural products",
          image: "organic_and_natural_products.png",
        },
        {
          categoryName: "International foods",
          image: "international_foods.png",
        },
      ],
      storeType: StoreType.Grocery,
    },
    {
      imageName: "Beauty and products store.png",
      categoryName: "Beauty and Products",
      productCategories: [
        { categoryName: "Skincare", image: "skincare.png" },
        { categoryName: "Makeup", image: "makeup.png" },
        { categoryName: "Haircare", image: "haircare.png" },
        { categoryName: "Fragrances", image: "fragrances.png" },
        {
          categoryName: "Bath and body products",
          image: "bath_and_body_products.png",
        },
        { categoryName: "Nail care", image: "nail_care.png" },
        {
          categoryName: "Men’s grooming products",
          image: "mens_grooming_products.png",
        },
        {
          categoryName: "Beauty tools and accessories",
          image: "beauty_tools_and_accessories.png",
        },
        { categoryName: "Wellness products", image: "wellness_products.png" },
        {
          categoryName: "Specialty beauty items",
          image: "specialty_beauty_items.png",
        },
      ],
      storeType: StoreType.Beauty,
    },
    {
      imageName: "Internet and technology stores.png",
      categoryName: "Sports Stores",
      productCategories: [
        { categoryName: "Athletic apparel", image: "athletic_apparel.png" },
        {
          categoryName: "Footwear for sports",
          image: "footwear_for_sports.png",
        },
        { categoryName: "Exercise equipment", image: "exercise_equipment.png" },
        { categoryName: "Team sports gear", image: "team_sports_gear.png" },
        {
          categoryName: "Outdoor and adventure gear",
          image: "outdoor_and_adventure_gear.png",
        },
        {
          categoryName: "Yoga and fitness accessories",
          image: "yoga_and_fitness_accessories.png",
        },
        { categoryName: "Swimwear", image: "swimwear.png" },
        { categoryName: "Sports nutrition", image: "sports_nutrition.png" },
        {
          categoryName: "Recovery and injury prevention",
          image: "recovery_and_injury_prevention.png",
        },
        {
          categoryName: "Camping and hiking equipment",
          image: "camping_and_hiking_equipment.png",
        },
      ],
      storeType: StoreType.Sports,
    },
  ];
}

export { StoreType, GlobalConsts };
export type { ProductCategory, StoreCategory };
