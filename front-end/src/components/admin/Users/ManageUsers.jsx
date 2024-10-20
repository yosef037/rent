import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios";
import "./ManageUsers.css"; // Import CSS for styling
import AdminNav from "../Navbar/AdminNav";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null); // State for editing user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user.User_Id !== userId)); // Update state to remove deleted user
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axiosInstance.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(
        users.map((user) =>
          user.User_Id === userId ? { ...user, Role: newRole } : user
        )
      );
      alert("User role updated successfully!");
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.put(
        `/admin/users/${editingUser.User_Id}`,
        editingUser
      );
      setUsers(
        users.map((user) =>
          user.User_Id === editingUser.User_Id ? editingUser : user
        )
      );
      alert("User updated successfully!");
      setEditingUser(null); // Reset editing state
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  if (errorMessage) {
    return <p className="text-danger">{errorMessage}</p>;
  }

  return (
    <>
      <AdminNav />
      <div className="manage-users">
        <h1>Manage Users</h1>

        {editingUser ? (
          <form onSubmit={handleUpdateUser} className="edit-user-form">
            <h4>Edit User</h4>
            <input
              type="text"
              value={editingUser.First_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, First_name: e.target.value })
              }
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={editingUser.Last_name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, Last_name: e.target.value })
              }
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              value={editingUser.Email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, Email: e.target.value })
              }
              placeholder="Email"
              required
            />
            <input
              type="tel"
              value={editingUser.Phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, Phone: e.target.value })
              }
              placeholder="Phone"
              required
            />
            <button type="submit" className="btn btn-info m-1">
              Update User
            </button>
            <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.User_Id}>
                  <td>{`${user.First_name} ${user.Last_name}`}</td>
                  <td>{user.Email}</td>
                  <td>
                    <select
                      value={user.Role}
                      onChange={(e) =>
                        handleChangeRole(user.User_Id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => handleDeleteUser(user.User_Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
