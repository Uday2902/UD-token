import React from "react";
import { setSelectedTab } from "../state/tabSlice";
import { useDispatch } from "react-redux";
import { Analytics } from "@vercel/analytics/react"

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSelection = (selectedTab) => {
    dispatch(setSelectedTab({ selectedTab: selectedTab })); // Dispatching action correctly
  };

  return (
    <>
      <div className="navbar">
        <button onClick={() => handleSelection("get-uday")}>Get UDAY</button>
        <button onClick={() => handleSelection("profile")}>Profile</button>
        <button onClick={() => handleSelection("all-transactions")}>
          All Transactions
        </button>
        <Analytics />
      </div>
    </>
  );
};

export default Navbar;
