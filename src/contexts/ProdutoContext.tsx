"use client";
import React, { createContext, useContext } from "react";
import { IProduto } from "@/interfaces/IProduto";

interface ProdutoContextType {
  produto: IProduto | null;
  produtoLoading: boolean;
  permissions?: string[];
  produtoRefresh: () => void;
  registerSubmitHandler?: (fn: () => void) => void;
}

const ProdutoContext = createContext<ProdutoContextType | undefined>(undefined);

export const ProdutoProvider = ({
  children,
  value
}: {
  children: React.ReactNode;
  value: ProdutoContextType;
}) => (
  <ProdutoContext.Provider value={value}>{children}</ProdutoContext.Provider>
);

export const useProdutoContext = () => {
  const context = useContext(ProdutoContext);
  if (!context) throw new Error("useProdutoContext must be used within ProdutoProvider");
  return context;
};
