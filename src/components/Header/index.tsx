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
      <div className="flex items-center h-16 px-2 mx-auto">
        {userLoggedIn ? (
          <div className="flex flex-row w-full justify-evenly">
            <div className="basis-1/5">
              <div className="w-28 h-full flex">
                <img src={instagram} />
              </div>
            </div>

            <div className="basis-1/2 flex justify-between">
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-900 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={handleOpenModal}
              >
                Create Post
              </button>
              <SearchBox />
            </div>

            <div className="basis-1/4 flex justify-end">
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                    window.location.reload();
                  });
                }}
                className="text-white bg-red-300 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Logout
              </button>
            </div>

            <Modal show={showModal} onClose={handleCloseModal}>
              <div className="animate-fade-in">
                <PostForm onClose={handleCloseModal} />
              </div>
            </Modal>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center">
            <div className="w-28 h-full flex">
              <img src={instagram} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
