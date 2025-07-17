import { useEffect } from "react";
import {ABI } from "./contractConfig";
import { ethers } from "ethers";
import { useState } from "react";


const Contract_ADDRESS = "0x1e152763671d813d0EB0C538C2E061298BbE1A42";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [signer , setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [pingCount, setPingCount] = useState(0);
  const [totalPings, setTotalPings] = useState(0);

  useEffect(()=>{
    const init = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(Contract_ADDRESS, ABI, signer);
      setContract(contract);
      setSigner(signer);
      const address = await signer.getAddress();
      setUserAddress(address);
      
      const totalping = await contract.gettotalping();
      const userping = await contract.getpingcount();

      setTotalPings(Number(totalping));
      setPingCount(Number(userping));
    };
    init();
  }, []);


  const changeWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(Contract_ADDRESS, ABI, signer);

      setSigner(signer);
      setContract(contract);

      const address = await signer.getAddress();
      setUserAddress(address);

      const totalping = await contract.gettotalping();
      const userping = await contract.getpingcount();

      setTotalPings(Number(totalping));
      setPingCount(Number(userping));

      console.log("Switched wallet to:", address);
    } catch (err) {
      console.error("Wallet switch failed:", err);
    }
  } else {
    alert("MetaMask not detected. Please install it.");
  }
};

  const ping = async () => {
  if (!contract) {
    console.error("Contract not loaded yet.");
    return;
  }
  try {
    const tx = await contract.ping();
    await tx.wait();
    const total = await contract.gettotalping();
    const userping = await contract.getpingcount();
    setTotalPings(Number(total));
    setPingCount(Number(userping));
  } catch (err) {
    console.error("Ping failed:", err);
  }
};



  return (
    <>
      <div>
        <h2> Ping counter dapp</h2>
        <p>Connected Wallet: {userAddress}</p>
        <p>TotalPing: {totalPings}</p>
        <p>Your ping:{pingCount}</p>
        <button onClick={ping} disabled={!contract}>Ping</button>
        <button onClick={changeWallet}>Change Wallet</button>

      </div>
    </>
  );
}

export default App;
