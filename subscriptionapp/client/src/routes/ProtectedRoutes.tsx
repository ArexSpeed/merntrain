import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { UserContext } from "../context";

export const ProtectedRoutes = () => {
  const [state, setState] = useContext(UserContext);

  if(state.loading) return <div>Spinner...</div>;
  return state.data ? <Outlet /> : <Navigate to="/" />;
}

