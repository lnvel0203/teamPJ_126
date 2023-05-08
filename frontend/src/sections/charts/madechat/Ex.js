import React, { Component } from "react";
const chat = () =>{
  const features = "width=400,height=600,top=100,left=100";
  window.open("/message", "_blank", features);
}
class Chatbot extends Component {

  render() {

    return (
   
      <div>
          <button 
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              border: "none",
              borderRadius: "16px",
              background: "royalblue",
              color: "white",
              padding: "12px",
              fontweight: "bold",
              boxshadow: "0px 5px 15px gray",
              cursor: "pointer"
            }}

          id="live-chat" onClick={chat}>ChatBot💬</button>
      </div>
    );
  }
}
export default Chatbot;

