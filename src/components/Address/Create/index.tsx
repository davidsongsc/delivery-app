"use client";

import { Button, Form, Modal, App } from "antd";
import React, { useCallback, useState } from "react";
import AddressForm from "../Form";
import { IAddressCreate } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";
import { useAuthStore } from "@/store/authStore";

interface AddressCreateProps {
  field: "user_id" | "corporation_id";
  value: string;
  fetchData: () => void;
  children?: React.ReactNode;
}

const AddressCreate: React.FC<AddressCreateProps> = ({
  field,
  value,
  fetchData,
  children,
}) => {
  const { notification } = App.useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm<IAddressCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthStore();
  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      addressService
        .create({
          ...values,
          content_type_model: "usuario",
          object_id: user?.id,
          [field]: value,
        })
        .then(() => {
          notification.success({
            message: "Endereço cadastrada com sucesso!",
          });
          fetchData();
          setIsOpen(false);
          form.resetFields();
        })
        .catch((e) => {
          notification.error({
            message: "Erro ao cadastrar endereço",
            description: e.response.data.message,
          });

        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, field, value, fetchData]);

  return (
    <>
      <div className="flex justify-between items-end">
        <Button type="default" className="border-btnPrimary text-btnPrimary w-[340px]" onClick={() => setIsOpen(true)}>
          Adicionar novo endereço
        </Button>

        {children}
      </div>
      <Modal
        title="Cadastrar endereço"
        open={isOpen}
        onOk={submitData}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ loading: isLoading }}
        width={800}
      >
        <AddressForm form={form} />
      </Modal>
    </>
  );
};

export default React.memo(AddressCreate);
