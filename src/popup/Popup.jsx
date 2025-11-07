import React from "react";

const PROFILE_LINKS = [
  "https://www.linkedin.com/in/ekta-goyal-775228255",
  "https://www.linkedin.com/in/ekta-goyal-775228255",
  "https://www.linkedin.com/in/ekta-goyal-775228255"
];

function Popup() {
  const startScraping = async () => {
    for (let link of PROFILE_LINKS) {
      chrome.tabs.create({ url: link, active: true });

      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 sec for page load

      chrome.scripting.executeScript({
        target: { tabId: (await getActiveTab()).id },
        func: scrapeProfileData,
      });
    }
  };

  const getActiveTab = () =>
    new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    });

  const scrapeProfileData = async () => {
    const name = document.querySelector(".text-heading-xlarge")?.innerText || "";
    const about = document.querySelector(".display-flex.ph5.pb5 .pv-about__summary-text")?.innerText || "";
    const location = document.querySelector(".text-body-small.inline")?.innerText || "";
    const bio = document.querySelector(".pv-text-details__left-panel .text-body-medium")?.innerText || "";
    const followers = document.querySelector("a[href*='followers']")?.innerText || "";
    const connections = document.querySelector("a[href*='connections']")?.innerText || "";

    // Send to backend
    fetch("http://localhost:5000/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, about, location, bio, followers, connections }),
    });
  };

  return (
    <div style={{ padding: "15px", textAlign: "center", width: "260px" }}>
      <h3>ATG LinkedIn Scraper</h3>
      <button
        onClick={startScraping}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Start Scraping
      </button>
    </div>
  );
}

export default Popup;
