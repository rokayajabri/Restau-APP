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

