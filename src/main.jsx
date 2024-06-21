import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import { RouterProvider ,useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Player from './pages/Player/Player.jsx'


const AppLayout = () => {

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth , async (user) => {
      if(user) {
        console.log("logged in");
        navigate('/');
      }else{
        console.log("logged out")
        navigate("/login")
      }
    })
  },[])
  return (
    <div className='app'>
     < ToastContainer theme='dark' />
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path : "/",
    element: <AppLayout />,
    children : [
      {
        path: "/",
        element : <Home/>
      },
      {
        path: "/login" ,
        element: <Login />
      },
    ]
    
  },
  {
    path: "/player/:id",
    element: <Player />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={appRouter}/>
    
  
  
)
