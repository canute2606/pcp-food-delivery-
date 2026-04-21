const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      const validOrders = Array.isArray(action.payload)
        ? action.payload
            .map((order) => {
              const normalizedId = order.orderid ?? order.orderId;
              const normalizedStatus =
                typeof order.status === "string"
                  ? order.status.toLowerCase()
                  : order.status;

              return {
                ...order,
                orderid: normalizedId,
                status: normalizedStatus,
              };
            })
            .filter(
              (order) =>
                order.orderid &&
                Array.isArray(order.items)
            )
        : [];

      return {
        ...state,
        orders: validOrders,
        loading: false,
        error: null,
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderid === (action.payload.orderId ?? action.payload.orderid)
            ? { ...order, status: action.payload.status }
            : order
        ),
      };

    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.orderid !== action.payload),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default OrderReducer;
