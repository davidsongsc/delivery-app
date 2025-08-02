'use client';
import React from "react";
import PerfilPage from "@/templates/perfil";
import WebhookDashboard from "@/components/WebhookDashboard";
import CreateSubscription from "@/components/Payments/CreateSubscription";

const Dashboard = () => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div className="col-span-2 md:col-span-6"><CreateSubscription />
      </div>
      <div className="col-span-2">

        <WebhookDashboard />

      </div>
      <div className="col-span-4">
        <PerfilPage />
      </div>
    </div>
  );
}
export default React.memo(Dashboard);  