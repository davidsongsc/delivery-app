import React from "react";
import PageTitle from "../MiniComponents/PageTitle";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppLoading from "../AppLoading";
import { IProduto } from "@/interfaces/IProduto";
import { IUser } from "@/interfaces/IUser";
import { UserOutlined } from "@ant-design/icons";

interface ProfileStructureProps {
  isLoading: boolean;
  navTitle: string;
  title: string;
  user?: IUser | null;
  produto?: IProduto | null;
  menuButtons: MenuButton[];
  children?: React.ReactNode;
  className?: string;
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
  user,
  produto,
  menuButtons,
  children,
  className,
}) => {
  const router = useRouter();

  const getLatestProductImage = (): string | undefined => {
    if (!produto?.imagens?.length) return undefined;
    const imagensOrdenadas = [...produto.imagens].sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
    return imagensOrdenadas[0].imagem_url;
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-2 md:p-4 ${className}`}>

      {/* Sidebar */}
      <div className="lg:col-span-3 flex flex-col gap-3">
        <PageTitle hasBackButton navTitle={navTitle} title={title} />

        {/* Produto Card */}
        {produto && (
          <div className="bg-white shadow-lg  overflow-hidden flex flex-col items-center ">
            <div className="w-full h-80  overflow-hidden relative ">
              {getLatestProductImage() ? (
                <Image src={getLatestProductImage()} alt={produto.nome} fill className="object-contain" />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-2 shadow-sm text-sm text-gray-600">Preço</div>
              <div className="p-2 font-semibold text-gray-800">R$ {produto.preco}</div>

              <div className="bg-gray-50 rounded-lg p-2 shadow-sm text-sm text-gray-600">Imagens</div>
              <div className="p-2 font-semibold text-gray-800">{produto.imagens.length}</div>

              <div className="bg-gray-50 rounded-lg p-2 shadow-sm text-sm text-gray-600">Estoque</div>
              <div className="p-2 font-semibold text-gray-800">{produto.estoque}</div>

              <div className="bg-gray-50 rounded-lg p-2 shadow-sm text-sm text-gray-600">Status</div>
              <div className={`p-2 font-semibold ${produto.ativo ? "text-green-600" : "text-red-600"}`}>
                {produto.ativo ? "Ativo" : "Inativo"}
              </div>
            </div>
          </div>
        )}

        {/* User Card */}
        {user && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
              {user.avatar ? (
                <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">
                  <UserOutlined className="text-5xl" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.first_name}</h2>
            <p className="text-gray-600">{user.perfis?.map(p => p.nome).join(", ")}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        )}

        {/* Menu Buttons */}
        <div className="flex flex-col gap-3">
          {menuButtons.map(btn => (
            <Button
              key={btn.title}
              type={btn.isActive ? "primary" : "default"}
              block
              size="large"
              className="uppercase font-bold h-10"
              onClick={() => btn.onClick ? btn.onClick() : btn.link && router.push(btn.link)}
              disabled={btn.disabled}
            >
              {btn.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-9 max-h-[calc(100vh-122px)] ">
        {isLoading ? <AppLoading /> : children}
      </div>
    </div>
  );
};

export default React.memo(ProfileStructure);
