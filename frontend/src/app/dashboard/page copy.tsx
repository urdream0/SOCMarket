"use client";

import { useEffect, useState } from "react";
type Product = {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    categoryId: number;
    productImageName: string;
    userId: number;
}

export default function Dashboard() {
    const [Products, setProducts] = useState<Product[]>([]);
    const userId = 1;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/products/list");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
                const filteredProducts = data.filter((product: Product) => product.userId === userId);
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    
    return (
        <>
        <div className="border border-black rounded-full grow-20 bg-black p-2 mt-24">
            <h2 className="text-2xl font-bold text-center z-50 text-white tracking-wide">
                DASHBOARD
            </h2>
        </div>
        <div className="p-14  grid grid-cols-4 gap-4">
            {Products.map((product: Product) => (
                <div
                    key={product.productId}
                    className="border-4 border-neutral-600 bg-white rounded-xl box-border"
                >
                    <div>
                        <img
                            src={`/images/photos/${product.productImageName}`}
                            alt={product.productName}
                            className="aspect-square w-full rounded-t-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                    </div>
                    <div className="p-5">
                        <h5 className="text-black flex justify-center pb-6 text-xl text-bold">
                            {product.productName}
                        </h5>
                        <div className="flex items-baseline gap-7 mb-4 justify-center">
                            <span className="text-3xl font-semibold text-green-600">
                                {product.productPrice} CFP
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}