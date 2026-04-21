import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useOrder();

  // Q2: Order detail review with validation
  // Validate ID and find order
  const order = orders.find((o) => o.orderid == id);

  // Invalid ID handling
  if (!order) {
    return (
      <div>
        <h2>Order not found</h2>
        <Link to="/orders">
          <button>Back to Orders</button>
        </Link>
      </div>
    );
  }

  // Calculate subtotal dynamically for each item
  const itemsWithSubtotal = Array.isArray(order.items)
    ? order.items.map((item) => ({
        ...item,
        subtotal: (item.price || 0) * (item.quantity || 0),
      }))
    : [];

  // Calculate total from items using reduce
  const calculatedTotal = itemsWithSubtotal.reduce(
    (sum, item) => sum + (item.subtotal || 0),
    0
  );

  return (
    <div>
      <Link to="/orders">
        <button>Back to Orders</button>
      </Link>

      <div>
        <h2>Order #{order.orderid}</h2>

        <div>
          <h3>Customer Information</h3>
          <p>
            <strong>Customer Name:</strong> {order.customerName || "Unknown"}
          </p>
          <p>
            <strong>Restaurant:</strong> {order.restaurant || "N/A"}
          </p>
        </div>

        <div>
          <h3>Order Items</h3>
          {itemsWithSubtotal.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {itemsWithSubtotal.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name || "N/A"}</td>
                    <td>${(item.price || 0).toFixed(2)}</td>
                    <td>{item.quantity || 0}</td>
                    <td>${item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items found</p>
          )}
        </div>

        <div>
          <h3>Order Summary</h3>
          <p>
            <strong>Status:</strong> {order.status || "N/A"}
          </p>
          <p>
            <strong>Items Total:</strong> ${calculatedTotal.toFixed(2)}
          </p>
          <p>
            <strong>Total Amount:</strong> ${(order.totalAmount || calculatedTotal).toFixed(2)}
          </p>
          {order.deliverytime && (
            <p>
              <strong>Delivery Time:</strong> {order.deliverytime}
            </p>
          )}
          {order.rating && (
            <p>
              <strong>Rating:</strong> {order.rating}/5
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
