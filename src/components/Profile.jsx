import React, { useState, useEffect } from "react";
import { useWallet } from "../utils/useWallet";
import { useSelector } from "react-redux";
import TransactionListProfile from "./TransactionListProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";

const Profile = () => {
  const { getBalance, getUserTransactions } = useWallet();

  const isMetaMaskConnected = useSelector(
    (state) => state.metamask.isMetaMaskConnected
  );

  const signer = useSelector((state) => state.user.signer);

  const contract = useSelector((state) => state.user.contract);

  const [myTokens, setMyTokens] = useState(0);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionPromises = await getUserTransactions(signer.address);
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

  useEffect(() => {
    if (amount === null) {
      setError(null);
    } else if (amount < 0 || amount > myTokens) {
      setError(true);
    } else {
      setError(false);
    }
  }, [amount, myTokens]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSendTokens = async () => {
    const isAddressValid = ethers.isAddress(address);
    if (isAddressValid) {
      if (amount <= 0) {
        alert("Please enter a valid amount greater than zero");
      } else if (amount > myTokens) {
        setError(true);
        alert("Insufficient balance to send this amount");
      } else {
        try {
          const finalAmount = ethers.parseEther(amount.toString());
          await contract.transfer(address, finalAmount);
          toast.success("Transaction successfully sent!");
        } catch (err) {
          toast.error("Failed to send tokens. Please try again.");
        }
      }
    } else {
      alert("Please enter a valid Ethereum address");
    }
  };

  const handleAmountChange = (event) => {
    const inputAmount = Number(event.target.value);
    if (inputAmount < 0 || inputAmount > myTokens) {
      setError(true);
    } else {
      setError(false);
    }
    setAmount(inputAmount === 0 ? null : inputAmount);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        setMyTokens(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [isMetaMaskConnected]);

  return (
    <>
      <ToastContainer />
      {isMetaMaskConnected ? (
        <div className="profile">
          <div className="title">You have {myTokens} UDAY tokens</div>
          <div
            className="send-uday"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff0d",
              padding: "1rem",
              width: "90%",
              borderRadius: "0.7rem",
              margin: "auto",
            }}
          >
            <div>
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter wallet address"
                style={{ height: "1.4rem", margin: "0.8rem" }}
              />
            </div>
            <div>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                style={{
                  outline: "none",
                  height: "1.4rem",
                  marginLeft: "0.8rem",
                  marginRight: "0.8rem",
                  width: "30%",
                  borderColor:
                    error === null ? "none" : error ? "red" : "green",
                }}
              />
              <button type="button" onClick={handleSendTokens}>
                Send
              </button>
            </div>
          </div>
          <div className="entries hidden-scrollbar">
            {transactions.map((transaction, index) => (
              <TransactionListProfile
                key={index}
                SoR={transaction.SoR}
                SoRAddress={transaction.SoRAddress}
                amount={transaction.amount}
                date={transaction.date}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="connect-wallet-section">
          Connect your MetaMask wallet
        </div>
      )}
    </>
  );
};

export default Profile;
