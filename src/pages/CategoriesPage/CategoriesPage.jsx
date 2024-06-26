import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import Datepicker from "../../components/Datepicker";

import { DefaultModal } from "../../components/Modals/DefaultModal";
import { CategoryList } from "../../components/Tables/CategoryList";

// Lista de posts de exemplo

const posts = [
  {
    title:
      "kojskljsgsfjgfjf jgjgfs sfgj jgsfjsfg fjg ghsjksdghsjsddskjgsdksdjsdg  djsdkjsdksdgsdkjdgksdg lbsa,bafbfssbflknalfnlknslknfs olkashlkasfhklasf lkhsaklfashklasfhafls ",
    category: "Categoria A",
    date: "01/01/2023",
  },
  { title: "Post 2", category: "Categoria B", date: "02/02/2023" },
  { title: "Post 3", category: "Categoria C", date: "03/03/2023" },
];

export const Categories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

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
                  <button
                    onClick={() => setIsModalOpenCreate(true)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">
                      Adicionar Categoria
                    </span>
                  </button>
                </div>
              </div>
              <DefaultModal
                isModalOpen={isModalOpenCreate}
                setIsModalOpen={setIsModalOpenCreate}
              ></DefaultModal>
              <CategoryList array={posts} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
