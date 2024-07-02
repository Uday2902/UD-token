import React from "react";

const ListAT = ({ from, to, amount, date }) => {
  return (
    <div
      className="list-container-at"
      style={{
        borderRadius: "1rem",
        backgroundColor: "#242424",
        margin: "1rem",
        padding: "0.5rem",
      }}
    >
      <div className="text-detail" style={{ fontSize: "1rem" }}>
        <div>from : {from}</div>
        <div>to : {to}</div>
      </div>
      <div
        className="text-detail"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1rem",
          marginBottom: "1px",
        }}
      >
        <div>Amount : {amount} UD</div>
        <div style={{ marginRight: "3rem" }}>Date : {date}</div>
      </div>
    </div>
  );
};

export default ListAT;
