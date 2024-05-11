import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './Layouts/Layout';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import AllUser from './components/AllUser';
import AllProduit from './components/AllProduit';
import AddProduit from './components/AddProduit';
import EditProduit from './components/EditProduit';
import AllCategorie from './components/AllCategorie';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategorie';
import AllIngredient from './components/AllIngredient';
import AddIngredient from './components/AddIngredient';
import EditIngredient from './components/EditIngredient';

 const getUserRole = () => {
    // Implémentez votre logique pour obtenir le rôle de l'utilisateur
    // Retourne 'admin' ou 'user' pour cet exemple
    return 'admin';
  };
function App() {
 
  const userRole = getUserRole();
  return (
      <BrowserRouter>
        <Routes>
      
        <Route path="/">
        <Route index element={<Login />} />{/* Page de connexion comme page principale */}
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="editUser/:id" element={<EditUser />} />
            <Route path="allUser" element={<AllUser />} />
            <Route path="allProduit" element={<AllProduit />} />
            <Route path="addProduit" element={<AddProduit />} />
            <Route path="editProduit/:id" element={<EditProduit />} />
            <Route path="allCategory" element={<AllCategorie />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="editCategory/:id" element={<EditCategory />} />
            <Route path="allIngredient" element={<AllIngredient />} />
            <Route path="addIngredient" element={<AddIngredient />} />
            <Route path="editIngredient/:id" element={<EditIngredient />} />
          </Route>
        </Route>


            


            {userRole === 'cuisinier' && (
            <>
              {/* Routes pour le cuisinier */}
            </>
          )}

          {userRole === 'serveur' && (
            <>
              {/* Routes pour le serveur */}
            </>
          )}
        </Routes>
      </BrowserRouter>
  );
}

export default App;