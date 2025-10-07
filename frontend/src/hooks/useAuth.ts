import { useEffect, useState } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthT | null | undefined>(undefined);

  useEffect(() => {
    const _auth = localStorage.getItem("auth");
    if (_auth) {
      setAuth(JSON.parse(_auth));
    } else {
      setAuth(null);
    }
  }, []);

  return { auth };
};
