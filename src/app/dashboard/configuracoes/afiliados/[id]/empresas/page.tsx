"use client";

import React from "react";
import CompanyUsersList from "@/components/CompanyUsers/List";

const Page: React.FC = () => {
  return <CompanyUsersList field="user_id" />;
};

export default React.memo(Page);
