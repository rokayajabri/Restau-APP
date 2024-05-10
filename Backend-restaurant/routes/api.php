<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CompositionProduitController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\ProduitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);
//User Management
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/users', [AdminController::class, 'index']);
    Route::put('/edit_users/{id}', [AdminController::class, 'update']);
    Route::delete('/delete_users/{id}', [AdminController::class, 'destroy']);
    Route::get('/recherche_user', [AdminController::class, 'search']);
    Route::middleware("authoriser")->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    //Product management
    Route::get('/produits', [ProduitController::class, 'index']);
    Route::post('/add_produit', [ProduitController::class, 'store']);
    Route::get('/show_produits/{id}', [ProduitController::class, 'show']);
    Route::put('/edit_produits/{id}', [ProduitController::class, 'update']);
    Route::delete('/delete_produits/{id}', [ProduitController::class, 'destroy']);
    Route::get('/recherche_produit', [ProduitController::class, 'recherche']);

    //Category management
    Route::get('/categories', [CategorieController::class, 'index']);
    Route::post('/add_categories', [CategorieController::class, 'store']);
    Route::get('/show_categories/{id}', [CategorieController::class, 'show']);
    Route::put('/edit_categories/{id}', [CategorieController::class, 'update']);
    Route::delete('/delete_categories/{id}', [CategorieController::class, 'destroy']);
    Route::get('/recherche_categorie', [CategorieController::class, 'search']);

    //ingredients management
    Route::get('/ingredients', [IngredientController::class, 'index']);
    Route::post('/add_ingredients', [IngredientController::class, 'store']);
    Route::put('/edit_ingredients/{id}', [IngredientController::class, 'update']);
    Route::delete('/delete_ingredients/{id}', [IngredientController::class, 'destroy']);
    Route::get('/recherche_ingredient', [IngredientController::class, 'search']);

});

Route::middleware('admin')->group(function () {

});

Route::middleware('gerant')->group(function () {
    // Routes pour les gérants
});

Route::middleware('cuisinier')->group(function () {
    // Routes pour les cuisiniers
});

Route::middleware('serveur')->group(function () {
    // Routes pour les serveurs
});

Route::middleware('caissier')->group(function () {
    // Routes pour les caissiers
});





//Route::group(['middleware'=> ['auth:sanctum']],function(){});
