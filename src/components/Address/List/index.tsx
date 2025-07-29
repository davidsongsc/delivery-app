"use client";

import { Constants } from "@/components/constants";
import { Table } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { AddressesColumn } from "./column";
import { useAddresses } from "@/hooks/useAddresses";
import AddressCreate from "../Create";
import { IAddress } from "@/interfaces/IAddress";
import AddressEdit from "../Edit";
import { useAuth } from "@/contexts/AuthContext";
import getUserPermissions from "@/utils/permissions";

interface AddressListProps {
  field: "user_id" | "corporation_id";
  value: string;
  children?: React.ReactNode;
}

const AddressList: React.FC<AddressListProps> = ({ field, value, children }) => {
  const [page, setPage] = useState<number>(1);

  const { user } = useAuth();
  const permissions = getUserPermissions(user);

  const { addresses, addressesLoading, addressesTotal, addressesRefresh } =
    useAddresses(
      useMemo(
        () => ({
          page,
          limit: Constants.per_page,
          filters: {
            [field]: value,
          },
        }),
        [page, field, value]
      )
    );

  const [editSelected, setEditSelected] = useState<IAddress>();
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  const selectToEdit = useCallback((value: IAddress) => {
    setEditSelected(value);
    setEditIsOpen(true);
  }, []);

  return (
    <>
      {permissions.includes('endereco_visualizar') &&
        <>
          <Table
            rowKey="id"
            className="mb-8"
            columns={AddressesColumn(addressesRefresh, selectToEdit, permissions)}
            dataSource={addresses}
            loading={addressesLoading}
            pagination={{
              hideOnSinglePage: true,
              current: page,
              pageSize: Constants.per_page,
              total: addressesTotal,
              onChange: page => setPage(page),
            }}
          />
          <AddressEdit
            selected={editSelected}
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            fetchData={addressesRefresh}
          />
          {permissions.includes('endereco_criar') &&
            <AddressCreate field={field} value={value} fetchData={addressesRefresh} children={children} />
          } </>}
    </>
  );
};

export default React.memo(AddressList);
