import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/AdminPages/Login';
import Layout from './Layouts/Layout';
import AddUser from './components/AdminPages/AddUser';
import EditUser from './components/AdminPages/EditUser';
import AllUser from './components/AdminPages/AllUser';
import AllProduit from './components/AdminPages/AllProduit';
import AddProduit from './components/AdminPages/AddProduit';
import EditProduit from './components/AdminPages/EditProduit';
import AllCategorie from './components/AdminPages/AllCategorie';
import AddCategory from './components/AdminPages/AddCategory';
import EditCategory from './components/AdminPages/EditCategorie';
import AllIngredient from './components/AdminPages/AllIngredient';
import AddIngredient from './components/AdminPages/AddIngredient';
import EditIngredient from './components/AdminPages/EditIngredient';
import AdminDashboard from './components/AdminPages/AdminDashboard';
import CuisinierDashboard from './components/CuisinierPages/CuisinierDashboard';
import ServeurDashboard from './components/ServeurPages/ServeurDashboard';
import GerantDashboard from './components/GerantPages/GerantDashboard';
import CaissierDashboard from './components/CaissierPages/CaissierDashboard';
import AllCompositionProduit from './components/AdminPages/AllCompositionProduit';
import AddCompositionProduit from './components/AdminPages/AddCompositionProduit';
import EditCompositionProduit from './components/AdminPages/EditCompositionProduit';

function App() {
 
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/">
          <Route index element={<Login />} />{/* Page de connexion comme page principale */}
            <Route element={<Layout />}>
               {/* Routes pour l'administrateur */}
              <Route path="adminDashboard" element={<AdminDashboard />} />
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
              <Route path="compositions" element={<AllCompositionProduit />} />
              <Route path="addCompositionProduit" element={<AddCompositionProduit />} />
              <Route path="editCompositionProduit/:id" element={<EditCompositionProduit />} />

              {/* Routes pour le cuisinier */}
              <Route path="cuisinierDashboard" element={<CuisinierDashboard />} />

              {/* Routes pour le serveur */}
              <Route path="serveurDashboard" element={<ServeurDashboard />} />

              {/* Routes pour le serveur */}
              <Route path="gerantDashboard" element={<GerantDashboard />} />


              {/* Routes pour le caissier */}
              <Route path="caissierDashboard" element={<CaissierDashboard />} />




            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;