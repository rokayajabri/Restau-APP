import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
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
                                <Link className="nav-link" to="/logout">Logout</Link>
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
