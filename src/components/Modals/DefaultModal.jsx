import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import close from "../../assets/x.svg";

export const DefaultModal = ({ isModalOpen, setIsModalOpen, children }) => {
  const modalContentRef = useRef(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const closeModalIfClickedOutside = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <div
            onClick={closeModalIfClickedOutside}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center "
          >
            <motion.div
              // initial={{ opacity: 0, x: 50 }}
              // animate={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.5 }}
              // exit={{ opacity: 0, x: 50 }}
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
              className=" bg-white  flex flex-col  items-center gap-2  "
            >
              <button
                className="self-end mt-3 mr-3  cursor-pointer"
                onClick={toggleModal}
              >
                <img src={close} className="" alt="close button" />
              </button>
              <div className="flex flex-col items-center justify-center px-6 pb-6">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
