const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const Profile = require("./models/Profile");

const app = express();

// Middleware
app.use(bodyParser.json());

// ✅ CORS setup for Chrome extension
const corsOptions = {
  origin: "*", // allow all origins during development
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// Default route
app.get("/", (req, res) => res.send("✅ Backend is running"));

// CREATE PROFILE
app.post("/api/profiles", async (req, res) => {
  try {
    const {
      url,
      name,
      bio,
      about,
      location,
      followerCount,
      connectionCount,
      bioLine,
      headline,
      profilePicUrl
    } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    // ✅ Check if profile already exists
    let profile = await Profile.findOne({ where: { url } });
    if (profile) {
      return res.status(200).json({ success: true, profile, message: "Profile already exists" });
    }

    // Create new profile
    profile = await Profile.create({
      url,
      name: name || "",
      bio: bio || "",
      about: about || "",
      location: location || "",
      followerCount: followerCount || 0,
      connectionCount: connectionCount || 0,
      bioLine: bioLine || "",
      headline: headline || "",
      profilePicUrl: profilePicUrl || ""
    });

    console.log("✅ Profile saved:", profile.url);
    return res.status(201).json({ success: true, profile });
  } catch (err) {
    console.error("❌ Error creating profile:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET ALL PROFILES
app.get("/api/profiles", async (req, res) => {
  try {
    const profiles = await Profile.findAll({ order: [["createdAt", "DESC"]] });
    return res.json(profiles);
  } catch (err) {
    console.error("❌ Error fetching profiles:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
})();
