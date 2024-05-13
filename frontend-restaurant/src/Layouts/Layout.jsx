import axios from 'axios';
import { useState } from 'react'
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    const role = userData.role; 
    console.log(userData)

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
        console.log(`Token sent: ${userData.access_token}`); // Ajoutez cette ligne pour afficher le token envoyé

    };

    const renderMenu = () => {
        switch (role) {
          case 'Admin':
            return (
              <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/AdminDashboard">AdminDashboard</Link>
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
                    <Link className="nav-link" to="/allIngredient">CompositionProduit management</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/compositions">Composition des Produits</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/commandes"> Commandes</Link>
                </li>
              </ul>
            );
          case 'Cuisinier':
            return (
              <ul className="navbar-nav">
                 <li className="nav-item">
                    <Link className="nav-link" to="/CuisinierDashboard">CuisinierDashboard</Link>
                </li>
             
              </ul>
            );

            case 'Serveur':
            return (
              <ul className="navbar-nav">
                 <li className="nav-item">
                    <Link className="nav-link" to="/ServeurDashboard">ServeurDashboard</Link>
                </li>
             
              </ul>
            );

            case 'Gerant':
              return (
                <ul className="navbar-nav">
                   <li className="nav-item">
                      <Link className="nav-link" to="/GerantDashboard">GerantDashboard</Link>
                  </li>
               
                </ul>
              );
            case 'Caissier':
              return (
                <ul className="navbar-nav">
                   <li className="nav-item">
                      <Link className="nav-link" to="/CaissierDashboard">CaissierDashboard</Link>
                  </li>
               
                </ul>
              );
          // Ajoutez des cas pour les autres types d'utilisateurs
          default:
            return null;
        }
      };


  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {renderMenu()}

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