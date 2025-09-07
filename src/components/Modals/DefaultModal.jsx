import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import close from "../../assets/x.svg";

export const DefaultModal = ({ isModalOpen, setIsModalOpen, children }) => {
  const modalContentRef = useRef(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 sm:p-6">
            <motion.div
              // initial={{ opacity: 0, x: 50 }}
              // animate={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.5 }}
              // exit={{ opacity: 0, x: 50 }}
              ref={modalContentRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl flex flex-col items-center gap-2 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <button
                className="self-end mt-2 sm:mt-3 mr-2 sm:mr-3 cursor-pointer p-1 hover:bg-gray-100 rounded transition-colors"
                onClick={toggleModal}
              >
                <img src={close} className="w-4 h-4 sm:w-5 sm:h-5" alt="close button" />
              </button>
              <div className="flex flex-col items-center justify-center px-4 sm:px-6 pb-4 sm:pb-6 w-full">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
