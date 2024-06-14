import axios from 'axios';
// import { GlobalConsts } from '~/constants/constants';
// import { GlobalConsts } from 'path-to-constants';
import GlobalConsts from '~/constants/constants';

class SizeVariant {
  id: number;
  productID: string;
  size: string;
  price: number;
  quantity: number;

  constructor({
    id,
    productID,
    size,
    price,
    quantity
  }: {
    id: number;
    productID: string;
    size: string;
    price: number;
    quantity: number;
  }) {
    this.id = id;
    this.productID = productID;
    this.size = size;
    this.price = price;
    this.quantity = quantity;
  }

  toJson() {
    return {
      id: this.id,
      product_id: this.productID,
      size: this.size,
      price: this.price,
      quantity: this.quantity,
    };
  }

  static fromJson(json: any): SizeVariant {
    return new SizeVariant({
      id: json['id'],
      productID: json['product_id'],
      size: json['size'],
      price: json['price'],
      quantity: json['quantity'],
    });
  }
}

class ColorVariant {
  id: number;
  productID: string;
  color: string;
  price: number;
  quantity: number;

  constructor({
    id,
    productID,
    color,
    price,
    quantity
  }: {
    id: number;
    productID: string;
    color: string;
    price: number;
    quantity: number;
  }) {
    this.id = id;
    this.productID = productID;
    this.color = color;
    this.price = price;
    this.quantity = quantity;
  }

  toJson() {
    return {
      id: this.id,
      product_id: this.productID,
      color: this.color,
      price: this.price,
      quantity: this.quantity,
    };
  }

  static fromJson(json: any): ColorVariant {
    return new ColorVariant({
      id: json['id'],
      productID: json['product_id'],
      color: json['color'],
      price: json['price'],
      quantity: json['quantity'],
    });
  }
}

class ProductImage {
  id: number;
  productID: string;
  image: string;

  constructor({
    id,
    productID,
    image
  }: {
    id: number;
    productID: string;
    image: string;
  }) {
    this.id = id;
    this.productID = productID;
    this.image = image;
  }

  static fromJson(json: any): ProductImage {
    return new ProductImage({
      id: json['id'],
      productID: json['product_id'],
      image: json['image'],
    });
  }
}

class Product {
  id: string;
  name: string;
  description: string;
  mrp: number;
  quantityUnit: string;
  msrp: number;
  discount_price: number;
  images: ProductImage[];
  size_variants: SizeVariant[];
  colorVariants: ColorVariant[];
  brand: string;
  critical_quantity?: number;
  customCode: string;
  category: string;
  store_id: string;
  barcode: string;
  type?: string;
  veg_type?: string;
  servers?: number;
  store_name?: string;

  constructor({
    id,
    name,
    description,
    quantityUnit,
    mrp,
    msrp,
    discountPrice = 0,
    brand = '',
    criticalQuantity,
    customCode = "",
    sizeVariants = [],
    colorVariants = [],
    images = [],
    category,
    storeID,
    barcode,
    type,
    vegType,
    servers,
    storeName
  }: {
    id: string;
    name: string;
    description: string;
    quantityUnit: string;
    mrp: number;
    msrp: number;
    discountPrice?: number;
    brand?: string;
    criticalQuantity?: number;
    customCode?: string;
    sizeVariants?: SizeVariant[];
    colorVariants?: ColorVariant[];
    images?: ProductImage[];
    category: string;
    storeID: string;
    barcode: string;
    type?: string;
    vegType?: string;
    servers?: number;
    storeName?: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantityUnit = quantityUnit;
    this.mrp = mrp;
    this.msrp = msrp;
    this.discount_price = discountPrice;
    this.brand = brand;
    this.critical_quantity = criticalQuantity;
    this.customCode = customCode;
    this.size_variants = sizeVariants;
    this.colorVariants = colorVariants;
    this.images = images;
    this.category = category;
    this.store_id = storeID;
    this.barcode = barcode;
    this.type = type;
    this.veg_type = vegType;
    this.servers = servers;
    this.store_name = storeName;
  }

  static async fetchMany(storeID: string): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/products/store/${storeID}`);
      if (response.status === 200) {
        const productsData = response.data;
        console.log(productsData);
        productsData.forEach((product: any) => {
          products.push(Product.fromJson(product));
        });
      }
    } catch (error) {
      console.error(error);
    }
    return products;
  }

  static async fetchOne(productID: string): Promise<Product> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/products/${productID}`);
      if (response.status === 200) {
        const productData = response.data;
        return Product.fromJson(productData);
      } else {
        throw new Error('Failed to load product');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to load product');
    }
  }

  static async getItemsByOrderId(orderId: number): Promise<Product[] | null> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/product/?order_id=${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GlobalConsts.token,
        }
      });
      if (response.status === 200) {
        const products: Product[] = response.data.map((product: any) => Product.fromJson(product));
        return products;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async searchProducts(pincode: string, nameContains: string): Promise<Product[]> {
    const products: Product[] = [];
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/search/products/${pincode}?term=${nameContains}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GlobalConsts.token,
        }
      });
      if (response.status === 200) {
        response.data.forEach((product: any) => {
          products.push(Product.fromJson(product));
        });
      }
    } catch (error) {
      console.error(error);
    }
    return products;
  }

  static fromJson(json: any): Product {
    return new Product({
      id: json['id'],
      name: json['name'],
      description: json['description'],
      quantityUnit: json['quantity_unit'],
      mrp: json['mrp'],
      msrp: json['msrp'],
      discountPrice: json['discount_price'],
      barcode: json['barcode'],
      images: json['images'] ? json['images'].map((image: any) => ProductImage.fromJson(image)) : [],
      category: json['category'],
      storeID: json['store_id'],
      brand: json['brand'],
      criticalQuantity: json['critical_quantity'],
      customCode: json['custom_code'] ?? '',
      sizeVariants: json['size_variants'] ? json['size_variants'].map((sizeVariant: any) => SizeVariant.fromJson(sizeVariant)) : [],
      colorVariants: json['color_variants'] ? json['color_variants'].map((colorVariant: any) => ColorVariant.fromJson(colorVariant)) : [],
      type: json['type'],
      vegType: json['veg_type'],
      servers: json['servers'],
      storeName: json['store_name'],
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      mrp: this.mrp,
      msrp: this.msrp,
      discount_price: this.discount_price,
      barcode: this.barcode,
      images: this.images.map(image => ({ id: image.id, image: image.image })),
      category: this.category,
      store_id: this.store_id,
      brand: this.brand,
      critical_quantity: this.critical_quantity,
      custom_code: this.customCode,
      size_variants: this.size_variants.map(sizeVariant => sizeVariant.toJson()),
      color_variants: this.colorVariants.map(colorVariant => colorVariant.toJson()),
      type: this.type,
      veg_type: this.veg_type,
      servers: this.servers,
      store_name: this.store_name,

    };
  }
}


export { Product, ProductImage, SizeVariant, ColorVariant }