import React, { useEffect, useState } from 'react';
import { api } from '../config/axios';
import { Link } from 'react-router-dom';


const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Déplacer la fonction fetchUsers à l'extérieur de useEffect
    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Appel de la fonction fetchUsers ici
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await api.delete(`/api/delete_users/${id}`);
            if (response.status === 200) {
                // Mettre à jour la liste des utilisateurs après la suppression
                fetchUsers(); // Utilisation de la fonction fetchUsers ici
                console.log('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
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
            const response = await api.get(`/api/recherche_user?q=${searchTerm}`);
            setUsers(response.data); // Mettre à jour les utilisateurs avec les résultats de la recherche
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };

    return (
        <div>
            <h2>List of Users</h2>
            <Link to="/addUser">Add User</Link> 
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Search by name or email" />
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
