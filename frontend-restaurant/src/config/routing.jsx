import {Route, createBrowserRouter} from 'react-router-dom'    
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Layout from '../Layouts/Layout'
import AddUser from '../components/AddUser'
import Logout from '../components/Logout'
import AllUser from '../components/AllUser'
import EditUser from '../components/EditUser'
import AllProduit from '../components/AllProduit'
import AddProduit from '../components/AddProduit'
import EditProduit from '../components/EditProduit'
import AllCategorie from '../components/AllCategorie'
import AddCategory from '../components/AddCategory'
import EditCategory from '../components/EditCategorie'

const routes=createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<Login/>
            },
           {
                path:"dashboard",
                element:<Dashboard/>
            },
            {
                path:"AddUser",
                element:<AddUser/>
            },
            {
                path: "editUser/:id",
                element: <EditUser />
            },
            {
                path:"allUser",
                element:<AllUser/>
            },
            {
                path:"allProduit",
                element:<AllProduit/>
            },
            {
                path:"addProduit",
                element:<AddProduit/>
            },
            {
                path: "editProduit/:id",
                element: <EditProduit />
            },
            {
                path: "allCategory",
                element: <AllCategorie/>
            },
            {
                path: "addCategory",
                element: <AddCategory/>
            },
            {
                path: "editCategory/:id",
                element: <EditCategory />
            },
            {
                path:"logout",
                element:<Logout/>
            },
           
           
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}

/*const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                {isLoggedIn ? (
                    <Route path="/" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="/allUser" element={<AllUser />} />
                        <Route path="/AddUser" element={<AddUser />} />
                        <Route path="/editUser/:id" element={<EditUser />} />

                        <Route path="/allProduit" element={<AllProduit />} />
                        <Route path="/addProduit" element={<AddProduit />} />
                        <Route path="/editProduit/:id" element={<EditProduit />} />
                        
                        <Route path="/allCategory" element={<AllCategorie />} />
                        <Route path="/addCategory" element={<AddCategory />} />
                        <Route path="/editCategory/:id" element={<EditCategory />} />
                       
                    </Route>
                ) : (
                    <Navigate to="/" replace />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default Routes;*/