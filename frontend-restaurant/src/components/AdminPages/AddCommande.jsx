import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCommande = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [commandeData, setCommandeData] = useState({
        dateTimeCmd: '',
        statut: '',
        total: 0,
        idServeur: '',
        idTable: '',
        details: []
    });
    const [produits, setProduits] = useState([]);
    const [tables, setTables] = useState([]);
    const [serveurs, setServeurs] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const userData = JSON.parse(localStorage.getItem("user"));
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
            setLoading(true);
            const [prodResponse, tableResponse, servResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/produits', { headers }),
                axios.get('http://127.0.0.1:8000/api/tables', { headers }),
                axios.get('http://127.0.0.1:8000/api/users/serveurs', { headers })
            ]);
            setProduits(prodResponse.data);
            setTables(tableResponse.data);
            setServeurs(servResponse.data);
    
            // Définir les valeurs par défaut pour les serveurs et les tables
            setCommandeData(prev => ({
                ...prev,
                idServeur: servResponse.data[0]?.id.toString(),  // Utiliser le premier serveur comme valeur par défaut
                idTable: tableResponse.data[0]?.id.toString()   // Utiliser la première table comme valeur par défaut
            }));
    
            setLoading(false);
        };
        fetchInitialData();
    }, []);
    

    
    const handleDetailChange = (index, field, value) => {
        let updatedDetails = [...commandeData.details];
        if (field === 'idProduit') {
            const selectedProduct = produits.find(p => p.id.toString() === value);
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value,
                prix_un: selectedProduct ? selectedProduct.prix : updatedDetails[index].prix_un  // Mettre à jour le prix unitaire si un nouveau produit est sélectionné
            };
        } else {
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value
            };
        }
    
        setCommandeData(prevState => ({
            ...prevState,
            details: updatedDetails
        }));
    
        // Recalculer le total après la mise à jour des détails
        updateTotal(updatedDetails);
    };
    

   
    
    

    const addDetailLine = () => {
        setCommandeData({
            ...commandeData,
            details: [...commandeData.details, { idProduit: '', quantite: '', prix_un: '' }]
        });
    };

    const handleChange = (e) => {
        setCommandeData({ ...commandeData, [e.target.name]: e.target.value });
    };
    const updateTotal = (details) => {
        const total = details.reduce((acc, detail) => acc + (parseFloat(detail.prix_un) * parseFloat(detail.quantite || 0)), 0);
        setCommandeData(prevState => ({
            ...prevState,
            total: total.toFixed(2)
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem("user"));
        const headers = {
            Authorization: `Bearer ${userData.access_token}`,
            'Content-Type': 'application/json',
        };
    
        // Assurez-vous que les détails de commande incluent 'prix_un'
        const dataToSend = {
            ...commandeData,
            id_serveur: commandeData.idServeur,
            id_table: commandeData.idTable,
            details: commandeData.details.map(detail => ({
                idProduit: detail.idProduit,
                quantite: detail.quantite,
                prix_un: detail.prix_un  // Assurez-vous que le prix unitaire est bien inclus
            }))
        };
    
        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/api/add_commande', dataToSend, { headers });
            console.log('Commande ajoutée avec succès!');
            setLoading(false);
            navigate("/commandes");
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la commande:', error);
            setLoading(false);
        }
    };
    
    

    return (
        <div>
            <h2>Ajouter une commande</h2>
            {loading ? <p>Loading...</p> : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="dateTimeCmd">Date et Heure:</label>
                        <input type="datetime-local" id="dateTimeCmd" name="dateTimeCmd" value={commandeData.dateTimeCmd} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="statut">Statut:</label>
                        <select id="statut" name="statut" value={commandeData.statut} onChange={handleChange}>
                            <option value="">Sélectionnez un statut</option>
                            <option value="à traiter">À traiter</option>
                            <option value="en preparation">En préparation</option>
                            <option value="prête à servir">Prête à servir</option>
                            <option value="en attente de paiement">En attente de paiement</option>
                            <option value="payée">Payée</option>
                            <option value="annulée">Annulée</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="total">Total:</label>
                        <input type="number" id="total" name="total" value={commandeData.total} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="idServeur">Serveur:</label>
                        <select id="idServeur" name="idServeur" value={commandeData.idServeur} onChange={handleChange}>
                            {serveurs.map(serveur => (
                                <option key={serveur.id} value={serveur.id}>{serveur.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="idTable">Table:</label>
                        <select id="idTable" name="idTable" value={commandeData.idTable} onChange={handleChange}>
                            {tables.map(table => (
                                <option key={table.id} value={table.id}>Table {table.id}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" onClick={addDetailLine}>Ajouter ligne commande</button>
                    {commandeData.details.map((detail, index) => (
    <div key={index}>
        <select
            name="idProduit"
            value={detail.idProduit}
            onChange={(e) => handleDetailChange(index, 'idProduit', e.target.value)}
        >
            <option value="">Sélectionnez un produit</option>
            {produits.map(produit => (
                <option key={produit.id} value={produit.id}>{produit.nom}</option>
            ))}
        </select>
        <input
            type="number"
            name="quantite"
            value={detail.quantite}
            onChange={(e) => handleDetailChange(index, 'quantite', e.target.value)}
        />
    </div>
))}

                    <button type="submit">Soumettre</button>
                </form>
            )}
        </div>
    );
};

export default AddCommande;