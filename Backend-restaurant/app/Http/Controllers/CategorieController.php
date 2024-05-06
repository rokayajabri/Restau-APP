<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:categories',
            // Autres règles de validation
        ]);

        $categorie = Categorie::create($request->all());

        return response()->json($categorie, 201);
    }

    public function show($id)
    {
        $categorie = Categorie::findOrFail($id);
        return response()->json($categorie);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|unique:categories,nom,' . $categorie->id,
            // Autres règles de validation
        ]);

        $categorie->update($request->all());

        return response()->json($categorie, 200);
    }

    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = $request->get('q');

        // Vérifiez d'abord si le terme de recherche est un nombre
        // Si c'est le cas, recherchez uniquement par ID
        if (is_numeric($query)) {
            $categories = Categorie::where('id', $query)->get();
        } else {
            // Sinon, recherchez par nom
            $categories = Categorie::where('nom', 'like', "%$query%")->get();
        }

        return response()->json($categories);
    }


}
