import './App.css'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home/Home';
import BirdList from './pages/BirdList/BirdList';
import Donations from './pages/Donations/Donations';
import NewBird from './pages/NewBird/NewBird';
import SanctuaryInformation from './pages/SanctuaryInformation/SanctuaryInformation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import News from './pages/News/News';
import BirdInformation from './pages/Birdinformation/BirdInformaion';
import EditBird from './pages/EditBird/EditBird';

export const AdminContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path='bird-list' element={<BirdList />} />
      <Route path='bird-list/:id' element={<BirdInformation />} />
      <Route path='edit-bird/:id' element={<EditBird />} />
      <Route path='donations' element={<Donations />} />
      <Route path='new-bird' element={<NewBird />} />
      <Route path='information' element={<SanctuaryInformation />} />
      <Route path='news' element={<News />} />
    </Route>
  )
);


export default function App() {

  const [isAdmin, setIsAdmin] = useState(false);


  return (
    <AdminContext.Provider value={[isAdmin, setIsAdmin]}>
      <RouterProvider router={router} />
    </AdminContext.Provider>
  );
}