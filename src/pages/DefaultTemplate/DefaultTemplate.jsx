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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <WelcomeBanner />
              <div className="sm:flex sm:justify-end sm:items-center mb-8">
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
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
