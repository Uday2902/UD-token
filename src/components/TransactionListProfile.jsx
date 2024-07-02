import React from "react";

const TransactionListProfile = ({ SoR, SoRAddress, amount, date }) => {
  const backgroundColor = SoR === "Received" ? "#3dff3d6e" : "#ff3d3d6e";
  return (
    <div
      className="list-container"
      style={{ backgroundColor, margin: "0.5rem", borderRadius: "0.4rem" }}
    >
      <div className="text-detail">
        {SoR} {SoR === "Sent" ? "to" : "from"} : {SoRAddress}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Amount : {amount} UD</span>
        <span>Date: {date}</span>
      </div>
    </div>
  );
};

export default TransactionListProfile;
