import React from "react";

import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { usePostContext } from "../../providers/PostContext";

function DashboardCard01() {
  const { AllPosts, createPost } = usePostContext();
  const posts = JSON.parse(sessionStorage.getItem("allPosts"));
  return (
    <div className="flex flex-col col-span-1 sm:col-span-1 lg:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-4 sm:px-5 pt-4 sm:pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex"></EditMenu>
        </header>
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Numero de Notícias</h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1"></div>
        <div className="flex items-start">
          <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2 mb-6 sm:mb-8">
            {AllPosts ? AllPosts.totalPosts : 0}
          </div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        {/* <LineChart data={chartData} width={389} height={128} /> */}
      </div>
    </div>
  );
}

export default DashboardCard01;
