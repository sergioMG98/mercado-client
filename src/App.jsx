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
import HomeCustomer from './web_pages/protected/customer/homeCustomer/HomeCustomer';

// ================== page error ===============================
import ErrorPage from './error/error_pages/ErrorPage';

function App() {

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
      path: "/homecustomer",
      element: <HomeCustomer />
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
