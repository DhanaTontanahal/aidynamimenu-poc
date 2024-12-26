import React, { useState } from "react";

const Dashboard = () => {
  const [buttons] = useState([
    "Menu 1",
    "Menu 2",
    "Menu 3",
    "Menu 4",
    "Menu 5",
    "Menu 6",
    "Menu 7",
  ]);

  const handleClick = (buttonName) => {
    // Simulate user ID (can replace with actual user authentication)
    const userId = "user_123";

    // Alert the button click
    alert(`You clicked ${buttonName}`);

    // Log the click
    logButtonClick(userId, buttonName);
  };

  const logButtonClick = (userId, buttonName) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Fetch existing logs from localStorage
    const logs = JSON.parse(localStorage.getItem("buttonLogs")) || {};

    // Initialize user log if it doesn't exist
    if (!logs[userId]) {
      logs[userId] = {};
    }

    // Initialize button log if it doesn't exist
    if (!logs[userId][buttonName]) {
      logs[userId][buttonName] = [];
    }

    // Check if there's an entry for today
    const todayLog = logs[userId][buttonName].find((log) => log.date === today);

    if (todayLog) {
      // Increment click count and add timestamp
      todayLog.count += 1;
      todayLog.timestamps.push(new Date().toISOString());
    } else {
      // Create a new log for today
      logs[userId][buttonName].push({
        date: today,
        count: 1,
        timestamps: [new Date().toISOString()],
      });
    }

    // Save updated logs to localStorage
    localStorage.setItem("buttonLogs", JSON.stringify(logs));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu Buttons</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {buttons.map((buttonName, index) => (
          <button
            key={index}
            onClick={() => handleClick(buttonName)}
            style={{
              padding: "10px",
              backgroundColor: "lightblue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
