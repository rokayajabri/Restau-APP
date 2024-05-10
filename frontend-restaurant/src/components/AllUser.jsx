import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users");
            if (response.ok) {
                const userData = await response.json();
                setUsers(userData);
            } else {
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete_users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                console.log('User deleted successfully');
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/recherche_user?q=${searchTerm}`);
            if (response.ok) {
                const searchData = await response.json();
                setUsers(searchData);
            } else {
                throw new Error("Failed to search users");
            }
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };

    return (
        <div>
            <h2>List of Users</h2>
            <Link to="/addUser">Add User</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by name or email" />
                <button type="submit">Search</button>
            </form>
            <table border="1px">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/editUser/${user.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteConfirmation(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;
