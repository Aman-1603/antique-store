import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../Checkout/Cart/scroll.css'


export default function WishList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://grand-vivacious-lemur.glitch.me/api/products");
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='flex h-full w-full justify-center items-center'>Loading...</div>;
  }

  return (
    <section className="flex justify-center pt-12 bg-white overflow-x-auto w-full md:w-[900px]" id='style-2'>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-xl min-[400px]:text-2xl text-black mb-8 ">Wishlist</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-12">
          {products.map((product) => (
             <Link to={`/product-detail/${product._id}`} className="group " key={product._id}>
              <div className="w-full max-w-sm aspect-square">
                <img src={product.imagePath} alt={product.name} className="object-fit w-full h-full md:w-[200px] md:h-[200px] rounded-xl" />
              </div>
              <div className="mt-5 flex items-center justify-between ">
                <div>
                  <h6 className="font-medium text-sm leading-8 text-black w-[220px] md:w-[170px] truncate">{product.name}</h6>
                  <h6 className="text-md font-medium text-gray-900">${product.price}</h6>
                  <button><h6 className="mt-1 text-sm font-semibold text-red-600">remove</h6></button>
                </div>
                <button
                  className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                    fill="none">
                    <path
                      d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                      stroke="" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              
            </Link>
          ))}
        </div>
        <div className='h-[50px]'></div>

      </div>
    </section>
  );
}