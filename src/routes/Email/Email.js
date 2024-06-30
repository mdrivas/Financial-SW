// src/Email.js
import React from 'react';

function Email() {
  // Function to send an email
  const sendEmail = () => {
    console.log("Sending Email...");
    fetch("http://127.0.0.1:5000/send_email", {
      method: "POST" 
    })
    .then(response => {
      if (response.ok) {
        console.log("Email sent Successfully");
      } else {
        console.error("Failed to send email");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <div>
      <h1>Email Page</h1>
      <p>This is a simple email page with some information.</p>
      <button type="button" onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default Email;