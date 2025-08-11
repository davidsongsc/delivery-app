import React from "react";
import PageTitle from "../MiniComponents/PageTitle";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppLoading from "../AppLoading";
import { IProduto } from "@/interfaces/IProduto";
import { IUser } from "@/interfaces/IUser";
import { UserOutlined } from "@ant-design/icons";

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

// Nova interface para imagem do produto (simplificada)
interface IProdutoImagem {
  id: string;
  imagem_url: string;
  ordem?: number;
}


interface ProfileStructureProps {
  isLoading: boolean;
  navTitle: string;
  title: string;
  user?: IUser | null;
  produto?: IProduto | null;
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
  user = undefined,
  produto = undefined,
  menuButtons,
  children,
}) => {
  const router = useRouter();

  // Função para pegar a imagem mais recente do produto (baseada no 'ordem' ou última imagem)
  const getLatestProductImage = (): string | undefined => {
    if (!produto || !produto.imagens || produto.imagens.length === 0) return undefined;

    // Tenta ordenar pela propriedade ordem, se existir
    const imagensOrdenadas = [...produto.imagens].sort((a, b) => {
      if (a.ordem == null) return 1;
      if (b.ordem == null) return -1;
      return a.ordem - b.ordem;
    });

    return imagensOrdenadas[0].imagem_url;
  };

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <PageTitle hasBackButton navTitle={navTitle} title={title} />

        {produto ? (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-darkModal rounded-full w-[300px] h-[300px] my-4 relative overflow-hidden">
              {getLatestProductImage() ? (
                <Image
                  src={getLatestProductImage()!}
                  alt={produto.nome}
                  className="object-cover rounded-full"
                  fill
                  sizes="300px"
                />
              ) : (
                <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center text-gray-500">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="w-full px-4">
              <table className="table-auto w-full text-left text-sm">
                <tbody>
                  <tr>
                    <th className="pr-4 font-semibold">Nome</th>
                    <td>{produto.nome}</td>
                  </tr>
                  <tr>
                    <th className="pr-4 font-semibold">Preço</th>
                    <td>R$ {produto.preco}</td>
                  </tr>
                  <tr>
                    <th className="pr-4 font-semibold">Qtd. Imagens</th>
                    <td>{produto.imagens.length}</td>
                  </tr>
                  <tr>
                    <th className="pr-4 font-semibold">Data da Imagem 1</th>
                    <td>
                      {produto.imagens[0]?.ordem
                        ? new Date(produto.imagens[0].ordem * 1000).toLocaleDateString("pt-BR")
                        : "Sem data"}
                    </td>
                  </tr>
                  <tr>
                    <th className="pr-4 font-semibold">Estoque</th>
                    <td>{produto.estoque}</td>
                  </tr>
                  <tr>
                    <th className="pr-4 font-semibold">Status</th>
                    <td>{produto.ativo ? "Ativo" : "Inativo"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          user && (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-darkModal rounded-full my-8">
                {user?.id && (
                  user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="Foto"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div
                      className="bg-gray-300 w-64 h-64 rounded-full flex items-center justify-center text-gray-500"
                    >
                      <UserOutlined className="text-4xl" />
                    </div>
                  )
                )}
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl  xl:text-4xl font-extrabold tracking-tight text-textoSeparador">
                  {user.first_name}</h1>
                <hr className="border-t border-primary mb-1" />
                <h3 className="text-2xl sm:text-2xl  xl:text-3xl  tracking-tight text-textoSeparador">

                  {user.perfis?.map((perfil) => perfil.nome).join(", ")}
                </h3>
                <h2>{user.phone}</h2>
              </div>
            </div>
          )

        )}

        <hr className="border-t border-primary mb-1" />

        {menuButtons.map((button) => (
          <React.Fragment key={button.title}>
            <Button
              type={button.isActive ? "primary" : "default"}
              block
              size="large"
              className={`mb-1 h-[60px] uppercase text-md ${button.isActive ? "border-2 border-primary " : "font-bold"
                }`}
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
            <hr className="border-t border-primary mb-1" />
          </React.Fragment>
        ))}
      </div>

      <div className="lg:col-span-10 max-h-[calc(100vh-122px)] overflow-y-auto">
        {isLoading ? <AppLoading /> : <>{children}</>}
      </div>
    </div>
  );
};

export default React.memo(ProfileStructure);
