import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllFacture = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fonction pour récupérer toutes les factures depuis l'API Laravel
    const fetchFactures = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/api/factures",{headers});
            setFactures(response.data);
            // Reset loading state
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    fetchFactures();
  }, []);

  const deleteFacture = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData); // Assurez-vous que userData est bien défini

        const headers = {
            Authorization: `Bearer ${userData.access_token}`,
            'Content-Type': 'application/json',
        };

        // Set loading state
        setLoading(true);

        // Effectuer la requête de suppression
        await axios.delete(`http://127.0.0.1:8000/api/delete_facture/${id}`, { headers });

        // Mettre à jour l'état produits en supprimant le produit avec l'ID spécifié
        setFactures(factures.filter(facture => facture.id !== id));

        // Reset loading state
        setLoading(false);
    } catch (error) {
        console.error("Error:", error);
        // Gérer l'erreur (afficher un message d'erreur, etc.)
    }
};

    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this facture?')) {
            deleteFacture(id);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Assurez-vous que userData est bien défini
    
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
    
            // Effectuer la requête de recherche
            const response = await axios.get(`http://127.0.0.1:8000/api/recherche_facture?q=${searchTerm}`, { headers });
    
            // Mettre à jour l'état produits avec les résultats de la recherche
            setFactures(response.data);
    
            // Réinitialiser l'état de chargement
            setLoading(false);
        } catch (error) {
            console.error('Error searching for facture:', error);
            // Gérer l'erreur (afficher un message d'erreur, etc.)
        }
    };
    

  return (
    <div>
            <h1>Liste des Factures</h1>
            <Link to="/addFacture">Ajouter une facture</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Search by id or statut"/>
                <button type="submit">Search</button>
            </form><br />

            {loading ? (
                <p>Chargement en cours...</p>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID Commande</th>
                            <th>Montant Total</th>
                            <th>Date de Paiement</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {factures.map((facture) => (
                            <tr key={facture.id}>
                                <td>{facture.id_Commande}</td>
                                <td>{facture.montant_total}</td>
                                <td>{facture.datePaiement}</td>
                                <td>{facture.statut}</td>
                                <td>
                                    <button onClick={() => handleDeleteConfirmation(facture.id)}>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/editFacture/${facture.id}`}>Edit</Link>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            )}
        </div>
  );
};

export default AllFacture;
