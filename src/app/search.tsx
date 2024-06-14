// "use client";

// import { Search } from "lucide-react";
// import { use, useEffect, useState } from "react";
// import { Product } from "~/models/product";
// import { Store } from "~/models/store";
// import ProductCard from "~/widgets/productCard";
// import StoreCard from "~/widgets/storeCard";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState<Product[]>();
//   const [stores, setStores] = useState<Store[]>();

//   useEffect(() => {
//     if (query === "") {
//       setProducts([]);
//       setStores([]);
//       return;
//     }
//     const fetchProducts = async () => {
//       try {
//         const response = await Product.searchProducts("123456", query);
//         setProducts(response);
//       } catch (error) {
//         console.error("An error occurred while fetching products.");
//       }
//     };
//     fetchProducts();
//     const fetchStores = async () => {
//       try {
//         const response = await Store.searchStores("123456", query);
//         setStores(response);
//       } catch (error) {
//         console.error("An error occurred while fetching stores.");
//       }
//     };
//     fetchStores();
//   }, [query]);

//   return (
//     <div>
//       <div className="mx-4 flex gap-2 rounded-md border border-gray-300 bg-white p-2 text-black">
//         <Search size={24} />
//         <input
//           type="text"
//           placeholder="Search Products..."
//           value={query}
//           onChange={(e) => {
//             document.body.scrollTo({
//               top: 100,
//               behavior: "smooth",
//             });
//             setQuery(e.target.value);
//           }}
//           className="w-full outline-none"
//         />
//       </div>

//       <div className="mt-4 bg-white">
//         {products && products.length > 0 ? (
//           <ul>
//             {products.map((product) => (
//               <li key={product.id}>
//                 <ProductCard product={product} />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div></div>
//         )}

//         {stores && stores.length > 0 ? (
//           <ul>
//             {stores.map((store) => (
//               <li key={store.ID}>{<StoreCard store={store} />}</li>
//             ))}
//           </ul>
//         ) : (
//           <div></div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
