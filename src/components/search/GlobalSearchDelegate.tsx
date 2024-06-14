import React, { useEffect, useState } from 'react';
import { Product } from '~/models/product';
import { Store } from '~/models/store';
import ProductCard from '~/widgets/productCard';
import StoreCard from '~/widgets/storeCard';
// import ProductCard from './ProductCard';  // Create a ProductCard component or replace it with actual product display logic
// import StoreCard from './StoreCard';      // Create a StoreCard component or replace it with actual store display logic
// import { searchProducts, searchStores } from '../api/search';  // Replace with actual API calls

interface GlobalSearchDelegateProps {
    query: string;
    onClose: () => void;
}

const GlobalSearchDelegate: React.FC<GlobalSearchDelegateProps> = ({ query, onClose }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            const productsResult = await Product.searchProducts("123456", query);  // Replace with actual API call
            const storesResult = await Store.searchStores("123456", query)  // Replace with actual API call
            setProducts(productsResult);
            setStores(storesResult);
            setLoading(false);
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (!products.length && !stores.length) {
        return <div className="p-4 text-center">No results found</div>;
    }

    return (
        <div className="p-4">
            {products.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold">Products</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            )}
            {stores.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Stores</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {stores.map((store, index) => (
                            <StoreCard key={index} store={store} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearchDelegate;
