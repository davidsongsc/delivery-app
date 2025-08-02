"use client";

import PageTitle from "@/components/MiniComponents/PageTitle";
import { IUserCreate } from "@/interfaces/IUser";
import { Button, Form, App } from "antd";
import React, { use, useCallback, useState } from "react";
import UserForm from "../Form";
import { userService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const UserCreate: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IUserCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {user} = useAuth();
  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      userService
        .create({
          username: values.username,
          email: values.email,
          password: values.password,
          is_active: values.is_active,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          cpf: values.cpf,
          rg: values.rg,
          tenant: user?.tenant
        })
        .then(res => {
          console.log("Usuario criado com sucesso", res.data);
          notification.success({
            message: "Usuario cadastrado com sucesso!",
          });
          router.push(
            `/dashboard/configuracoes/usuarios/${res.data.id}/editar`
          );

        })
        .catch((e) => {
          const errorData = e.response?.data;

          if (errorData && typeof errorData === 'object') {
            Object.entries(errorData).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((msg) => {
                  notification.error({
                    message: field,
                    description: msg,
                    duration: 5,
                  });
                });
              }
            });
          } else {
            notification.info({
              message: "Confira os dados",
              description: "Verifique os campos.",
            });
          }


        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto pb-4">
      <PageTitle hasBackButton navTitle="Sistema > Usuarios >" title="Cadastrar Usuario" />
      <div className="container-conteudo-small">
        <UserForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(UserCreate);
