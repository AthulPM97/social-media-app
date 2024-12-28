import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import instagram from "../../assets/instagram.png";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="border-b shadow-sm bg-white sticky top-0 z-10">
      <div className="flex space-x-5">
        <div className="flex justify-between items-center h-16 px-2 max-w-5xl mx-auto">
          {userLoggedIn ? (
            <>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                className="cursor-pointer text-[#0095f6] font-semibold whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="w-28 h-full flex">
              <img src={instagram} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
