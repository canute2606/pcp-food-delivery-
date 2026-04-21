import React, { useEffect } from "react";
import { useOrder } from "../context/OrderContext";

const OrderStats = () => {
  const { orders } = useOrder();

  // Q1 Validation: Filter for valid orders only
  const validOrders = orders.filter((order) => {
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return false;
    }
    const hasInvalidQuantity = order.items.some(
      (item) => !item.quantity || item.quantity <= 0
    );
    if (hasInvalidQuantity) {
      return false;
    }
    if (!order.totalAmount || order.totalAmount <= 0) {
      return false;
    }
    return true;
  });

  // Q5: Calculate stats using reduce on valid orders only
  const stats = validOrders.reduce(
    (acc, order) => {
      acc.totalOrders += 1;

      if (order.status === "delivered") {
        acc.deliveredOrders += 1;
      } else if (order.status === "cancelled") {
        acc.cancelledOrders += 1;
      }

      return acc;
    },
    { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 }
  );

  // Expose to window for testing
  useEffect(() => {
    window.appState = {
      totalOrders: stats.totalOrders,
      deliveredOrders: stats.deliveredOrders,
      cancelledOrders: stats.cancelledOrders,
    };
  }, [stats]);

  return (
    <div>
      <h1>Order Statistics</h1>

      <div>
        <div>
          <h3>Total Orders</h3>
          <p data-testid="total-orders">
            {stats.totalOrders}
          </p>
        </div>

        <div>
          <h3>Delivered Orders</h3>
          <p data-testid="delivered-orders">
            {stats.deliveredOrders}
          </p>
        </div>

        <div>
          <h3>Cancelled Orders</h3>
          <p data-testid="cancelled-orders">
            {stats.cancelledOrders}
          </p>
        </div>
      </div>

      <div>
        <h3>Raw Statistics:</h3>
        <pre>
          {JSON.stringify(window.appState, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default OrderStats;
