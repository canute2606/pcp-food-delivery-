import React, { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "../components/OrderCard";

const Filter = () => {
  const { orders } = useOrder();
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Q1: Validation rules for valid orders
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

  // Q3: Filter by restaurant name (case-insensitive)
  const filteredByRestaurant = validOrders.filter((order) => {
    if (!restaurantFilter.trim()) {
      return false;
    }
    return (order.restaurant || "").toLowerCase().includes(restaurantFilter.toLowerCase());
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div>
      <h1>Filter Orders by Restaurant</h1>

      <form onSubmit={handleSearch}>
        <div>
          <input
            type="text"
            placeholder="Enter restaurant name..."
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
            data-testid="restaurant-filter-input"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {hasSearched && (
        <>
          {!restaurantFilter.trim() && (
            <p data-testid="empty-error">Please enter a restaurant name</p>
          )}

          {restaurantFilter.trim() && filteredByRestaurant.length === 0 && (
            <p data-testid="no-results">No results found</p>
          )}

          {restaurantFilter.trim() && filteredByRestaurant.length > 0 && (
            <>
              <p>Found {filteredByRestaurant.length} valid orders</p>
              <div>
                {filteredByRestaurant.map((order) => (
                  <OrderCard key={order.orderid} order={order} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Filter;
