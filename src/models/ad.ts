import axios from 'axios';
import { GlobalConsts } from '~/constants/constants';

interface AdData {
  id: number;
  storeID: number;
  name: string;
  url: string;
  image: string;
  expiresAt: string; // Assuming expiresAt is a string date representation
}

export class Ad {
  public readonly id: number;
  public readonly storeID: number;
  public readonly name: string;
  public readonly url: string;
  public readonly image: string;
  public readonly expiresAt: Date;

  constructor(data: AdData) {
    this.id = data.id;
    this.storeID = data.storeID;
    this.name = data.name;
    this.url = data.url;
    this.image = data.image;
    this.expiresAt = new Date(data.expiresAt);
  }

  static async fetchMany(pincode: string): Promise<Ad[]> {
    const ads: Ad[] = [];
    try {
      const response = await axios.get(`${GlobalConsts.backend_url}/ad/?pincode=${pincode}`);
      if (response.status === 200) {
        const data: AdData[] = response.data;
        data.forEach(ad => {
          ads.push(new Ad(ad));
        });
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
    return ads;
  }
}