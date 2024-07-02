import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserContext";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <div className="flex first-letter:">
        <button type="button flex " onClick={logOut}>
          Sair <LogOut className="h-5" />
        </button>
      </div>
    </>
  );
};
