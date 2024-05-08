import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
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
import Logout from './components/Logout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
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
              <Route path="logout" element={<Logout />} />
              {/* Insérez ici d'autres routes protégées si nécessaire */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;