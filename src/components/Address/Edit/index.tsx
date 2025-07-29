"use client";

import { Form, Modal, App } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AddressForm from "../Form";
import { IAddress, IAddressCreate } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";

interface AddressEditProps {
  selected?: IAddress;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  fetchData: () => void;
}

const AddressEdit: React.FC<AddressEditProps> = ({
  fetchData,
  setIsOpen,
  isOpen,
  selected,
}) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IAddressCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selected?.id) {
      form.setFieldsValue({
        city: selected.city,
        complement: selected.complement,
        district: selected.district,
        is_default: selected.is_default,
        number: selected.number,
        state: selected.state,
        street: selected.street,
        zip_code: selected.zip_code,
        country: selected.country,
      });
    }
  }, [selected]);

  const submitData = useCallback(() => {
    if (isLoading || !selected?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate = {
        city: values.city,
        complement: values.complement,
        district: values.district,
        is_default: values.is_default,
        number: values.number,
        state: values.state,
        street: values.street,
        zip_code: values.zip_code,
        country: values.country,
      };

      addressService
        .update(selected.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Endereço atualizado com sucesso!",
          });
          fetchData();
          setIsOpen(false);
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar endereço",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, selected, fetchData]);

  return (
    <Modal
      title="Editar endereço"
      open={isOpen}
      onOk={submitData}
      onCancel={() => setIsOpen(false)}
      okButtonProps={{ loading: isLoading }}
      width={800}
    >
      <AddressForm form={form} />
    </Modal>
  );
};

export default React.memo(AddressEdit);
