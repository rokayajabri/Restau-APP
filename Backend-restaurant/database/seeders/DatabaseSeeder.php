<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         \App\Models\User::factory(4)->create();
         \App\Models\Table::factory(10)->create();
         \App\Models\Categorie::factory(5)->create();
         \App\Models\Ingredient::factory(25)->create();
         \App\Models\Produit::factory(15)->create();
         \App\Models\CompositionProduit::factory(10)->create();

         \App\Models\User::factory()->create([
             'name' => 'rokaya',
             'email' => 'rokaya@gmail.com',
             'password'=>'12345678',
             'role'=>'Admin'

         ]);
    }
}
