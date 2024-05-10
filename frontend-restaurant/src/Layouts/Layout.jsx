import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                // Vous pouvez effectuer d'autres actions nécessaires après la déconnexion réussie
                localStorage.removeItem('authToken'); // Assurez-vous que le nom du token est correctement orthographié
                navigate('/login');
                console.log("Logout successful");
            } else {
                throw new Error("Logout failed");
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
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
