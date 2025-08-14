"use client";

import { Button, Form, App } from "antd";
import React, { use, useCallback, useState } from "react";
import UserForm from "../Form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ProfileStructure from "@/components/ProfileStructure";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";
import { IClientsCreate } from "@/interfaces/IClients";
import { clienteService } from "@/services/clients.service";

const ClienteCreate: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IClientsCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, loading, permissions } = useAuth();
  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      clienteService
        .create({
          ...values,
          
        })
        .then(res => {
          console.log("Cliente criado com sucesso", res.data);
          notification.success({
            message: "Cliente cadastrado com sucesso!",
          });
          router.push(
            `/dashboard/configuracoes/clientes/${res.data.id}/editar`
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
      <ProfileStructure
        isLoading={loading}
        navTitle="Sistema > Clientes"
        title="Cadastrar"
        menuButtons={[
          {
            title: 'Todos Usuários',
            link: `/dashboard/configuracoes/clientes/`,
            isActive: false,
          },
          {
            title: 'Salvar Novo Usuário',
            onClick: submitData,
            isActive: false,
          },
        ]}
      >
        <div >
          <SectionSeparator title="Geral" >
            <div className="container-conteudo-small">
              <UserForm form={form} />
            </div>

          </SectionSeparator>
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(ClienteCreate);
