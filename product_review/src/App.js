import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Details from './pages/Details';
import adminLogin from './pages/adminLogin';
import Register from './pages/Register';

let routerList = createBrowserRouter([
  {path:"login",element:<Login/>},
  {path:"/",element:<Home/>},
  {path:"details",element:<Details/>},
  {path:"admin",element:<adminLogin/>},
  {path:"register",element:<Register/>}
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={routerList}/>
  
    </div>
  );
}

export default App;
