"use client";

import React from "react";
import PageTitle from "../MiniComponents/PageTitle";
import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppLoading from "../AppLoading";

interface IBaseProfile {
  id?: number | string;
  name?: string;
  cpf?: string;
  document?: string;
  category?: {
    name: string;
  } | null;
  supplier?: {
    name: string;
  } | null;
}

interface ProfileStructureProps {
  isLoading: boolean;
  navTitle: string;
  title: string;
  profile?: IBaseProfile | null;
  menuButtons: MenuButton[];
  children?: React.ReactNode;
}

interface MenuButton {
  title: string;
  link?: string;
  isActive: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  onClick?: () => void;
}

const ProfileStructure: React.FC<ProfileStructureProps> = ({
  isLoading,
  navTitle,
  title,
  profile = undefined,
  menuButtons,
  children,
}) => {
  const router = useRouter();

  return (
    <div className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <PageTitle hasBackButton navTitle={navTitle} title={title} />
        {profile && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-darkModal rounded-full w-56 h-56 mb-8">
              {profile?.id && (
                <div className="bg-darkModal rounded-full w-56 h-56 mb-8">
                  <Image
                    src={profile?.id ? `/images/profiles/${profile.id}.webp` : "/images/default-profile.webp"}
                    alt="."
                    className="h-[177px] w-[177px] rounded-full object-cover"
                    width={177}
                    height={177}
                  />

                </div>
              )}

            </div>
            <div className="flex flex-col items-center mb-8 text-center">
              {(profile && 'category' in profile && profile.category?.name)
                ? (
                  <h3 className="text-[16px] font-bold">
                    {profile.category.name} | {profile.name}
                  </h3>
                )
                : (
                  <h3 className="text-[14px] font-bold">
                    {profile?.name}
                  </h3>
                )}

              {profile && 'supplier' in profile && profile.supplier?.name && (
                <h4 className="text-[16px]">{profile.supplier.name}</h4>
              )}

              {profile && 'cpf' in profile ? (
                <p className="text-[14px]">{profile.cpf}</p>
              ) : 'document' in profile ? (
                <p className="text-[14px]">{profile.document}</p>
              ) : null}

            </div>

          </div>
        )}
        <hr className="border-t border-primary mb-1" />

        {menuButtons.map(button => (
          <Button
            key={button.title}
            type={button.isActive ? "primary" : "default"}
            block
            size="large"
            className={` mb-1 h-15 text-[12px] ${button.isActive ? "bg-darkModal border-btnPrimary text-btnPrimary" : ""}`}
            onClick={() => {
              if (button.onClick) {
                button.onClick();
              } else if (button.link) {
                router.push(button.link);
              }
            }}
            disabled={button.disabled}
          >
            {button.title}
          </Button>
        ))}

      </div>

      <div className=" lg:col-span-10 max-h-[calc(100vh-205px)] overflow-y-auto pb-5">
        {isLoading ? <AppLoading /> : <>{children}</>}
      </div>
    </div>
  );
};

export default React.memo(ProfileStructure);
