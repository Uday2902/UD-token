import { useSelector } from "react-redux";
import "./App.css";
import Mainbox from "./components/Mainbox";
import Navbar from "./components/Navbar";
import { useWallet } from "./utils/useWallet";

function App() {
  const isMetaMaskConnected = useSelector((state) => {
    return state.metamask.isMetaMaskConnected;
  });
  const { handleConnectWallet } = useWallet();

  return (
    <>
      {isMetaMaskConnected ? (
        <button className="connect-wallet" disabled>
          Your wallet is connected
        </button>
      ) : (
        <button className="connect-wallet" onClick={handleConnectWallet}>
          Connect your wallet
        </button>
      )}
      <Navbar />
      <Mainbox />
    </>
  );
}

export default App;
