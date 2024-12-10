import React, { useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const submitReport = async () => {
    if (!message.trim()) {
      setResponse("Message cannot be empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/reports", { message });
      setResponse(res.data.message);
      setMessage(""); // Clear the form
    } catch (err) {
      setResponse("Error submitting report. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Anonymous Reporting</h1>
      <textarea
        rows="6"
        placeholder="Type your report here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />
      <button
        onClick={submitReport}
        style={{ marginTop: "10px", padding: "10px 20px", display: "block" }}
      >
        Submit Report
      </button>
      {response && <p style={{ marginTop: "10px", color: "green" }}>{response}</p>}
    </div>
  );
};

export default ReportPage;
