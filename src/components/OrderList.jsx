import { useOrder } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = ({ filteredOrders = null }) => {
  const { orders, loading } = useOrder();

  const displayOrders = filteredOrders !== null ? filteredOrders : orders;

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (displayOrders.length === 0) {
    return <p>No orders available</p>;
  }

  return (
    <div>
      {displayOrders.map((order) => (
        <OrderCard key={order.orderid} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
