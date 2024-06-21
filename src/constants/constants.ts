// Define an enum for StoreType
enum StoreType {
  Store = 'store',
  Food = 'food',
  Service = 'service',
}

// Define the SubCategory class
class SubCategory {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Define the Category class
class Category {
  name: string;
  type: StoreType;
  subCategories: SubCategory[];

  constructor(name: string, type: StoreType, subCategories: SubCategory[]) {
    this.name = name;
    this.type = type;
    this.subCategories = subCategories;
  }
}

// Define the ProductCategory class
class ProductCategory {
  categoryName: string;
  image: string;

  constructor(categoryName: string, image: string) {
    this.categoryName = categoryName;
    this.image = image;
  }
}

// Define the StoreCategory class
class StoreCategory {
  imageName: string;
  categoryName: string;
  productCategories: ProductCategory[];

  constructor(imageName: string, categoryName: string, productCategories: ProductCategory[]) {
    this.imageName = imageName;
    this.categoryName = categoryName;
    this.productCategories = productCategories;
  }
}

// Define the GlobalConsts class
class GlobalConsts {
  static backend_url: string = "https://backend.openzo.in";

  static token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJwYXNzd29yZCI6InF3ZXJ0eTEyOCIsInVzZXJfZW1haWwiOiJ0YW51ZWR1MTI4QGdtYWlsLmNvbSJ9.j5m62NcdDLO5kTrM3bGW1oI0HU-4XkNOUF2Q5pfJuRg";

  static categories: Category[] = [
    new Category('Stores', StoreType.Store, [
      new SubCategory('Appliances'),
      new SubCategory('Electronics'),
      new SubCategory('Furniture'),
      new SubCategory('Footwear'),
      new SubCategory('Grocery stores'),
      new SubCategory('Jewellery & Accessories'),
      new SubCategory('Sports'),
      new SubCategory('Books & Stationary'),
      new SubCategory('Fashion'),
      new SubCategory('General stores'),
      new SubCategory('Household'),
      new SubCategory('Personal care'),
    ]),
    new Category('Home Services', StoreType.Service, [
      new SubCategory('AC Repair'),
      new SubCategory('Electrician'),
      new SubCategory('Painter'),
      new SubCategory('TV Repair'),
      new SubCategory('Beautician'),
      new SubCategory('Mechanic'),
      new SubCategory('Plumber'),
      new SubCategory('Washing Machine Repair'),
      new SubCategory('carpenter'),
      new SubCategory('Metal Works'),
      new SubCategory('Refrigator Repair'),
      new SubCategory('Cook'),
      new SubCategory('Transporter'),
      new SubCategory('Others'),
    ]),
    new Category('Services', StoreType.Service, [
      new SubCategory('Beauty Parlours'),
      new SubCategory('Car wash'),
      new SubCategory('Courier services'),
      new SubCategory('GYMs'),
      new SubCategory('Internet stores'),
      new SubCategory('Laundry store'),
      new SubCategory('Mechanic Stores'),
      new SubCategory('Repair stores'),
      new SubCategory('Saloons'),
    ]),
    new Category('Food', StoreType.Food, [
      new SubCategory('Bakery'),
      new SubCategory('Cafe'),
      new SubCategory('Fast Food'),
      new SubCategory('Food Truck'),
      new SubCategory('Ice Cream Parlour'),
      new SubCategory('Juice shop'),
      new SubCategory('Street foods'),
      new SubCategory('Sweets'),
      new SubCategory('Restaurants'),
    ]),
    new Category('Rental stores', StoreType.Service, [
      new SubCategory('Banquet Hall'),
      new SubCategory('Electronics Rentals'),
      new SubCategory('Vehicle Rentals'),
      new SubCategory('Bike Rentals'),
      new SubCategory('Fashion Rentals'),
      new SubCategory('Car rentals'),
      new SubCategory('Furniture Rentals'),
    ]),
    new Category('Coachings', StoreType.Service, [
      new SubCategory('Academic Coaching'),
      new SubCategory('language Coaching'),
      new SubCategory('Technology Coaching'),
      new SubCategory('Arts Coaching'),
      new SubCategory('Music Coaching'),
      new SubCategory('Test Prep Coaching'),
      new SubCategory('Dance Coaching'),
      new SubCategory('Sports Coaching'),
      new SubCategory('Wellness Coaching'),
    ]),
    new Category('Agencies', StoreType.Service, [
      new SubCategory('Advertising Agency'),
      new SubCategory('Event Planning Agency'),
      new SubCategory('Travel Agency'),
      new SubCategory('Desining Agency'),
      new SubCategory('Marketing Agency'),
      new SubCategory('Employement Agency'),
      new SubCategory('Printing Press'),
    ]),
    new Category('Showrooms', StoreType.Store, [
      new SubCategory('Automobile Showrooms'),
      new SubCategory('Electronics Showrooms'),
      new SubCategory('Jewellery Showrooms'),
      new SubCategory('Clothing Showrooms'),
      new SubCategory('Furniture Showrooms'),
    ]),
    new Category('Movies & Events', StoreType.Service, [
      new SubCategory('Amusement parks'),
      new SubCategory('Carnivals'),
      new SubCategory('Events'),
      new SubCategory('Movies'),
      new SubCategory('Video Games'),
    ]),
    new Category('Explore', StoreType.Service, [
      new SubCategory('Local Toursims'),
      new SubCategory('Pubs & Bars'),
      new SubCategory('Parks'),

    ]),
    new Category('Businesses', StoreType.Service, []),
  ];

  static storeCategories: StoreCategory[] = [
    new StoreCategory('General stores.png', 'General Stores', [
      new ProductCategory('Cleaning supplies', 'Pantry'),
      new ProductCategory('Household essentials', 'House essentials'),
      new ProductCategory('Snacks and beverages', 'Snacks and drinks'),
      new ProductCategory('Personal care products', 'Self care'),
      new ProductCategory('Pet care items', 'Pet care'),
      new ProductCategory('Office supplies', 'Office essentials'),
      new ProductCategory('Toys and games', 'Toys'),
      new ProductCategory('Kitchenware', 'Kitchen'),
      new ProductCategory('Seasonal items', 'Spices and powders'),
      new ProductCategory('Health and wellness', 'Health and wellness'),
    ]),
    new StoreCategory('Stationary stores.png', 'Stationary Stores', [
      new ProductCategory('Writing instruments', 'writing_instruments'),
      new ProductCategory('Notebooks and pads', 'notebooks_and_pads'),
      new ProductCategory('Art supplies', 'art_supplies'),
      new ProductCategory('Desk accessories', 'desk_accessories'),
      new ProductCategory('Calendars and planners', 'calendars_and_planners'),
      new ProductCategory('Filing and organization', 'filing_and_organization'),
      new ProductCategory('Crafting materials', 'crafting_materials'),
      new ProductCategory('School supplies', 'school_supplies'),
      new ProductCategory('Classroom essentials', 'Classroom essentials'),
    ]),
    new StoreCategory('Electronic stores.png', 'Electronic Stores', [
      new ProductCategory('Smartphones and accessories', 'Smartphones'),
      new ProductCategory('Laptops and computers', 'Laptop accessories'),
      new ProductCategory('Audio devices', 'Speakers'),
      new ProductCategory('Cameras and photography equipment', 'Cameras and equipment'),
      new ProductCategory('Home appliances', 'Home appliances'),
      new ProductCategory('Gaming consoles and accessories', 'Gaming Accessories'),
      new ProductCategory('Wearable technology', 'Wearables'),
      new ProductCategory('Batteries and chargers', 'Chargers and batteries'),
    ]),
    new StoreCategory('Fashion stores.png', 'Fashion Stores', [
      new ProductCategory('Men’s clothing', 'mens_clothing'),
      new ProductCategory('Women’s clothing', 'womens_clothing'),
      new ProductCategory('Kids’ clothing', 'kids_clothing'),
      new ProductCategory('Accessories (hats, scarves, etc.)', 'accessories'),
      new ProductCategory('Jewelery', 'jewelery'),
      new ProductCategory('Handbags and purses', 'handbags_and_purses'),
      new ProductCategory('Sunglasses', 'sunglasses'),
    ]),
    new StoreCategory('Footwear stores.png', 'Footwear Stores', [
      new ProductCategory('Men’s shoes', 'mens_shoes'),
      new ProductCategory('Women’s shoes', 'womens_shoes'),
      new ProductCategory('Boots and booties', 'boots_and_booties'),
      new ProductCategory('Slippers', 'slippers'),
      new ProductCategory('Kids’ shoes', 'kids_shoes'),
    ]),
    new StoreCategory('Accessory stores.png', 'Accessory Stores', [
      new ProductCategory('Handbags and clutches', 'handbags_and_clutches.png'),
      new ProductCategory('Jewelry', 'jewelry.png'),
      new ProductCategory('Watches', 'watches.png'),
      new ProductCategory('Belts and buckles', 'belts_and_buckles.png'),
      new ProductCategory('Hats and caps', 'hats_and_caps.png'),
    ]),
  ];
}



export default GlobalConsts;

export { StoreType, Category, SubCategory, ProductCategory, StoreCategory };