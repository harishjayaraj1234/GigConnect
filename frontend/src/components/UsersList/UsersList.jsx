import React from "react";
import "./UsersList.css";

const users = [
  { name: "Mahesh", msg: "Great shots on Dribbble!", time: "12:35", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
  { name: "Ramesh", msg: "Hey man, how are you?", time: "12:10", img: "https://i.pravatar.cc/40?img=2" },
  { name: "jeevan", msg: "Hey, I just hope…", time: "17:25", img: "https://i.pravatar.cc/40?img=3" },
  { name: "Harsha", msg: "I really hope…", time: "16:35", img: "https://i.pravatar.cc/40?img=4" },
  { name: "Shankar", msg: "Hi, I'm reaching out…", time: "11:35", img: "https://i.pravatar.cc/40?img=5" },
  { name: "Praveen", msg: "Did you watch the…", time: "12:35", img: "https://i.pravatar.cc/40?img=6" },
  { name: "Raju", msg: "Cool shots on Dribbble!", time: "12:35", img: "https://i.pravatar.cc/40?img=7" }
];

function UsersList() {
  return (
    <div className="users-container">

      {/* Sidebar Icons */}
      <div className="sidebar">
        <div className="icon">🏠</div>
        <div className="icon">💬</div>
        <div className="icon">👥</div>
        <div className="icon">⚙️</div>
      </div>

      {/* Chat Users List */}
      <div className="users-list">
        {users.map((u, index) => (
          <div className="user-item" key={index}>
            <img src={u.img} alt={u.name} className="avatar" />
            <div className="user-info">
              <div className="user-name">{u.name}</div>
              <div className="user-msg">{u.msg}</div>
            </div>
            <div className="time">{u.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
