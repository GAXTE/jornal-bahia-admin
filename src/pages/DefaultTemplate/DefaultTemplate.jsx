import { useState } from "react";
import Datepicker from "../../components/Datepicker";
import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import { CreateButton } from "../../components/Buttons/CreateButton";

export const DefaultTemplate = ({
  children,
  textButton,
  setIsModalOpenCreate,
  styleButton,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full max-w-9xl mx-auto">
              <WelcomeBanner />
              <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
                <div className="grid grid-flow-col sm:auto-cols-max justify-center sm:justify-end gap-2 sm:gap-3">
                  <Datepicker />
                  <CreateButton
                    style={styleButton}
                    textButton={textButton}
                    setIsModalOpenCreate={setIsModalOpenCreate}
                  />
                </div>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
