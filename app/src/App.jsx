import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Orders from './Orders';


const App = () => {
  return (
    <div>
      <Orders />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

const renderOrder = ({ PropertyAddress, PropertyCounty }) => {
  return (
    <Order PropertyAddress={PropertyAddress} PropertyCounty={PropertyCounty} />
  );
};