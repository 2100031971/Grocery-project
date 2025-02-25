import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import "./admin.css";  // ✅ Import CSS

const AdminPage = () => {
  const { user } = useAuth(); 
  const [loggedInUsers, setLoggedInUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      axios.get("http://localhost:5000/api/admin/logged-in-users")
        .then((res) => setLoggedInUsers(res.data.count || 0))
        .catch((err) => console.error("Error fetching logged-in users", err));

      axios.get("http://localhost:5000/api/admin/users")
        .then((res) => {
          console.log("User Data:", res.data);
          if (Array.isArray(res.data)) {
            setTotalUsers(res.data.length);
            setUserList(res.data);
          } else if (res.data.users && Array.isArray(res.data.users)) {
            setTotalUsers(res.data.totalUsers || res.data.users.length);
            setUserList(res.data.users);
          } else {
            console.error("Invalid API response format:", res.data);
          }
        })
        .catch((err) => console.error("Error fetching total users", err));
    }
  }, [user]);

  if (!user?.isAdmin) {
    return <h2 className="access-denied">Access Denied: Admins Only</h2>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <p>Currently Logged-in Users: <strong>{loggedInUsers}</strong></p>
        <p>Total Registered Users: <strong>{totalUsers}</strong></p>
      </div>

      <h2>User List:</h2>
      {userList.length > 0 ? (
        <ul className="user-list">
          {userList.map((u) => (
            <li key={u._id}>
              <span><strong>{u.name}</strong> - {u.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-users">No users found.</p>
      )}
    </div>
  );
};

export default AdminPage;
