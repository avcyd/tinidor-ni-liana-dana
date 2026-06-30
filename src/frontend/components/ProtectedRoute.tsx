import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  doOnAuthStateChange,
} from "../../services/AuthService";
import { getUserById,} from "../../services/UserService";
import { type roles } from "../../models/User"

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Array<roles>;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [userRole, setUserRole] = useState<roles>("READER");

  useEffect(() => {
    const unsub = doOnAuthStateChange( async(user) => {
      if(user){
        const userDoc = await getUserById(user.uid);
        setUserRole(userDoc.role);
      }
      setAuthState(user ? "authenticated" : "unauthenticated");
    });
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  if (authState === "loading") {
    return <div className="article-status">Loading...</div>;
  }

  if (authState === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if(allowedRoles && (!userRole || !allowedRoles.includes(userRole))){
    return <Navigate to="/login" replace />
  }

  return <>{children}</>;
}
