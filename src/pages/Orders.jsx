import React, { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { orders } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Q1: Display valid orders only
  // Validation: items array not empty, quantity > 0, totalAmount valid
  const validOrders = orders.filter((order) => {
    // Check if items array is empty
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return false;
    }

    // Check if any item has invalid quantity
    const hasInvalidQuantity = order.items.some(
      (item) => !item.quantity || item.quantity <= 0
    );
    if (hasInvalidQuantity) {
      return false;
    }

    // Check if totalAmount is valid
    if (!order.totalAmount || order.totalAmount <= 0) {
      return false;
    }

    return true;
  });

  // Apply filters to valid orders
  const filteredOrders = validOrders.filter((order) => {
    const matchesSearch =
      (order.customerName || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.restaurant || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderid?.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Food Delivery Orders</h1>

      <div>
        <div>
          <input
            type="text"
            placeholder="Search by customer name, restaurant, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="filter-input"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <p>
        Showing {filteredOrders.length} valid orders out of {orders.length} total
      </p>

      <div>
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderid} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
