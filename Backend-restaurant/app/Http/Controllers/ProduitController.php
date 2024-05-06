<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index()
    {
        $produits = Produit::all();
        return response()->json($produits);
    }

    // Ajouter un produit
    public function store(Request $request)
    {
        $produit = Produit::create($request->all());
        return response()->json($produit, 201);
    }
    // Récupérer un produit spécifique
    public function show($id)
    {
        $produit = Produit::with('categorie')->find($id);
        return response()->json($produit);
    }
    // Mettre à jour un produit
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);
        $produit->update($request->all());
        return response()->json($produit, 200);
    }

    // Supprimer un produit
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();
        return response()->json(null, 204);
    }

    public function recherche(Request $request)
    {
        // Récupérer le terme de recherche du formulaire
        $query = $request->get('q');

        // Recherche des produits par nom ou ID
        $produits = Produit::where('nom', 'like', "%$query%")
                           ->orWhere('id', $query)
                           ->get();

        // Retourner les résultats de la recherche au format JSON
        return response()->json($produits);
    }
}
