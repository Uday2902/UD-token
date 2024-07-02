import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWallet } from "../utils/useWallet";
import ListAT from "./ListAT";

const Alltransactions = () => {
  const { getAllContractEvents } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const isMetaMaskConnected = useSelector(
    (state) => state.metamask.isMetaMaskConnected
  );
  const currentNetwork = useSelector((state) => state.user.currentNetwork);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionPromises = await getAllContractEvents();
        const transactions = await Promise.all(transactionPromises);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      }
    };

    if (isMetaMaskConnected) {
      fetchData();
    }
  }, [isMetaMaskConnected]);

  if (!isMetaMaskConnected) {
    return (
      <div className="connect-wallet-section">Connect your MetaMask wallet</div>
    );
  }

  if (currentNetwork !== "sepolia") {
    return (
      <div className="connect-wallet-section">
        Please connect to Sepolia Test network
      </div>
    );
  }

  return (
    <div
      className="all-transactions hidden-scrollbar"
      style={{ height: "95%" }}
    >
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        transactions.map((transaction, index) => (
          <ListAT
            key={index}
            from={transaction.from}
            to={transaction.to}
            amount={transaction.amount}
            date={transaction.date}
          />
        ))
      )}
    </div>
  );
};

export default Alltransactions;
