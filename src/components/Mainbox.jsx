import React from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Alltransactions from "./Alltransactions";
import Getuday from "./Getuday";

const Mainbox = () => {
  const selectedTab = useSelector((state) => {
    return state.tab.selectedTab;
  });
  return (
    <>
      <div className="container">
        {selectedTab === "profile" ? (
          <Profile />
        ) : selectedTab === "get-uday" ? (
          <Getuday />
        ) : (
          <Alltransactions />
        )}
      </div>
    </>
  );
};

export default Mainbox;
