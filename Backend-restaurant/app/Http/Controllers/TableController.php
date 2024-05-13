<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all();
        return response()->json($tables);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombrePlace' => 'required|numeric',
            'emplacement_X' => 'required|numeric',
            'emplacement_Y' => 'required|numeric',
        ]);

        $table = Table::create($validatedData);

        return response()->json($table, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombrePlace' => 'required|numeric',
            'emplacement_X' => 'required|numeric',
            'emplacement_Y' => 'required|numeric',
        ]);

        $table = Table::findOrFail($id);
        $table->update($validatedData);

        return response()->json($table, 200);
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        // Récupérer le terme de recherche du formulaire
        $query = $request->get('q');

        // Recherche des tables par emplacement ou ID
        $tables = Table::where('id', $query)
                       ->orWhere(function($query) use ($request) {
                           $query->where('emplacement_X', 'like', '%' . $request->get('q') . '%')
                                 ->orWhere('emplacement_Y', 'like', '%' . $request->get('q') . '%');
                       })
                       ->get();

        // Retourner les résultats de la recherche au format JSON
        return response()->json($tables);
    }
}
