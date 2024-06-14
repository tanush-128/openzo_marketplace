// context/SalesContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorVariant, Product, SizeVariant } from '~/models/product';
import Sale, { SaleData } from '~/models/sale';
// import { SaleData, OrderItem, Customer } from '../models/types';
// import * as SaleAPI from '../api/sale';

interface SalesContextProps {
    onlineOrders: Sale[];
    placedOrders: Sale[];
    unplacedOrders: Sale[];
    deliveredOrders: Sale[];
    fetching: boolean;
    getOrders: () => void;
    updateOrderStatus: (id: string, status: string) => void;
    addSale: (sale: SaleData) => void;
    updateSale: (sale: SaleData) => void;
    updateSaleOrderItems: (product: any, sizeVariant: any, colorVariant: any, quantity: number) => void;
    isInCart: (productId: string) => boolean;
}

const SalesContext = createContext<SalesContextProps | undefined>(undefined);

export const SalesProvider = ({ children }
    : { children: React.ReactNode }

) => {
    const [onlineOrders, setOnlineOrders] = useState<SaleData[]>([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const sales = await Sale.getSalesByUserDataID("");
            setOnlineOrders(sales);
            setFetching(false);
        } catch (error) {
            console.error('Failed to fetch sales', error);
        }
    };

    const updateOrderStatus = (id: string, status: string) => {
        const updatedOrders = onlineOrders.map(order =>
            order.id === id ? { ...order, status } : order
        );
        setOnlineOrders(updatedOrders);
    };

    const addSale = async (sale: Sale) => {
        try {
            const newSale = await Sale.createSale(sale);
            setOnlineOrders([...onlineOrders, newSale]);
        } catch (error) {
            console.error('Failed to add sale', error);
        }
    };

    const updateSale = async (sale: SaleData) => {
        try {
            const updatedSale = await Sale.updateSale(sale);
            setOnlineOrders(onlineOrders.map(order => order.id === sale.id ? updatedSale : order));
        } catch (error) {
            console.error('Failed to update sale', error);
        }
    };

    const updateSaleOrderItems = async (product: Product, sizeVariant: SizeVariant, colorVariant: ColorVariant, quantity: number) => {
        const existingSale = onlineOrders.find(order =>
            order.status === 'not_placed' && order.storeId === product.store_id
        );

        if (!existingSale) {
            console.log('creating new sale');
            const newSale: Sale = {
                id: '',
                orderItems: [{
                    product_id: product.id, quantity, size_variant_id: sizeVariant?.id, color_variant_id: colorVariant?.id,
                    id: 0,
                    order_id: ''
                }],
                totalAmount: product.discount_price * quantity,

                undiscountedTotalAmount: 0,
                amountPaid: 0,
                storeId: product.store_id,
                type: 'online_order',
                status: 'not_placed',
            };
            await addSale(newSale);
            return;
        }

        const updatedOrderItems = existingSale.orderItems.map(item =>
            item.product_id === product.id ? { ...item, quantity } : item
        );
        updatedOrderItems.push({
            product_id: product.id, quantity, size_variant_id: sizeVariant?.id, color_variant_id: colorVariant?.id,
            id: 0,
            order_id: ''
        });
        existingSale.totalAmount = updatedOrderItems.reduce((sum, item) => sum + item.quantity * product.discount_price, 0);
        existingSale.orderItems = updatedOrderItems;
        console.log('updating sale', existingSale);
        await updateSale(existingSale);
    };

    const isInCart = (productId: string) => {
        return onlineOrders.some(order =>
            order.status === 'not_placed' && order.orderItems.some(item => item.product_id === productId)
        );
    };

    const value = {
        onlineOrders,
        placedOrders: onlineOrders.filter(order => order.status !== 'not_placed' && order.status !== 'delivered'),
        unplacedOrders: onlineOrders.filter(order => order.status === 'not_placed'),
        deliveredOrders: onlineOrders.filter(order => order.status === 'delivered'),
        fetching,
        getOrders,
        updateOrderStatus,
        addSale,
        updateSale,
        updateSaleOrderItems,
        isInCart,
    };

    return <SalesContext.Provider value={value}>{children}</SalesContext.Provider>;
};

export const useSales = () => {
    const context = useContext(SalesContext);
    if (context === undefined) {
        throw new Error('useSales must be used within a SalesProvider');
    }
    return context;
};
