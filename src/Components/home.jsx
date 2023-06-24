import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import '../Style/home.css'
import Home from '../assets/home.png'
function home() {
  return (
    <div className="home" style={{marginLeft:"auto", marginRight:"auto",height:"90vh",overflowY:"hidden"}}>
      <div style={{paddingTop:"1%",paddingLeft:"6%",paddingRight:"8%"}}>
        <div style={{fontSize:"40px",fontWeight:"700",color:"#12D576"}}>Unleash Your Token's Full Potential</div>
        <div style={{color:"#949494",paddingTop:"4%"}}>
          Welcome to our Token Launchpad, your gateway to blockchain success! We offer end-to-end services for token creation, sale, locking, staking, and airdrops on multiple chains. Empower your project with our streamlined solutions and unleash the full potential of decentralized innovation.
        </div>
          
        <button style={{padding:"2% 8%",marginTop:"6%",backgroundColor:"#12D576",borderRadius:"25px",fontSize:"20px",fontWeight:"400"}}>
          <ConnectButton showBalance={false} />
        </button>
      </div>
      <div style={{paddingRight:"14%"}}>
        <img src={Home} alt="not found"  />
      </div>
    </div>
    
  )
}

export default home
