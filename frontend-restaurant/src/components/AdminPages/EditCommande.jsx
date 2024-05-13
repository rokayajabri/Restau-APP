import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCommande = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        dateCmd: '',
        id_serveur: '',
        id_table: '',
        statut: '',
        total: '',
        details: []
    });
    const [serveurs, setServeurs] = useState([]);
    const [tables, setTables] = useState([]);
    const [produits, setProduits] = useState([]);

   
    useEffect(() => {
        const fetchCommandeDetails = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                const headers = {
                    Authorization: `Bearer ${userData.access_token}`,
                    'Content-Type': 'application/json',
                };
    
                setLoading(true);
                const [commandeRes, serveursRes, tablesRes, produitsRes] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/show_commandes/${id}`, { headers }),
                    axios.get('http://127.0.0.1:8000/api/users/serveurs', { headers }),
                    axios.get('http://127.0.0.1:8000/api/tables', { headers }),
                    axios.get('http://127.0.0.1:8000/api/produits', { headers })
                ]);
                setLoading(false);

                setServeurs(serveursRes.data);
                setTables(tablesRes.data);
                setProduits(produitsRes.data);

                if (commandeRes.data) {
                    const { dateCmd, serveur, table, statut, total, detailCommande } = commandeRes.data;
                    setFormData({
                        dateCmd: dateCmd || '',
                        id_serveur: serveur ? serveur.id : '',
                        id_table: table ? table.id : '',
                        statut: statut || '',
                        total: total || '',
                        details: detailCommande ? detailCommande.map(dc => ({
                            id: dc.id,
                            id_Produit: dc.produit ? dc.produit.id : 'Produit inconnu',
                            quantite: dc.quantite,
                            prix_un: dc.prix_un
                        })) : []
                    });
                    console.log('Commande loaded:', commandeRes.data);
                }
            } catch (error) {
                console.error('Error fetching commande details:', error);
                setLoading(false);
            }
        };

        fetchCommandeDetails();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addDetail = () => {
        if (produits.length > 0) {
            const newDetail = {
                id_Produit: produits[0].id,
                quantite: 1,
                prix_un: produits[0].prix
            };
            setFormData({ ...formData, details: [...formData.details, newDetail] });
        } else {
            console.error('No products available');
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

            const dataToSend = {
                dateCmd: formData.dateCmd,
                id_serveur: formData.id_serveur,
                id_table: formData.id_table,
                statut: formData.statut,
                total: formData.total,
                details: formData.details.map(detail => ({
                    id: detail.id,
                    id_Produit: detail.id_Produit,
                    quantite: detail.quantite,
                    prix_un: detail.prix_un
                }))
            };
            console.log('Data to send:', dataToSend); // Logging to see what is being sent
            setLoading(true);
            await axios.put(`http://127.0.0.1:8000/api/edit_commandes/${id}`, dataToSend, { headers });
            console.log('Commande updated successfully!');
            navigate("/commandes");
            setLoading(false);
        } catch (error) {
            console.error('Error updating commande:', error);
            setLoading(false);
        }
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...formData.details];
        updatedDetails[index][field] = value;
        setFormData({ ...formData, details: updatedDetails });
    };

    const removeDetail = (index) => {
        const updatedDetails = formData.details.filter((_, idx) => idx !== index);
        setFormData({ ...formData, details: updatedDetails });
    };

    return (
        <div>
            <h2>Edit Commande</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dateCmd">Date et Heure:</label>
                    <input type="datetime-local" id="dateCmd" name="dateCmd" value={formData.dateCmd} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="id_serveur">Serveur:</label>
                    <select id="id_serveur" name="id_serveur" value={formData.id_serveur} onChange={handleChange}>
                        {serveurs.map(serveur => (
                            <option key={serveur.id} value={serveur.id}>{serveur.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="id_table">Table:</label>
                    <select id="id_table" name="id_table" value={formData.id_table} onChange={handleChange}>
                        {tables.map(table => (
                            <option key={table.id} value={table.id}>{table.id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="statut">Statut:</label>
                    <select id="statut" name="statut" value={formData.statut} onChange={handleChange}>
                        <option value="à traiter">À traiter</option>
                        <option value="en preparation">En préparation</option>
                        <option value="prête à servir">Prête à servir</option>
                        <option value="en attente de paiement">En attente de paiement</option>
                        <option value="payée">Payée</option>
                        <option value="annulée">Annulée</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="total">Total (€):</label>
                    <input type="number" id="total" name="total" value={formData.total} onChange={handleChange} />
                </div>
                <div>
                    <h4>Détails de la commande</h4>
                    {formData.details.map((detail, index) => (
                        <div key={index}>
                            <select name="id_Produit" value={detail.id_Produit} onChange={(e) => handleDetailChange(index, 'id_Produit', e.target.value)}>
                                {produits.map(produit => (
                                    <option key={produit.id} value={produit.id}>{produit.nom}</option>
                                ))}
                            </select>
                            <input type="number" name="quantite" value={detail.quantite} onChange={(e) => handleDetailChange(index, 'quantite', e.target.value)} />
                            <input type="number" name="prix_un" value={detail.prix_un} onChange={(e) => handleDetailChange(index, 'prix_un', e.target.value)} />
                            <button type="button" onClick={() => removeDetail(index)}>Retirer</button>
                        </div>
                    ))}
                    <button type="button" onClick={addDetail}>Ajouter Détail</button>
                </div>
                <button type="submit">Mettre à jour la commande</button>
            </form>
        </div>
    );
};

export default EditCommande;
