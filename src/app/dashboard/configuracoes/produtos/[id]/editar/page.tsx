"use client";
import ProductEditInfo, { ProductEditInfoRef } from "@/components/Products/Edit";
import { useRef, useEffect } from "react";
import { useProdutoContext } from "@/contexts/ProdutoContext";

export default function Page() {
  const infoRef = useRef<ProductEditInfoRef>(null);
  const { registerSubmitHandler } = useProdutoContext(); // função no contexto para registrar o submit

  useEffect(() => {
    registerSubmitHandler(() => infoRef.current?.submitForm());
  }, [registerSubmitHandler]);

  return <ProductEditInfo ref={infoRef} />;
}
