import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/api/users",{headers});
            setUsers(response.data);
            // Reset loading state
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
             await axios.delete(`http://127.0.0.1:8000/api/delete_users/${id}`, {headers});

              // Mettre à jour l'état produits en supprimant le produit avec l'ID spécifié
              setUsers(users.filter(user => user.id !== id));
    
              // Reset loading state
              setLoading(false);
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
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/recherche_user?q=${searchTerm}`,{headers});
            
            // Mettre à jour l'état produits avec les résultats de la recherche
            setUsers(response.data);
    
            // Réinitialiser l'état de chargement
            setLoading(false);
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
