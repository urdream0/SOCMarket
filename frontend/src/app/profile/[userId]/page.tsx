"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type user = {
  userId: number;
};

type Product = {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  categoryId: number;
  productImageName: string;
  userId: number;
};

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  login: string;
}

export default function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://socmarket-backend-production.up.railway.app/api/v1/user/${userId}`)
      .then((response) => response.json())
      .then((user) => setUser(user));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="m-32">
      <div className="border border-none rounded-t-3xl grow-20 bg-indigo-700 p-2 h-40">
        <img
          src="https://tailwindcss.com/_next/static/media/3d-transforms.ebde7a6a.jpeg"
          alt="Profile Picture"
          className="w-20 h-20 rounded-full mt-28 ml-20 absolute"
        />
      </div>
      <div className="border border-none  bg-blue-200 pt-1">
        <h1 className="text-2xl font-bold text-white mt-14 ml-10">John Doe</h1>
        <div className="flex flex-col items-start mt-10 mb-10 ml-10">
          <p className="text-white">Email: 1MmKw@example.com</p>
          <p className="text-white">Phone: +1 (123) 456-7890</p>
          <p className="text-white">Address: 123 Main St, Anytown, USA</p>
          <p className="text-white">Status: Active</p>
        </div>
      </div>
    </div>
  );
}
