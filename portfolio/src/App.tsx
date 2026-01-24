
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Root/RootLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {index:true,element:<Home/>},
      {path:"About",element:<About/>},
      {path:"Contact",element:<Contact/>}

    ],
  },
])
function App() {


  return <RouterProvider router={router}/>
}

export default App
