import React, { useState } from 'react'
import "./App.css";

const App = () => {
  const [img, setImg] = useState("");
  const [loading,setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrsize] = useState("");
  async function GenerateQrCode() {
    setLoading(true);
    setImg(""); // Clear old image while loading
    try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading time
        setImg(url);
    } catch (error) {
        console.error("Error generating QR code", error);
    } finally {
        setLoading(false);
    }
}

  function DownloadQrCode(){
       fetch(img).then((response) => response.blob())
       .then((blob) => {
        const link= document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
       }).catch((error) => {
        console.error("Error downloading QR code",error);
       })
  }
  return (
    <div className = "app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading ? <p>PLEASE WAIT....</p> : img && <img src={img} className="qr-code" />}

      {/* {img && <img src = {img} className="qr-code"/>} */}
      <div>
      <label htmlFor="dataInput" className="input-label">
        Data for Qrcode:
      </label>
      <input type = "text" value = {qrData} id="dataInput"
       placeholder="enter data for Qrcode"
      onChange={(e) => setQrData(e.target.value)}/>
      <label htmlFor= "sizeInput" className="input-label">
        Image size (e.g., 150):
      </label>
      <input type = "text" value = {qrSize} onChange={(e) =>
         setQrsize(e.target.value)} id = "sizeInput" 
         placeholder="enter the image size"/>
      <button className="generatebutton" disabled = {loading} onClick={GenerateQrCode}>Generate Qr Code</button>
      <button className="downloadbutton" onClick={DownloadQrCode}>Download the Qr <code></code></button>
      </div>
      <p> Designed By Irfan</p>
    </div>
  )
}
export default App;