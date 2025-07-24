import React, { useEffect, useState } from "react";
import "../style/Login.css";
import UserInfo from "./UserInfo";

// GitHub OAuth参数
const CLIENT_ID = "YOUR_CLIENT_ID"; // 替换为你的GitHub OAuth应用ID
const REDIRECT_URI = "http://localhost:8080"; // 替换为你的前端地址

export default function Login() {
  const [user, setUser] = useState(null);

  // 检查URL是否有code参数，完成OAuth回调
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      // 向后端发送code，获取用户信息
      fetch(`/api/github/callback?code=${code}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  // 跳转到GitHub授权页
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;
  };
  // 跳转到Google授权页（示例，需替换为你的Google OAuth参数）
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=openid%20email%20profile`;
  };
  // 跳转到Microsoft授权页（示例，需替换为你的Microsoft OAuth参数）
  const handleMicrosoftLogin = () => {
    window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_MICROSOFT_CLIENT_ID&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=openid%20email%20profile`;
  };

  return (
    <div className="login-container">
      <div className="title">Bytebase</div>
      <div className="subtitle">欢迎</div>
      <div className="desc">登录 Bytebase 以继续使用 Bytebase Hub。</div>
      {!user ? (
        <>
          <button className="third-btn" onClick={handleGoogleLogin}>
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg"
              alt="Google"
              style={{ width: 20, marginRight: 8 }}
            />
            继续使用 Google
          </button>
          <button className="third-btn" onClick={handleGithubLogin}>
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
              alt="GitHub"
              style={{ width: 20, marginRight: 8 }}
            />
            继续使用 GitHub
          </button>
          <button className="third-btn" onClick={handleMicrosoftLogin}>
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg"
              alt="Microsoft"
              style={{ width: 20, marginRight: 8 }}
            />
            继续使用 Microsoft Account
          </button>
          <div className="divider">或</div>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">电子邮件地址*</label>
            <input type="email" id="email" name="email" required />
            <button type="submit" className="continue-btn">
              继续
            </button>
          </form>
          <div className="footer">
            没有账户？
            <a
              href="/register"
              style={{
                color: "#3b5bfd",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              注册
            </a>
          </div>
        </>
      ) : (
        <UserInfo user={user} />
      )}
    </div>
  );
}
