import React, { useEffect, useState } from "react";

const AIDashboard = () => {
  const [buttons, setButtons] = useState([]);
  const userId = "user_123"; // Replace with dynamic user ID if needed

  const fetchRankedMenus = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get-ranked-menus?user_id=${userId}`
      );
      const data = await response.json();
      console.log(data);
      const rankedMenus =
        data.ranked_menus.length > 0
          ? data.ranked_menus.map((menu) => menu.menu)
          : [
              "Menu 1",
              "Menu 2",
              "Menu 3",
              "Menu 4",
              "Menu 5",
              "Menu 6",
              "Menu 7",
            ];
      setButtons(rankedMenus);
    } catch (error) {
      console.error("Error fetching ranked menus:", error);
    }
  };
  useEffect(() => {}, []);

  const handleClick = async (buttonName) => {
    // alert(`You clicked ${buttonName}`);

    const timestamp = new Date().toISOString(); // Current timestamp
    const payload = {
      user_id: "user_123", // Replace with dynamic user ID if needed
      menu_name: buttonName,
      timestamp: timestamp,
    };

    try {
      await fetch("http://127.0.0.1:5000/log-menu-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Click logged successfully");
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  const handleGetAIMenus = () => {
    fetchRankedMenus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu Buttons</h1>
      <button onClick={handleGetAIMenus}>Get AI suggested menus</button>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {buttons.length > 0 ? (
          buttons.map((buttonName, index) => (
            <button
              key={index}
              onClick={() => handleClick(buttonName)}
              style={{
                padding: "10px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {buttonName}
            </button>
          ))
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  );
};

export default AIDashboard;
