import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { useContext } from 'react';


const ProtectedRoute = () =>{
  const { user, setUser } = useContext(UserContext);


  //const user=null;
  return user ?  <Outlet/> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;
