"use client";

import { IAddressCreate } from "@/interfaces/IAddress";
import {
  Alert,
  Checkbox,
  ColorPicker,
  Form,
  FormInstance,
  Input,
  App,
  Select,
} from "antd";
import React, { useCallback } from "react";
import cep from "cep-promise";
import Masks from "@/utils/masks";

interface AddressFormProps {
  form: FormInstance<IAddressCreate>;
  isEditing?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  form,
  isEditing = false,
}) => {
  const { notification } = App.useApp();
  const handleZipCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const zipCode = Masks.cep(e.target.value);
      if (zipCode.length === 9) {
        cep(zipCode.replace("-", ""))
          .then(response => {
            form.setFieldsValue({
              zip_code: zipCode,
              city: response.city,
              district: response.neighborhood,
              state: response.state,
              street: response.street,
            });
          })
          .catch((e) => {
            notification.warning({
              message: "CEP não encontrado",
              description: "Todos os serviços de CEP retornaram erro. Você pode continuar o cadastro preenchendo os campos manualmente.",
              duration: 7,
            });
            form.setFieldsValue({
              zip_code: zipCode,
            });
            console.error('err', e);
          });
      } else {
        form.setFieldsValue({
          zip_code: zipCode,
        });
      }
    },
    [form]
  );
  return (
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <Form.Item<IAddressCreate>
          className="lg:col-span-4"

          label="CEP"
          name="zip_code"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input onChange={handleZipCode} />
        </Form.Item>

        <Form.Item<IAddressCreate>
          className="lg:col-span-6"

          label="Rua"
          name="street"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAddressCreate>
          className="lg:col-span-2"
          label="Número"
          name="number"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <Form.Item<IAddressCreate>
          className="lg:col-span-12"
          label="Complemento" name="complement">
          <Input />
        </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <Form.Item<IAddressCreate>
          className="lg:col-span-2"
          label="UF"
          name="state"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAddressCreate>
          className="lg:col-span-4"
          label="Cidade"
          name="city"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAddressCreate>
          className="lg:col-span-6"
          label="Bairro"
          name="district"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
        <Form.Item<IAddressCreate>
          className="lg:col-span-12"
          label="País"
          name="country"
          initialValue={"Brasil"}
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IAddressCreate>
          className="lg:col-span-12"
          label="Endereço preferencial"
          name="is_default"
          initialValue={true}
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Select>
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default React.memo(AddressForm);
