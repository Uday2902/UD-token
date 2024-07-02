import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { setMetamaskStatus } from '../state/metaMaskSlice';
import { setContract, setSigner, setProvider, setCurrentNetwork } from '../state/userSlice';
import contractABI from './contractABI';
import contractAddress from './contractAddress';

export const useWallet = () => {

    const dispatch = useDispatch();
    const signer = useSelector((state) => { return state.user.signer })
    const provider = useSelector((state) => { return state.user.provider })
    const contract = useSelector((state) => { return state.user.contract })

    const handleConnectWallet = async () => {
        try {
            if (window.ethereum && window.ethereum.isMetaMask) {

                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const newSigner = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, newSigner);
                const network = await provider.getNetwork();

                if (network.name !== "sepolia") {
                    alert("Please connect to Sepolia Test network");
                    return;
                }

                dispatch(setSigner({ signer: newSigner }));
                dispatch(setProvider({ provider: provider }));
                dispatch(setContract({ contract: contract }));
                dispatch(setCurrentNetwork({ currentNetwork: network.name }));
                dispatch(setMetamaskStatus({ isMetaMaskConnected: true }));

            } else {

                console.error('MetaMask is not installed or not accessible.');
                alert('MetaMask is not installed or not accessible');

            }
        } catch (error) {
            console.error('Error connecting MetaMask:', error);
        }
    };

    const getUday = async () => {
        try {
            await contract.airdrop();
        } catch (error) {
            console.error('Error in getUday:', error);
        }
    };

    const getBalance = async () => {
        if (signer) {
            return await ethers.formatEther(await contract.balanceOf(signer.address));
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }


    const getAllContractEvents = async () => {
        try {
            const filter = {
                address: contractAddress,
                fromBlock: 0,
                toBlock: 'latest',
            };
            const logs = await provider.getLogs(filter);

            const allTransactions = await logs.map(async (transaction) => {
                const blockDetails = await provider.getBlock(transaction.blockNumber)
                return {
                    from: (transaction.topics[1]).replace(/^0x0+/, '0x'),
                    to: (transaction.topics[2]).replace(/^0x0+/, '0x'),
                    amount: await ethers.formatEther(transaction.data),
                    date: await formatDate(blockDetails.date)
                }
            });

            return allTransactions;

        } catch (error) {
            console.error('Error fetching contract events:', error);
            return [];
        }
    };

    const getUserTransactions = async (signerAddress) => {
        try {
            const filter = {
                address: contractAddress,
                fromBlock: 0,
                toBlock: 'latest',
            };
            const logs = await provider.getLogs(filter);

            const filteredTransactions = await Promise.all(logs.map(async (transaction) => {
                const blockDetails = await provider.getBlock(transaction.blockNumber);
                const from = transaction.topics[1].replace(/^0x0+/, '0x');
                const to = transaction.topics[2].replace(/^0x0+/, '0x');
                const amount = await ethers.formatEther(transaction.data);
                const date = await formatDate(blockDetails.date);

                // Check if the signerAddress is either the sender or receiver
                // SoR, SoRAddress, amount, date
                if (from.toLowerCase() === signerAddress.toLowerCase()) {
                    return {
                        SoR: "Sent",
                        SoRAddress: to,
                        amount: amount,
                        date: date
                    };
                } else if (to.toLowerCase() === signerAddress.toLowerCase()) {
                    return {
                        SoR: "Received",
                        SoRAddress: from,
                        amount: amount,
                        date: date
                    }
                } else {
                    return null;
                }
            }));

            // Filter out null entries (transactions not involving the signer)
            const allTransactions = filteredTransactions.filter(transaction => transaction !== null);

            return allTransactions;

        } catch (error) {
            console.error('Error fetching contract events:', error);
            return [];
        }
    };

    return { handleConnectWallet, getUday, getBalance, getAllContractEvents, getUserTransactions };
};
