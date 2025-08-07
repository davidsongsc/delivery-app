import React, { useState } from "react";
import { Popconfirm, App, Button } from "antd";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

interface DeleteInColumnProps<T> {
  id: number | string;
  service: any;
  refresh: () => void;
  title?: string;
  successMessage?: string;
  errorMessage?: string;
  method?: string;
  span?: string;
  permissions?: string[];
  
}

const DeleteInColumn = <T extends object>({
  id,
  service,
  refresh,
  title = "",
  successMessage = "",
  errorMessage = "",
  method = "remove",
  span = "",
  permissions = [],
}: DeleteInColumnProps<T>) => {
  const { notification } = App.useApp();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Popconfirm
      title={title}
      open={open}
      placement="bottomRight"
      onConfirm={() => {
        if (loading) return false;
        setLoading(true);

        // @ts-ignore - dynamic method access
        service[method](id)
          .then(() => {
            notification.success({
              message: "Sucesso!",
              description: successMessage,
            });
            refresh();
            setOpen(false);
          })
          .catch((e: any) => {
            notification.error({
              message: errorMessage,
              description: e.response?.data?.message || "Erro inesperado.",
            });
            console.error(e);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      okButtonProps={{ loading }}
      onCancel={() => setOpen(false)}
    >
      {span.length === 0 ? (
        <Image
          src="/images/icones/trash.svg"
          width={17}
          height={17}
          alt="delete"
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <Button
          type="default"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-red-500 hover:underline top-4"
          disabled={!permissions.includes('produtos_deletar')}
        >
          {span}
        </Button>
      )}
    </Popconfirm>
  );
};

export default DeleteInColumn;
