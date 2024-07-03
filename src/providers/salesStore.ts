import {create} from 'zustand';
import { ColorVariant, Product, SizeVariant } from '~/models/product';
import Sale from '~/models/sale';



interface SaleStoreState {
  onlineOrders: Sale[];
  fetching: boolean;
  fetchOrders: () => Promise<void>;
  sortOnlineOrders: () => void;
  updateOrderStatus: (id: string, orderStatus: string) => void;
  addSale: (onlineOrder: Sale) => Promise<void>;
  updateSale: (onlineOrder: Sale) => Promise<void>;
  updateSaleOrderItems: (product: Product, sizeVariant: SizeVariant | null, colorVariant: ColorVariant | null, quantity: number) => Promise<void>;
  isInCart: (productId: string) => boolean;
  getSaleByStoreId: (storeId :string) => Sale | null;
}

// Create the store
const useSalesStore = create<SaleStoreState>((set, get) => ({
  onlineOrders: [],
  fetching: true,

  fetchOrders: async () => {
        let userDataId = localStorage.getItem('user_data_id');

    const orders = await Sale.getSalesByUserDataID(userDataId ?? '');
    set({ onlineOrders: orders, fetching: false });
  },

  sortOnlineOrders: () => {
    const sorted = get().onlineOrders.slice().sort((a, b) => new Date(b.orderTime ?? 
      new Date()
    ).getTime() - new Date(a.orderTime ?? 
      new Date()
    ).getTime());
    set({ onlineOrders: sorted });
  },

  updateOrderStatus: (id, orderStatus) => {
    const { onlineOrders } = get();
    const index = onlineOrders.findIndex(order => order.id === id);
    if (index !== -1) {
      const newOrders = [...onlineOrders];
      newOrders[index]!.status = orderStatus;
      set({ onlineOrders: newOrders });
    }
  },

  addSale: async (onlineOrder) => {
    const newSale = await Sale.createSale(onlineOrder);
    set(state => ({ onlineOrders: [...state.onlineOrders, newSale] }));
  },

  updateSale: async (onlineOrder) => {
    const updatedSale = await Sale.updateSale(onlineOrder);
    set(state => ({
      onlineOrders: state.onlineOrders.map(order => 
        order.id === onlineOrder.id ? updatedSale : order
      )
    }));
  },

  updateSaleOrderItems: async (product, sizeVariant, colorVariant, quantity) => {
    let { onlineOrders } = get();
    const notPlacedOrder = onlineOrders.find(order => order.status === 'not_placed' && order.store_id === product.store_id);
        let userDataId = localStorage.getItem('user_id');
    
    if (!notPlacedOrder) {
      const newSale = await Sale.createSale({
        id: '',
        store_id: product.store_id,
        order_items: [{
          product_id: product.id,
          quantity,
          color_variant_id: colorVariant?.id ?? 0,
          size_variant_id: sizeVariant?.id ?? 0,
          id: 0,
          order_id: "",
        }],
        customer: {
          address:null,
          id: 0,
          phone: null,
          user_data_id: userDataId,
          saleId: "",
          
        } ,
        total_amount: product.discount_price * quantity,
        undiscounted_total_amount: product.mrp * quantity,
        type: 'online_order',
        status: 'not_placed',
        amountPaid: 0,
      });
      set(state => ({ onlineOrders: [...state.onlineOrders, newSale] }));
      return;
    }
     console.log(notPlacedOrder.order_items);
    const itemIndex = notPlacedOrder.order_items.findIndex(item => item.product_id === product.id);
    if (itemIndex === -1) {
      notPlacedOrder.order_items = [
        ...notPlacedOrder.order_items,{
          id: null,
          product_id: product.id,
          quantity,
          order_id: notPlacedOrder.id,
          size_variant_id: sizeVariant?.id ?? null,
          color_variant_id: colorVariant?.id ?? null,
      }
      ]
    } else if (quantity === 0) {
      notPlacedOrder.order_items.splice(itemIndex, 1);
    } else if (notPlacedOrder.order_items) { // Add null check
      notPlacedOrder.order_items[itemIndex]!.quantity = quantity;
    }
    
    notPlacedOrder.total_amount += product.discount_price * quantity;


    await get().updateSale(notPlacedOrder);
  },

  isInCart: (productId) => {
    const { onlineOrders } = get();
    return onlineOrders.some(order => 
      order.status === 'not_placed' && order.order_items.some(item => item.product_id === productId)
    );
  },
  
  getSaleByStoreId(storeId) {
   const {onlineOrders} = get();
    return onlineOrders.find(order => order.store_id === storeId && order.status != "delivered") ?? null;

  },

}));

export default useSalesStore;
