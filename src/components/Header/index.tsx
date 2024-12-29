import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import instagram from "../../assets/instagram.png";
import { useState } from "react";
import Modal from "../Modal";
import PostForm from "../PostForm";
import SearchBox from "./Searchbox";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="border-b shadow-sm bg-white sticky top-0 z-10">
      <div className="flex space-x-5">
        <div className="flex justify-between items-center h-16 px-2 max-w-5xl mx-auto">
          {userLoggedIn ? (
            <>
              <SearchBox />
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
              <button
                className="px-4 py-2 bg-white text-blue-500 rounded"
                onClick={handleOpenModal}
              >
                Create Post
              </button>

              <Modal show={showModal} onClose={handleCloseModal}>
                <PostForm onClose={handleCloseModal} />
              </Modal>
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
