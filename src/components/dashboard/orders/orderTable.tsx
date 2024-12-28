"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackMetadata = {
  orders: {},
};

const OrderTable = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [metadata, setMetadata] = useState(fallbackMetadata);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setMetadata(fallbackMetadata);
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const userId = user.id;
        const response = await fetch(`/api/users/getMetadata?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [isLoaded, isSignedIn, user]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="p-4 text-red-500">Error: {error}</p>;
  }

  if (
    !metadata ||
    !metadata.orders ||
    Object.keys(metadata.orders).length === 0
  ) {
    return <p className="p-4">No metadata found.</p>;
  }

  const orders = Object.values(metadata.orders);

  return (
    <div className="p-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) =>
            order.item.map((item, index) => (
              <TableRow key={`${order.order_id}-${index}`}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
