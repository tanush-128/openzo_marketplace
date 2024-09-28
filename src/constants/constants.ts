// Define an enum for StoreType
enum StoreType {
  Store = "store",
  Food = "food",
  Service = "service",
}

// Define the new SubCategory class
class SubCategory {
  name: string;
  metaTags: string[];
  metaDescription: string;

  constructor(
    name: string,
    metaDescription: string = "",
    metaTags: string[] = [],
  ) {
    this.name = name;
    this.metaTags = metaTags;
    this.metaDescription = metaDescription;
  }
}

// Define thenew Category class
class Category {
  //  string;
  //  StoreType;
  //  string[];
  //  string;
  //  new SubCategory[];

  name: string;
  metaDescription: string;
  metaTags: string[];
  type: StoreType;
  subCategories: SubCategory[];

  constructor(
    name: string,
    metaDescription: string,
    metaTags: string[],
    type: StoreType,
    subCategories: SubCategory[],
  ) {
    this.name = name;
    this.type = type;
    this.subCategories = subCategories;
    this.metaTags = metaTags;
    this.metaDescription = metaDescription;
  }
}

// Define the GlobalConsts class
class GlobalConsts {
  static backend_url: string = "https://backend.openzo.in";

  static token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJwYXNzd29yZCI6InF3ZXJ0eTEyOCIsInVzZXJfZW1haWwiOiJ0YW51ZWR1MTI4QGdtYWlsLmNvbSJ9.j5m62NcdDLO5kTrM3bGW1oI0HU-4XkNOUF2Q5pfJuRg";

  static categories: Category[] = [
    new Category(
      "Stores",

      "Search and see all the products available in your local stores using Openzo Super App ,Find everything you need in your locality, conveniently listed and browsable online. Support local businesses         and enjoy a seamless searching experience in [Location].",
      [
        "Shops",
        "Search products",
        "Retail Stores",
        "Local stores ",
        "Local Products",
        "Products In local stores",
        "Local Shopping",
        "Openzo",
        "Support Local Businesses",
      ],
      StoreType.Store,
      [
        new SubCategory(
          "Appliances",

          "Find Best home appliances and kitchen gadgets for your everyday needs which are available in [location] with Openzo Super App. Discover a variety of appliances for cooking, cleaning, and more, conveniently available from local stores in your locality.",
          [
            "Appliances",
            "Home Appliances",
            "Kitchen Gadgets",
            "Cooking Appliances",
            "Cleaning Appliances",
            "Openzo",
            "Local Appliance Stores",
          ],
        ),
        new SubCategory(
          "Electronics",

          "Discover the latest electronics and gadgets at best prices in [location]. With Openzo Super App, find smartphones, laptops, home appliances, and more from trusted brands in your locality.",
          [
            "Electronics",
            "Gadgets",
            "Smartphones",
            "Laptops",
            "Home Appliances",
            "Openzo",
            "Local Electronics Stores",
            "Competitive Prices",
          ],
        ),
        new SubCategory(
          "Furniture",

          "Furnish your home or office with stylish and functional furniture options available in [location] with Openzo Super App. Explore a range of furniture pieces, including sofas, beds, desks, and cabinets, all available from local furniture stores.",
          [
            "Furniture",
            "Home Furniture",
            "Office Furniture",
            "Sofas",
            "Beds",
            "Desks",
            "Cabinets",
            "Openzo",
            "Local Furniture Stores",
          ],
        ),
        new SubCategory(
          "Footwear",

          "Discover the perfect footwear for any occasion available in [location] with Openzo Super App. Explore a range of shoes, sandals, boots, and more from local footwear stores.",
          [
            "Footwear Stores",
            "Shoes",
            "Sandals",
            "Boots",
            "Slippers",
            "Local Footwear Shops",
          ],
        ),
        new SubCategory(
          "Grocery stores",

          "Discover all the grocery products and items available in your local grocery stores with Openzo Super App. Get to know about the best store to buy groceries before stepping out of home.",
          ["local grocery", "grocery stores", "kirana stores", "local stores"],
        ),
        new SubCategory(
          "Jewellery & Accessories",

          "Elevate your look with exquisite jewellery and stylish accessories available in [location] with Openzo Super App. Explore a variety of options from local jewellery stores, including rings, necklaces, watches, and more.",
          [
            "Jewellery",
            "Accessories",
            "Rings",
            "Necklaces",
            "Watches",
            "Fashion Accessories",
            "Openzo",
            "Local Jewellery Stores",
          ],
        ),
        new SubCategory(
          "Sports",

          "Get active with the latest sports equipment and gear available in [Location] with Openzo Super App. Find everything you need for your favorite sports and outdoor activities, including apparel and equipment, all available from local stores.",
          [
            "Sports",
            "Sports Equipment",
            "Sports Gear",
            "Outdoor Activities",
            "Sports Apparel",
            "Openzo",
            "Local Sports Stores",
            "Active Lifestyle",
          ],
        ),
        new SubCategory(
          "Books & Stationary",

          "Find everything you need to fuel your creativity and productivity on Openzo Super App. Explore a diverse selection of books and stationery supplies from local sellers.",
          [
            "Books",
            "Stationery",
            "Educational Books",
            "Office Supplies",
            "Arts & Crafts",
            "Openzo",
            "Local Bookstores",
            "Stationery Shops",
          ],
        ),
        new SubCategory(
          "Fashion",

          "Discover all the Clothes, Models, and Fashion available in [location] with Openzo Super App. Explore a variety of clothing, brands, styles, and sizes in your local stores.",
          [
            "Fashion",
            "Clothing",
            "Best Clothing",
            "Top Clothing",
            "High Quality Garments",
            "Openzo",
            "Local Stores",
          ],
        ),
        new SubCategory(
          "General stores",

          "Find everything you need for everyday life at your local general stores with Openzo Super App. Explore a variety of products from snacks and beverages to household items, all conveniently available in [location].",
          [
            "General Stores",
            "General Merchandise",
            "Everyday Essentials",
            "Snacks",
            "Beverages",
            "Openzo",
            "Local General Stores",
          ],
        ),
        new SubCategory(
          "Household",

          "Make your home sparkle with essential household items available in [location] with Openzo Super App. Explore a variety of cleaning supplies, kitchenware, home decor, and more from local stores.",
          [
            "Household",
            "Household Essentials",
            "Cleaning Supplies",
            "Kitchenware",
            "Home Decor",
            "Openzo",
            "Local Household Stores",
          ],
        ),
        new SubCategory(
          "Personal care",

          "Pamper yourself with high quality personal care products available in [location] with Openzo Super App. Find skincare, haircare, and grooming essentials from local stores, tailored to meet your individual needs.",
          [
            "Personal Care",
            "Skincare",
            "Haircare",
            "Grooming Products",
            "Beauty Products",
            "Openzo",
            "Local Personal Care Stores",
          ],
        ),
      ],
    ),
    new Category(
      "Home Services",

      "Get things done around the house with ease! Find trusted professionals for home cleaning, repairs, renovations, and more in [location] on Openzo Super App.",
      [
        "Home Services",
        "Home Cleaning",
        "Plumbing Services",
        "Electrical Services",
        "Appliance Repair",
        "AC Repair",
        "Painting Services",
        "Furniture Assembly",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "AC Repair",

          "Keep your cool with reliable AC repair services near you! Find Openzo's local professionals for air conditioning installation, maintenance, and repair. Schedule appointments conveniently online and enjoy a stress-free experience.",
          [
            "AC Repair",
            "Air Conditioning Repair",
            "AC Installation",
            "HVAC Services",
            "Openzo",
            "Local AC Repair Services",
            "Convenient Online Booking",
          ],
        ),
        new SubCategory(
          "Electrician",

          "Keep your home safe with reliable electricians on Openzo Super App. Find local professionals for electrical repairs, installations, wiring, and maintenance. Schedule appointments online and enjoy peace of mind.",
          [
            "Electrician",
            "Electrical Services",
            "Electrical Repairs",
            "Wiring",
            "Installations",
            "Openzo",
            "Local Electricians",
            "Peace of Mind",
          ],
        ),
        new SubCategory(
          "Painter",

          "Refresh your space with professional painting services on Openzo Super App. Find local painters for interior and exterior painting, wall treatments, and decorative finishes.",
          [
            "Painter",
            "Painting Services",
            "Interior Painting",
            "Exterior Painting",
            "Wall Treatments",
            "Openzo",
            "Local Painters",
          ],
        ),
        new SubCategory(
          "TV Repair",

          "Get your TV back on track with professional TV repair services on Openzo Super App. Find local electronics repair experts for television troubleshooting, repairs, and maintenance.",
          [
            "TV Repair",
            "Television Repair",
            "TV Troubleshooting",
            "Electronics Repair",
            "Openzo",
            "Local TV Repair Services",
          ],
        ),
        new SubCategory(
          "Beautician",

          "Pamper yourself with professional beauty services at home! Discover experienced beauticians on Openzo Super App for skincare, makeup, hair styling, and more. Enjoy the convenience of in-home beauty treatments.",
          [
            "Beautician",
            "Beauty Services",
            "Skincare",
            "Makeup",
            "Hair Styling",
            "Openzo",
            "Local Beauticians",
            "In-Home Beauty Treatments",
          ],
        ),
        new SubCategory(
          "Mechanic",

          "Get your vehicles repaired effortlessly in [Location]. Find professional mechanics near you on Openzo Super App.",
          ["Vehicle Repair", "Car Repair", "Bike Repair"],
        ),
        new SubCategory(
          "Plumber",

          "Fix the leakage issues and other plumbing issues effortlessly. Connect with skilled plumbers near you with Openzo Super App.",
          ["Plumbing", "Local Plumbers", "Fix Water Leaks"],
        ),
        new SubCategory(
          "Washing Machine Repair",

          "Don't let laundry pile up! Find expert washing machine repair services on Openzo Super App. Explore solutions for washer troubleshooting, maintenance, and repairs from local appliance repair professionals.",
          [
            "Washing Machine Repair",
            "Washer Repair",
            "Appliance Maintenance",
            "Troubleshooting",
            "Openzo",
            "Local Washing Machine Repair",
          ],
        ),
        new SubCategory(
          "Carpenter",

          "Find skilled carpenters in [location] for all your woodworking projects on Openzo Super App. Explore carpentry services including furniture repair, custom carpentry, and more from local experts. Breathe new life into your furniture or create something unique!",
          [
            "Carpenter",
            "Woodworking",
            "Furniture Repair",
            "Custom Carpentry",
            "Openzo",
            "Local Carpenters",
            "Breathe New Life into Furniture",
          ],
        ),
        new SubCategory(
          "Metal Works",

          "Find skilled metalworkers for metal fabrication and repair needs on Openzo Super App. Explore welding, machining, and custom metalwork services from local professionals.",
          [
            "Metal Works",
            "Metal Fabrication",
            "Welding",
            "Machining",
            "Custom Metalwork",
            "Openzo",
            "Local Metalworkers",
          ],
        ),
        new SubCategory(
          "Refrigerator Repair",

          "Keep your food fresh with expert refrigerator repair services on Openzo Super App. Find local appliance repair professionals for fridge maintenance, troubleshooting, and repairs.",
          [
            "Refrigerator Repair",
            "Fridge Repair",
            "Appliance Maintenance",
            "Troubleshooting",
            "Openzo",
            "Local Refrigerator Repair",
          ],
        ),
        new SubCategory(
          "Cook",

          "Elevate your meals with professional cooking services at home! Find experienced cooks and chefs on Openzo Super App for home-cooked meals, catering services, and culinary experiences in your area.",
          [
            "Cook",
            "Cooking Services",
            "Personal Chef",
            "Home-Cooked Meals",
            "Catering Services",
            "Openzo",
            "Local Cooks",
            "Culinary Experiences",
          ],
        ),
        new SubCategory(
          "Transporter",

          "Move with ease! Find local transporters and moving services on Openzo Super App. Explore solutions for local and long-distance transport, moving, and logistics from trusted providers.",
          [
            "Transporter",
            "Moving Services",
            "Transport Solutions",
            "Logistics",
            "Openzo",
            "Local Transporters",
          ],
        ),
        // new SubCategory( 'Others')
      ],
    ),
    new Category(
      "Services",

      "Find all service stores for all your needs in [Location] with Openzo Super App. Our platform connects you with a wide range of local service stores and lets you know about their offerings.",
      ["Service Stores", "Local Service Stores", "Openzo Service Stores"],
      StoreType.Service,
      [
        new SubCategory(
          "Beauty Parlours",

          "Pamper yourself with the best beauty parlours in [Location] on Openzo Super app. Discover a wide range of skincare treatments, makeup services, waxing, threading, and more.",
          [
            "Beauty Parlours",
            "Skincare Treatments",
            "Makeup Services",
            "Waxing",
            "Threading",
            "Openzo",
            "Local Beauty Treatments",
          ],
        ),
        new SubCategory(
          "Car wash",

          "Give your car the shine it deserves! Find the best and top rated car wash services and detailing centers in [Location] with Openzo Super App.",
          [
            "Car Wash",
            "Detailing Services",
            "Car Cleaning",
            "Interior Detailing",
            "Exterior Wash",
            "Openzo",
            "Local Car Wash",
            "Professional Car Cleaning",
          ],
        ),
        new SubCategory(
          "Courier services",

          "Send and receive packages with ease! Find reliable courier and delivery services near you with Openzo Super App. Explore options for local and international deliveries, express shipping, and logistics solutions in [Location].",
          [
            "Courier Services",
            "Delivery Services",
            "Parcel Delivery",
            "Express Shipping",
          ],
        ),
        new SubCategory(
          "GYMs",

          "Best fitness and Gyms on Openzo Super app. Find gyms and fitness centers in [Location] offering a variety of classes, personal training, and world class equipment. Reach your fitness goals with personalized plans and expert guidance.",
          [
            "Gyms",
            "Fitness Centers",
            "Fitness Classes",
            "Personal Training",
            "Openzo",
            "Local Gyms",
          ],
        ),
        new SubCategory(
          "Laundry store",

          "Enjoy clean clothes with minimal effort! Find laundromats and laundry services near you with Openzo Super App. Explore professional laundry cleaning, dry cleaning, and wash and fold options in [Location].",
          [
            "Laundry Stores",
            "Laundry Services",
            "Laundromats",
            "Dry Cleaning",
            "Wash and Fold",
            "Openzo",
            "Convenient Laundry",
          ],
        ),
        new SubCategory(
          "Mechanic Stores",

          "Keep your vehicle in the best condition. Openzo Super app helps you find reliable mechanic shops and auto repair services in [Location]. Get expert solutions for car repairs, maintenance, and diagnostics.",
          ["Mechanic Stores", "Auto Repair", "Car Repairs", "Car Maintenance"],
        ),
        new SubCategory(
          "Repair stores",

          "Get expert repairs for your electronics, appliances, and home. With Openzo Super App, find trusted repair stores in your area offering convenient solutions for all your repair needs.",
          [
            "Repair Stores",
            "Electronics Repair",
            "Appliance Repair",
            "Home Repairs",
            "Openzo",
            "Local Repair Services",
          ],
        ),
        new SubCategory(
          "Saloons",

          "Explore top salons in [location] with Openzo Super app. Book appointments for haircuts, styling, coloring, and other hair beauty services conveniently online.",
          ["Salons", "Hair Salons", "Haircuts", "Hair Styling"],
        ),
      ],
    ),
    new Category(
      "Food",

      "Explore a variety of top rated, best, and famous food options in [location] on Openzo Super App. Find restaurants, cafes, and eateries offering delicious meals, snacks, and beverages in your locality.",
      [
        "Food",
        "Restaurants",
        "Cafes",
        "Fast Food",
        "Street Food",
        "Local Dining",
        "Openzo",
      ],
      StoreType.Food,
      [
        new SubCategory(
          "Bakery",

          "Freshly baked goodness awaits at local bakeries on Openzo Super App. Discover delicious breads, cakes, pastries, and more, made with love by your neighborhood bakers in [location].",
          [
            "Bakeries",
            "Bread",
            "Cakes",
            "Pastries",
            "Bakery Items",
            "Openzo",
            "Local Bakeries",
          ],
        ),
        new SubCategory(
          "Cafe",

          "Relax and recharge at top rated cafes near you with Openzo Super App. Enjoy delicious coffee, tea, pastries, and light meals in a welcoming atmosphere in [location].",
          [
            "Cafe",
            "Coffee Shops",
            "Cafes",
            "Coffee",
            "Tea",
            "Pastries",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Fast Food",

          "Craving something quick and satisfying? Find your favorite fast food restaurants near you with Openzo Super App. Explore a variety of options for burgers, pizzas, fries, and more in [location].",
          [
            "Fast Food",
            "Burgers",
            "Pizzas",
            "Fries",
            "Fast Food Restaurants",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Food Truck",

          "Discover the exciting world of food trucks on Openzo Super App. Explore a variety of mobile eateries offering delicious meals and unique street food specialties in [location].",
          [
            "Food Truck",
            "Mobile Eateries",
            "Food Trucks",
            "Street Food",
            "Local Food Trucks",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Ice Cream Parlour",

          "Find the best ice cream parlors in [location] with Openzo Super App. Enjoy a variety of flavors, toppings, and ice cream creations from your favorite local spots.",
          [
            "Ice Cream Parlour",
            "Ice Cream",
            "Frozen Desserts",
            "Local Ice Cream",
            "Toppings",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Juice shop",

          "Refresh yourself with healthy and delicious juices on Openzo Super App. Find a variety of fresh-pressed juices, vitamin-packed smoothies, and healthy snacks at local juice shops.",
          [
            "Juice Shop",
            "Juices",
            "Smoothies",
            "Fresh-Pressed Juices",
            "Healthy Beverages",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Street foods",

          "Explore the famous and vibrant street food spots in [location] with Openzo Super App. Find a variety of delicious and affordable snacks and meals from local street vendors.",
          [
            "Street Food",
            "Local Street Vendors",
            "Street Food Stalls",
            "Snacks",
            "Affordable Eats",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Sweets",

          "Indulge your sweet tooth with delicious treats from local sweet shops on Openzo Super App. Find a variety of traditional and modern sweets, handcrafted with quality ingredients in [location].",
          [
            "Sweet Shops",
            "Desserts",
            "Sweets",
            "Candy Shops",
            "Local Sweet Shops",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Restaurants",

          "Discover the best restaurants in [location] with Openzo Super App. Explore a diverse range of highly rated dining experiences, from casual cafes to fine dining establishments.",
          [
            "Top Restaurants",
            "Best Restaurants",
            "Fine Dining",
            "Casual Dining",
            "Local Cuisine",
            "Openzo",
          ],
        ),
      ],
    ),
    new Category(
      "Rental stores",

      "Explore a variety of rental services in [location] on Openzo Super App. Find equipment, tools, vehicles, and more available for rent from local rental stores in your area.",
      [
        "Rental Stores",
        "Equipment Rental",
        "Tool Rental",
        "Vehicle Rental",
        "Rental Services",
        "Openzo",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "Banquet Hall",

          "Plan your dream event with ease! Find banquet hall rental services on Openzo Super App. Beautiful venues for weddings, receptions, conferences, and other special occasions. Explore spaces with amenities to suit your needs.",
          [
            "Banquet Halls",
            "Event Venues",
            "Wedding Venues",
            "Party Venues",
            "Openzo",
            "Local Banquet Halls",
          ],
        ),
        new SubCategory(
          "Electronics Rentals",

          "Need a tech upgrade without the commitment? Discover electronics rental services on Openzo Super App. Find the latest gadgets, appliances, and tech devices available for rent, perfect for short-term needs, events, or trying before you buy.",
          [
            "Electronics Rental",
            "Gadget Rental",
            "Appliance Rental",
            "Tech Device Rental",
            "Openzo",
            "Local Electronics Rentals",
          ],
        ),
        new SubCategory(
          "Vehicle Rentals",

          "Find the perfect vehicle for your needs on Openzo Super App. Explore car rentals, bike rentals, van rentals, and more. Whether you need a car for a weekend trip or a truck for a moving project, Openzo has you covered.",
          [
            "Vehicle Rentals",
            "Car Rentals",
            "Bike Rentals",
            "Van Rentals",
            "Truck Rentals",
            "Openzo",
            "Local Vehicle Rentals",
          ],
        ),
        new SubCategory(
          "Bike Rentals",

          "Explore your city or enjoy a scenic ride. Find a bike of your wish for rent in [location] on Openzo Super App. Find bikes and scooters for rent in [location].",
          [
            "Bike Rentals",
            "Scooty Rental",
            "Budget Friendly Bike Rental",
            "Openzo",
            "Local Bike Rentals",
          ],
        ),
        new SubCategory(
          "Fashion Rentals",

          "Look your best for any occasion! Discover fashion rental services on Openzo Super App. Explore a variety of clothing, accessories, and designer items available for rent.",
          [
            "Fashion Rentals",
            "Clothing Rental",
            "Accessory Rental",
            "Designer Rentals",
            "Openzo",
            "Local Fashion Rentals",
            "Special Occasions",
            "Wardrobe Refresh",
          ],
        ),
        new SubCategory(
          "Car Rentals",

          "Hit the road with ease! Find a car of your wish for rent in [location] on Openzo Super App. Explore a variety of vehicles to suit your needs, from compact cars for city driving to spacious SUVs for road trips.",
          [
            "Car Rentals",
            "Rental Cars",
            "Budget Friendly Car Rental",
            "Vehicles",
            "Openzo",
            "Local Car Rentals",
            "Compact Cars",
            "SUV Rentals",
            "Luxury Car Rental",
          ],
        ),
        new SubCategory(
          "Furniture Rentals",

          "Spruce up your space or furnish your temporary living situation! Explore furniture rental services on Openzo Super App. Find options for home furniture, office furniture, and event furniture, available for short-term or long-term needs.",
          [
            "Furniture Rentals",
            "Furniture Hire",
            "Home Furniture Rental",
            "Office Furniture Rental",
            "Event Furniture Rental",
            "Openzo",
            "Local Furniture Rentals",
          ],
        ),
      ],
    ),
    new Category(
      "Coachings",

      "Explore top coaching centers in [location] on Openzo Super App. Find educational tutors, career coaches, sports trainers, and personal development mentors offering guidance and support in your area.",
      [
        "Coaching",
        "Educational Tutors",
        "Career Coaches",
        "Sports Trainers",
        "Personal Development Mentors",
        "Openzo",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "Academic Coaching",

          "Strengthen your academic foundation or reach your full potential! Discover academic coaching centres on Openzo Super App. Find experienced tutors and educators offering personalised support in various subjects, from math and science to languages and test prep.",
          [
            "Academic Coaching",
            "Tutors",
            "Educational Support",
            "Math Tutoring",
            "Science Tutoring",
            "Language Learning",
            "Test Prep",
          ],
        ),
        new SubCategory(
          "Language Coaching",

          "Expand your horizons and communicate with the world! Discover language coaching services in [location] on Openzo Super App. Find qualified tutors and instructors offering personalised lessons in foreign languages and preparing you for language proficiency exams.",
          [
            "Language Coaching",
            "Language Lessons",
            "Foreign Languages",
            "Language Tutors",
            "French Lessons",
            "Spanish Lessons",
            "Language Proficiency",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Technology Coaching",

          "Bridge the tech gap and unlock new skills! Discover software development and training services in [location] on Openzo Super App. Find mentors and coaches offering personalised guidance in programming, web development, digital marketing, and IT skills, empowering you in the tech world.",
          [
            "Technology Coaching",
            "Programming Coaching",
            "Web Development Coaching",
            "Digital Marketing Coaching",
            "IT Skills Training",
            "Coding Bootcamps",
          ],
        ),
        new SubCategory(
          "Arts Coaching",

          "Unleash your creativity or refine your artistic skills! Explore arts coaching centres on Openzo Super App. Find passionate instructors offering personalized lessons in visual arts, performing arts, and creative disciplines to nurture your artistic talent.",
          [
            "Arts Coaching",
            "Art Lessons",
            "Visual Arts",
            "Performing Arts",
            "Creative Disciplines",
            "Painting Lessons",
            "Music Lessons",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Music Coaching",

          "Find your voice or master an instrument! Explore music training services and music classes in [location] on Openzo. Connect with passionate music teachers offering personalized lessons in instruments, voice training, music theory, and performance skills.",
          [
            "Music Coaching",
            "Music Lessons",
            "Instrument Lessons",
            "Voice Training",
            "Music Theory",
            "Performance Coaching",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Test Prep Coaching",

          "Ace your next exam with confidence! Explore test prep coaching centres in [location] on Openzo Super App. Find experienced tutors and instructors offering personalised preparation courses for standardised tests like SAT, ACT, GRE, and more.",
          [
            "Test Prep Coaching",
            "Standardised Test Preparation",
            "JEE Prep",
            "NEET Prep",
            "UPSC Prep",
            "SAT Prep",
            "ACT Prep",
            "GRE Prep",
            "CAT Prep",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Dance Coaching",

          "Find your rhythm and move with confidence! Discover dance training centres on Openzo Super App. Connect with experienced instructors offering lessons in various dance styles, from ballet and jazz to hip-hop and ballroom dancing.",
          [
            "Dance Coaching",
            "Classical Dance",
            "Dance Classes",
            "Dance Masters",
            "Dance Teachers",
          ],
        ),
        new SubCategory(
          "Sports Coaching",

          "Train smarter, achieve your goals! Discover sports coaching centres on Openzo Super App. Find experienced coaches offering personalised training and guidance in various sports disciplines, helping you improve your skills and performance.",
          [
            "Sports Coaching",
            "Sports Training",
            "Soccer Coaching",
            "Cricket Coaching",
            "Badminton Coaching",
            "Chess Coaching",
            "Basketball Coaching",
            "Tennis Coaching",
            "Swimming Coaching",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Wellness Coaching",

          "Invest in your well-being! Discover wellness coaching services in [location] on Openzo Super App. Find certified coaches offering personalised support in fitness training, nutrition guidance, mindfulness practices, and achieving overall well-being.",
          [
            "Wellness Coaching",
            "Fitness Coaching",
            "Nutrition Coaching",
            "Mindfulness Coaching",
            "Well-being Programs",
            "Personal Trainers",
            "Openzo",
          ],
        ),
      ],
    ),
    new Category(
      "Agencies",

      "Discover various agencies in [location] on Openzo Super App. Find professional services including advertising agencies, travel agencies, employment agencies, and more in your locality.",
      [
        "Agencies",
        "Advertising Agencies",
        "Travel Agencies",
        "Employment Agencies",
        "Professional Services",
        "Openzo",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "Advertising Agency",

          "Grow your business with effective advertising! Explore advertising agencies on Openzo Super App. Find creative solutions for digital marketing, branding, and advertising campaigns tailored to your specific needs.",
          [
            "Advertising",
            "Advertising Agencies",
            "Digital Marketing",
            "Branding",
            "Campaign Management",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Event Planning Agency",

          "Make your event unforgettable! Explore event planning agencies in [location] on Openzo Super App. Find event organisers, wedding planners, and corporate event management companies to handle all the details for a seamless and memorable experience.",
          [
            "Event Planning",
            "Event Organizers",
            "Wedding Planners",
            "Corporate Event Management",
            "Event Services",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Travel Agency",

          "Plan your perfect trip with ease! Explore travel agencies in [location] on Openzo Super App. Find travel planners, tour operators, and travel consultants offering personalized travel packages, booking services, and expert advice to create your dream vacation.",
          [
            "Travel",
            "Travel Agencies",
            "Travel Planners",
            "Tour Operators",
            "Travel Consultants",
            "Openzo",
            "Plan Your Perfect Trip",
          ],
        ),
        new SubCategory(
          "Desining Agency",

          "Elevate your brand or project with professional design! Discover designing services on Openzo Super App. Find graphic designers, web designers, and creative agencies offering visual and digital design solutions to bring your ideas to life.",
          [
            "Designing",
            "Graphic Design",
            "Web Design",
            "Creative Agencies",
            "Design Services",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Marketing Agency",

          "Reach your target audience and achieve your marketing goals! Explore marketing agencies in [location] on Openzo Super App. Find experts in digital marketing, social media marketing, and strategic marketing campaigns to boost your business visibility.",
          [
            "Marketing",
            "Marketing Agencies",
            "Digital Marketing",
            "Social Media Marketing",
            "Strategic Marketing",
            "Openzo",
            "Reach Your Target Audience",
          ],
        ),
        new SubCategory(
          "Employement Agency",

          "Find your dream job or build your dream team! Explore employment agencies on Openzo Super App. Discover recruitment agencies offering job placements, career counselling, and connecting you with the right opportunities.",
          [
            "Employment",
            "Employment Agencies",
            "Recruitment Services",
            "Job Placements",
            "Career Counseling",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Printing Press",

          "Get high quality prints for all your needs. Find printing press services in [location] on Openzo Super App. Discover print shops offering printing solutions for business cards, flyers, posters, brochures, and more.",
          [
            "Printing Press",
            "Print Shops",
            "Printing Services",
            "Business Cards",
            "Flyers",
            "Posters",
            "Openzo",
          ],
        ),
      ],
    ),
    new Category(
      "Showrooms",

      "Explore showrooms in [location] on Openzo Super App. Discover a variety of showrooms offering products such as automobiles, electronics, furniture, and more, conveniently located in your area.",
      [
        "Showrooms",
        "Automobile Showrooms",
        "Electronics Showrooms",
        "Furniture Showrooms",
        "Product Showrooms",
        "Openzo",
      ],
      StoreType.Store,
      [
        new SubCategory(
          "Automobile Showrooms",

          "Find the best vehicles to buy in [location] on Openzo Super App. Explore automobile showrooms in [location] offering a variety of cars, motorcycles, SUVs, and more for purchase or browsing.",
          [
            "Automobile Showrooms",
            "Cars",
            "Motorcycles",
            "SUVs",
            "New Car Purchase",
            "Openzo",
            "Test Drive",
          ],
        ),
        new SubCategory(
          "Electronics Showrooms",

          "Find the best electronics and appliances to buy in [location] on Openzo Super App. Find electronics showrooms in [location] showcasing cutting-edge gadgets, appliances, and tech devices.",
          [
            "Electronics Showrooms",
            "Gadgets",
            "Appliances",
            "Tech Devices",
            "New Releases",
            "Openzo",
            "Compare Features",
          ],
        ),
        new SubCategory(
          "Jewellery Showrooms",

          "Find the perfect piece or browse stunning collections in [location] on Openzo Super App. Discover jewellery showrooms in [location] offering a range of rings, necklaces, earrings, and more.",
          [
            "Jewellery Showrooms",
            "Rings",
            "Necklaces",
            "Earrings",
            "Jewellery Stores",
            "Openzo",
            "Perfect Gift",
            "Special Occasion",
          ],
        ),
        new SubCategory(
          "Clothing Showrooms",

          "Find the best clothes to buy in [location] on Openzo Super App. Discover fashion boutiques and clothing showrooms in [location] offering stylish apparel, footwear, and accessories for men, women, and children.",
          [
            "Clothing Stores",
            "Fashion Boutiques",
            "Apparel",
            "Footwear",
            "Accessories",
            "Openzo",
            "Latest Trends",
          ],
        ),
        new SubCategory(
          "Furniture Showrooms",

          "Find the best furniture to buy in [location] on Openzo Super App! Explore furniture showrooms in [location] offering a variety of home and office furniture, decor items, and furnishings.",
          [
            "Furniture Showrooms",
            "Home Furniture",
            "Office Furniture",
            "Decor Items",
            "Furnishings",
            "Openzo",
            "Spruce Up Your Space",
          ],
        ),
      ],
    ),
    new Category(
      "Movies & Events",

      "Explore entertainment options in [location] on Openzo Super App. Discover cinemas, movies, live music venues, and more for enjoying leisure activities and cultural experiences in your area.",
      [
        "Entertainment",
        "Cinemas",
        "Theaters",
        "Movies",
        "Live Music Venues",
        "Cultural Experiences",
        "Leisure Activities",
        "Openzo",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "Amusement parks",

          "Create lasting memories! Explore amusement parks and attractions on Openzo Super App. Find theme parks, water parks, and family entertainment centers offering thrilling rides, shows, and attractions for unforgettable outings in [location].",
          [
            "Amusement Parks",
            "Theme Parks",
            "Water Parks",
            "Family Entertainment Centers",
            "Attractions",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Carnivals",

          "Fun for all ages! Discover carnivals and fairs on Openzo Super App. Find local carnivals, fairs, and amusement events featuring exciting rides, games, shows, and festive activities in your area.",
          [
            "Carnivals",
            "Fairs",
            "Amusement Events",
            "Rides",
            "Games",
            "Festive Activities",
            "Openzo",
          ],
        ),
        new SubCategory(
          "Events",

          "Find your next adventure! Explore local events and happenings in [location] on Openzo Super App. Discover concerts, festivals, exhibitions, community events, and more for a variety of entertainment and cultural experiences in [location].",
          [
            "Events",
            "Local Events",
            "Concerts",
            "Festivals",
            "Exhibitions",
            "Community Events",
            "Openzo",
            "Entertainment",
            "Cultural Experiences",
          ],
        ),
        new SubCategory(
          "Movies",

          "Catch the latest blockbusters or revisit classic favorites in [location]. Explore movies and cinemas on Openzo Super App. Find showtimes, movie reviews, and cinema locations for all your entertainment needs in [location].",
          [
            "Movies",
            "Cinemas",
            "Movie Showtimes",
            "Film Reviews",
            "Openzo",
            "Blockbusters",
            "Classic Films",
          ],
        ),
        new SubCategory(
          "Video Games",

          "Level up your gaming experience! Discover video games and gaming centers in [location] on Openzo Super App. Find gaming consoles, arcade games, esports venues, and tournaments for gamers of all skill levels in your locality.",
          [
            "Video Games",
            "Gaming Centers",
            "Arcade Games",
            "Esports Venues",
            "Gaming Consoles",
            "Openzo",
            "Gaming Tournaments",
          ],
        ),
      ],
    ),
    new Category(
      "Explore",

      "Explore your surroundings with Openzo. Discover local attractions, pubs, parties, events, activities, and hidden gems in your area, all conveniently accessible through our platform.",
      [
        "Explore",
        "Local Attractions",
        "Events",
        "Activities",
        "Pubs",
        "Bars",
        "Hidden Gems",
        "Openzo",
      ],
      StoreType.Service,
      [
        new SubCategory(
          "Local Toursims",

          "Uncover the hidden gems of [location]. Explore local tourism spots and attractions on Openzo Super App. Discover historical sites, cultural landmarks, museums, and natural wonders waiting to be explored in your area.",
          [
            "Local Tourism",
            "Tourist Attractions",
            "Historical Sites",
            "Cultural Landmarks",
            "Museums",
            "Natural Wonders",
            "Openzo",
            "Hidden Gems",
          ],
        ),

        new SubCategory(
          "Parks",

          "Breathe in fresh air and connect with nature in [location]. Explore parks and green spaces on Openzo Super App. Find playgrounds, picnic areas, walking trails, gardens, and nature reserves perfect for outdoor activities, relaxation, and family fun.",
          [
            "Parks",
            "Green Spaces",
            "Recreational Areas",
            "Playgrounds",
            "Picnic Areas",
            "Walking Trails",
            "Gardens",
            "Nature Reserves",
            "Openzo",
          ],
        ),
      ],
    ),
    new Category(
      "Businesses",

      "Connect with all the local businesses for your requirements with Openzo Super App. Send enquiries to local businesses effortlessly.",
      [
        "Local Businesses",
        "Find Local Businesses",
        "Openzo",
        "Support Local Businesses",
      ],
      StoreType.Service,
      [new SubCategory("Businesses")],
    ),
    new Category(
      "Hotel",

      "Connect with all the local businesses for your requirements with Openzo Super App. Send enquiries to local businesses effortlessly.",
      ["Hotel", "Place to stay", "Support Local Businesses"],
      StoreType.Service,
      [new SubCategory("Hotel")],
    ),
  ];
}

export default GlobalConsts;

export { StoreType, Category, SubCategory };
