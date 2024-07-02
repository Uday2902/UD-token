import React from "react";
import { useSelector } from "react-redux";
import "./get-uday.css";
import { useWallet } from "../utils/useWallet";
import { useState } from "react";
import { useEffect } from "react";

const Getuday = () => {
  const isMetaMaskConnected = useSelector(
    (state) => state.metamask.isMetaMaskConnected
  );
  const contract = useSelector((state) => state.user.contract);
  const signer = useSelector((state) => state.user.signer);
  const [isClaimed, setClaimed] = useState(false);
  const { getUday } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      if (isMetaMaskConnected) {
        try {
          const claimStatus = await contract.hasClaimedAirdrop(signer.address);
          setClaimed(claimStatus);
        } catch (error) {
          console.error("Error fetching claim status:", error);
        }
      }
    };

    fetchData();
  }, [isMetaMaskConnected, contract]);

  return (
    <div className="get-uday">
      {isMetaMaskConnected ? (
        isClaimed ? (
          <button disabled>You have already claimed your free 500 UD</button>
        ) : (
          <button onClick={getUday}>Get 500 UD for free</button>
        )
      ) : (
        <button disabled>Connect your wallet and get 500 UD for free</button>
      )}
    </div>
  );
};

export default Getuday;
