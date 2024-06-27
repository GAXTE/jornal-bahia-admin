import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
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
              className=" bg-white w-[600px] h-[400px] flex flex-col  items-center overflow-y-auto  "
            >
              <button
                className="self-end sticky top-2 mt-2 mr-7 cursor-pointer"
                onClick={toggleModal}
              >
                <img src={close} className="" alt="close button" />
              </button>
              <div className="flex flex-col items-center justify-center h-full">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
