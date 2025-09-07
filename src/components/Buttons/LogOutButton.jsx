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
      <div className="flex">
        <button 
          type="button" 
          className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          onClick={logOut}
        >
          <span className="hidden xs:inline">Sair</span>
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </>
  );
};
