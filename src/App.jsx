// ================== css ======================
import './App.css';

// ================== library =========================
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// ================== page unprotected =========================
import Home from './web_pages/unprotected/home/Home';
import Login from './web_pages/unprotected/login/Login';
import Detail from './web_pages/unprotected/detail/Detail';
import Categories from './web_pages/unprotected/categories/Categories';

// ================== page protected ===========================
import HomeAdmin from './web_pages/protected/admin/homeAdmin/HomeAdmin';
import CategoriesAdmin from './web_pages/protected/admin/categoriesAdmin/CategoriesAdmin';
import HomeCustomer from './web_pages/protected/customer/homeCustomer/HomeCustomer';
import ProfileCustomer from './web_pages/protected/customer/profileCustomer/ProfileCustomer';
import ProductAdmin from './web_pages/protected/admin/productAdmin/ProductAdmin';
import ProductCustormer from './web_pages/protected/customer/productCustomer/ProductCustomer';
import CardCreditCustomer from './web_pages/protected/customer/cardCreditCustomer/CardCreditCustomer';
// ================== page error ===============================
import ErrorPage from './error/error_pages/ErrorPage';

//================= ===================
import DetailsProduct from './components/detailsProduct/DetailsProduct';
import ProfileAdmin from './web_pages/protected/admin/profileAdmin/ProfileAdmin';
import ResetPassword from './web_pages/unprotected/resetPassword/ResetPassword';


function App() {

  localStorage.setItem('valueListe', JSON.stringify({value:  0}));
  localStorage.setItem('shoppingListe', JSON.stringify([]));
  

  const router = createBrowserRouter([
    {
      // no protected
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage /> // dirige vers page erreur 
    },
    {
      // no protected
      path: "/login",
      element: <Login />
    },
    {
      // no protected
      path: "/detail",
      element: <Detail />
    },
    {
      // no protected
      path: "/categories",
      element: <Categories />
    },
    {
      // protected
      path: "/homeadmin",
      element: <HomeAdmin />
    },
    {
      // protected
      path: "/categoriesAdmin",
      element: <CategoriesAdmin/>
    },
    {
      // protected
      path: "/productAdmin",
      element: <ProductAdmin/>
    },
    {
      // protected
      path: "/profileAdmin",
      element: <ProfileAdmin/>
    },
    {
      // protected
      path: "/homecustomer",
      element: <HomeCustomer />
    },
    {
      //protected
      path: "/productCustomer",
      element: <ProductCustormer/>
    },
    {
      //protected
      path: "/cardCustomer",
      element: <CardCreditCustomer/>
    },
    {
      path: "/profilCustomer",
      element: <ProfileCustomer/>
    },
      //component
    {
      path: "/detailsProduct",
      element: <DetailsProduct/>
    },
      //reset password
    {
      path: "/resetPassword",
      element: <ResetPassword/>
    }

  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
