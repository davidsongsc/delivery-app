import DeleteInColumn from "@/components/DeleteInColumn";
import { IAddress } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";
import { Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import Image from "next/image";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

type AddressesColumnProps = (
  fetchData: () => void,
  selectToEdit: (value: IAddress) => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const AddressesColumn: AddressesColumnProps = (
  fetchData,
  selectToEdit,
  userPermissions
) => {
  return [
    {
      key: "default_zip",
      title: <span className="font-bold">CEP:</span>,
      dataIndex: "zip_code",
      render: (_: any, record: any) => (
        <div className="flex items-center justify-between gap-2 w-[100px]">
          <span>
            {record.is_default ? <Image src="/images/icones/star-on.svg" width={16} height={16} alt="." /> : <Image src="/images/icones/star-off.svg" width={16} height={16} alt="." />}
          </span>
          <span>{record.zip_code}</span>
        </div>
      ),
    },
    {
      key: "state",
      title: "UF:",
      dataIndex: "state",
    },
    {
      key: "city",
      title: "Cidade:",
      dataIndex: "city",
    },
    {
      key: "district",
      title: "Bairro:",
      dataIndex: "district",
    },
    {
      key: "street",
      title: "Rua:",
      dataIndex: "street",
    },
    {
      key: "number",
      title: "Nº:",
      dataIndex: "number",
    },
    {
      key: "complement",
      title: "Complemento:",
      dataIndex: "complement",
    },
    {
      title: "Deletar:",
      render: (_, record: IAddress) => (
        <div className="flex justify-around">
          {userPermissions.includes("endereco_editar") && (
            <Tooltip title="Editar">
              <CiEdit
                size={20}
                className="cursor-pointer"
                onClick={() => selectToEdit(record)}
              />
            </Tooltip>
          )}

          {userPermissions.includes("endereco_deletar") &&
            <DeleteInColumn
              id={record.id}
              service={addressService}
              refresh={fetchData}
              title="Deseja deletar esse endereço?"
              successMessage="Endereço deletado com sucesso!"
              errorMessage="Erro ao deletar endereço"
            
            />}
        </div>
      ),
    },
  ];
};
