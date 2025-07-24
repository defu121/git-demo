import React from "react";

// 显示GitHub用户信息
export default function UserInfo({ user }) {
  return (
    <div className="user-info">
      <img src={user.avatar_url} alt="avatar" className="avatar" />
      <div className="username">{user.login}</div>
      <div className="name">{user.name}</div>
      <div className="email">{user.email}</div>
    </div>
  );
}
