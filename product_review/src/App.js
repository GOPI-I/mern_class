import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Details from './pages/Details';
import adminLogin from './pages/adminLogin';
import Register from './pages/Register';
import AddReview from './pages/AddReview';

let routerList = createBrowserRouter([
  {path:"login",element:<Login/>},
  {path:"/",element:<Home/>},
  {path:"/review",element:<AddReview/>},
  {path:"details",element:<Details/>},
  {path:"admin",element:<adminLogin/>},
  {path:"register",element:<Register/>}
]);
function App() {
  return (
    <div className="App">
      <div>
        <h1>Learn React</h1>
      </div>

      <RouterProvider router={routerList}/>
  
    </div>
  );
}

export default App;
