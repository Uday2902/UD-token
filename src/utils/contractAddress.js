const address = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractAddress = `${address}`;
console.log("Contract address reading -> ", contractAddress);
export default contractAddress;