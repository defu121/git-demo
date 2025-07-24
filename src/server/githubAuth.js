const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

// GitHub OAuth回调
app.get("/api/github/callback", async (req, res) => {
  const code = req.query.code;
  // 用code换access_token
  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "YOUR_CLIENT_ID", // 替换为你的GitHub OAuth应用ID
      client_secret: "YOUR_CLIENT_SECRET", // 替换为你的GitHub OAuth应用密钥
      code,
    },
    { headers: { Accept: "application/json" } }
  );
  const access_token = tokenRes.data.access_token;
  // 用access_token获取用户信息
  const userRes = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `token ${access_token}` },
  });
  res.json(userRes.data);
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
