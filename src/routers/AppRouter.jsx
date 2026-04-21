import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import OrderStats from "../components/OrderStats";
import Filter from "../pages/Filter";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <div>
            <Link to="/">
              Food Delivery
            </Link>
            <Link to="/orders">
              Orders
            </Link>
            <Link to="/stats">
              Statistics
            </Link>
            <Link to="/filter">
              Filter
            </Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/stats" element={<OrderStats />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 Food Delivery Orders. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default AppRouter;
