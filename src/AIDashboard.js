import React, { useEffect, useState } from "react";

const AIDashboard = () => {
  const [buttons, setButtons] = useState([]);
  const userId = "user_123"; // Replace with dynamic user ID if needed

  // Fetch ranked menus from the Flask API on component mount
  useEffect(() => {
    const fetchRankedMenus = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-ranked-menus?user_id=${userId}`
        );
        const data = await response.json();
        // Extract menu names from the ranked list
        const rankedMenus = data.ranked_menus.map((menu) => menu.menu);
        setButtons(rankedMenus);
      } catch (error) {
        console.error("Error fetching ranked menus:", error);
      }
    };

    fetchRankedMenus();
  }, []);

  const handleClick = (buttonName) => {
    alert(`You clicked ${buttonName}`);
    // Add additional logic if needed
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu Buttons</h1>
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
          <p>Loading menu buttons...</p>
        )}
      </div>
    </div>
  );
};

export default AIDashboard;
