import axios from 'axios';
import { useState } from 'react'
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Assurez-vous que userData est bien défini
    
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };

            // Set loading state
            setLoading(true);

            await axios.post("http://127.0.0.1:8000/api/logout", null, { headers });

            localStorage.removeItem('user'); // Assurez-vous que le nom du token est correctement orthographié
            navigate('/');
            console.log("Logout successful");
            setLoading(false);
        } catch (error) {
            console.error('Erreur deconnexion user :', error);
        }
    };

  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Dashboard">Home Page</Link>
                            </li>
                          
                            <li className="nav-item">
                                <Link className="nav-link" to="/AllUser">User Management</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AllProduit">Product management</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allCategory">Category management</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allIngredient">Ingredient management</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/compositions">Composition des Produits</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main className="container">
            <Outlet/>
        </main>
    </div>
  )
}
