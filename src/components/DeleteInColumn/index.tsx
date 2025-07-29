import React, { useState } from "react";
import { Popconfirm, App } from "antd";
import Image from "next/image";

interface DeleteInColumnProps<T> {
  id: number | string;
  service: any;
  refresh: () => void;
  title?: string;
  successMessage?: string;
  errorMessage?: string;
  method?: string;
}

const DeleteInColumn = <T extends object>({
  id,
  service,
  refresh,
  title = "",
  successMessage = "",
  errorMessage = "",
  method = "remove",
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

        // @ts-ignore - service type
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
              description: e.response.data.message,
            });
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      okButtonProps={{
        loading,
      }}
      onCancel={() => setOpen(false)}
    >
      <Image
        src="/images/icones/trash.svg"
        width={17}
        height={17}
        alt="delete"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />

    </Popconfirm>
  );
};

export default DeleteInColumn;
