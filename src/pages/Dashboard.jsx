import React, { useState } from "react";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";

import Banner from "../partials/Banner";
import { DefaultTemplate } from "./DefaultTemplate/DefaultTemplate";

function Dashboard() {
  return (
    <>
      <DefaultTemplate styleButton={{ display: "none" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
          {/* Line chart (Acme Plus) */}
          <DashboardCard01 />
          {/* Line chart (Acme Advanced) */}
          <DashboardCard02 />
          {/* Line chart (Acme Professional) */}
          <DashboardCard03 />
        </div>
      </DefaultTemplate>
    </>
  );
}

export default Dashboard;
