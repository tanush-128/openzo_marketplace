import axios from 'axios';
// import { GlobalConsts } from 'path-to-constants';
// import { get as getAsyncStorageItem, set as setAsyncStorageItem } from '@react-native-async-storage/async-storage';
import GlobalConsts from '~/constants/constants';

export interface StoreData {
  id: string;
  name: string;
  image: string;
  location: string;
  selfDeliveryService: boolean;
  pincode: string;
  description: string;
  address: string;
  openingTime: string;
  closingTime: string;
  detailsComplete: boolean;
  category: string;
  subCategory: string;
  primaryCuisine?: string;
  secondaryCuisine?: string;
  avgPricePerPerson?: number;
  pureVeg?: boolean;
  alcohol?: boolean;
  tableCount?: number;
  seatingCapacity?: number;
  reserveTableOnline?: boolean;
  rating: number;
  reviewCount: number;
}

export class Store {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public location: string,
    public pincode: string,
    public description: string,
    public address: string,
    public openingTime: string,
    public closingTime: string,
    public selfDeliveryService: boolean,
    public detailsComplete = false,
    public category = "",
    public subCategory = "",
    public primaryCuisine?: string,
    public secondaryCuisine?: string,
    public avgPricePerPerson?: number,
    public pureVeg?: boolean,
    public alcohol?: boolean,
    public tableCount?: number,
    public seatingCapacity?: number,
    public reserveTableOnline?: boolean,
    public rating = 0.0,
    public reviewCount = 0.0
  ) { }

  static async getStoreWithUserEmail(userEmail: string): Promise<Store | null> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/store/?user_email=${userEmail}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': GlobalConsts.token,
        }
      });
      if (response.status === 200) {
        console.log(response.data);
        return Store.fromJson(response.data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async fetchStore(storeId: string): Promise<Store> {
    try {
      // const token = await getAsyncStorageItem('token');
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MTkwNzA3MTYsInVzZXJfaWQiOiIzNGJlYjMyYi02MTI3LTQzYTUtOTIyOS04MDcyNzFlZTAzMWEifQ.MRry-kfn6-0tWsPQQV8uTP7ss-TO7mWEO_qbnwf4W2E"
      if (!token) throw new Error('Token not found');
  

      const response = await fetch(`${GlobalConsts.backend_url}/stores/${storeId}`,
    
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': token,
        },
      
        next : {
          revalidate:3600
        }

        
      });

      if (response.status === 200) {
        // console.log(Store.fromJson(response.data).name);
        // console.log(await response.json() );
        return Store.fromJson(await response.json());
      } else {
        throw new Error('Failed to load store');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to load store');
    }
  }

  static async getStoresWithPincode(pincode: string): Promise<Store[]> {
    try {
   const response = await fetch(`${GlobalConsts.backend_url}/stores/pincode/${pincode}`, 
        {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        next : {
          revalidate:3600
        }
      }
      );
      if (response.status === 200) {
        const stores: Store[] = await response.json();
        return stores;
      } else {
        return [];
      }

    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getStoreByPincodeAndCategory(pincode: string, category: string): Promise<Store[]> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/stores/pincode/${pincode}/category/${category}`);
      if (response.status === 200) {
        const stores: Store[] = response.data.map((store: any) => Store.fromJson(store));
        return stores;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async searchStores(pincode: string, nameContains: string): Promise<Store[]> {
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/search/stores/${pincode}?term=${nameContains}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': GlobalConsts.token,
        }
      });
      if (response.status === 200) {
        const stores: Store[] = response.data.map((store: any) => Store.fromJson(store));
        return stores;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static fromJson(json: any): Store {
    return new Store(
      json['id'],
      json['name'],
      json['image'],
      json['location'],
      json['pincode'],
      json['description'],
      json['address'],
      json['opening_time'],
      json['closing_time'],
      json['self_delivery_service'],
      json['details_complete'] ?? false,
      json['category'] ?? "",
      json['sub_category'] ?? "",
      json['primary_cuisine'],
      json['secondary_cuisine'],
      json['avg_price_per_person'],
      json['pure_veg'] ?? false,
      json['alcohol'],
      json['table_count'],
      json['seating_capacity'],
      json['reserve_table_online'],
      parseFloat(json['rating'].toString()),
      parseFloat(json['review_count'].toString())
    );
  }
}


// export 