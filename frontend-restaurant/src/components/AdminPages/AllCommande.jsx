import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllCommande = () => {
    const [commandes, setCommandes] = useState([]);
    const [statut, setStatut] = useState('');
    const [serveurName, setServeurName] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCommandes = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };

            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/commandes', { headers });
            setCommandes(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching commandes:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommandes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this commande?')) {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                const headers = {
                    Authorization: `Bearer ${userData.access_token}`,
                    'Content-Type': 'application/json',
                };

                setLoading(true);
                await axios.delete(`http://127.0.0.1:8000/api/delete_commandes/${id}`, { headers });
                setCommandes(prevCommandes => prevCommandes.filter(commande => commande.id !== id));
                setLoading(false);
            } catch (error) {
                console.error("Error deleting commande:", error);
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };

            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/recherche_commande', {
                headers,
                params: {
                    statut,
                    serveur_name: serveurName,
                    date_debut: dateDebut,
                    date_fin: dateFin,
                },
            });
            setCommandes(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error searching for commandes:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>List of Commandes</h2>
            <Link to="/addCommande">Add Commande</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={statut}
                    onChange={(e) => setStatut(e.target.value)}
                    placeholder="Search by statut"
                />
                <input
                    type="text"
                    value={serveurName}
                    onChange={(e) => setServeurName(e.target.value)}
                    placeholder="Search by serveur name"
                />
                <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    placeholder="Search by start date"
                />
                <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    placeholder="Search by end date"
                />
                <button type="submit">Search</button>
            </form>
            {loading ? <p>Loading...</p> : (
                <table border="1px">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Serveur</th>
                            <th>Table</th>
                            <th>Statut</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map(commande => (
                            <tr key={commande.id}>
                                <td>{commande.id}</td>
                                <td>{commande.dateCmd}</td>
                                <td>{commande.serveur ? commande.serveur.name : 'Unassigned'}</td>
                                <td>{commande.table ? `Table ${commande.table.id}` : 'No Table'}</td>
                                <td>{commande.statut}</td>
                                <td>{parseFloat(commande.total).toFixed(2)}</td>
                                <td>
                                    <Link to={`/editCommande/${commande.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(commande.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllCommande;
