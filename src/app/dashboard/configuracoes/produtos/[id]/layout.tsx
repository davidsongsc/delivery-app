"use client";
import { ProdutoProvider } from "@/contexts/ProdutoContext";
import { useProduto } from "@/hooks/useProduct";
import { useParams, usePathname, useRouter } from "next/navigation";
import ProfileStructure from "@/components/ProfileStructure";
import { Button } from "antd";
import DeleteInColumn from "@/components/DeleteInColumn";
import { produtosService } from "@/services/product.service";
import { useAuth } from "@/contexts/AuthContext";
import getUserPermissions from "@/utils/permissions";
import { useCallback, useMemo, useState } from "react";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";

export default function ProdutosEditLayout({ children }: { children: React.ReactNode }) {
    const { id } = useParams<{ id: string }>();
    const { produto, produtoLoading, produtoRefresh } = useProduto({ id });
    const [submitHandler, setSubmitHandler] = useState<(() => void) | null>(null);

    const pathname = usePathname();
    const router = useRouter();
    const { user: authUser } = useAuth();
    const permissions = getUserPermissions(authUser);
    const isEditingRoute = pathname === `/dashboard/configuracoes/produtos/${id}/editar`;

    const handleNovoProduto = () => router.push("/dashboard/configuracoes/produtos/cadastrar");

    const registerSubmitHandler = useCallback((fn: () => void) => {
        setSubmitHandler(() => fn);
    }, []);

    const onSave = useCallback(() => {
        if (submitHandler) submitHandler();
    }, [submitHandler]);

    const providerValue = useMemo(() => ({
        produto,
        produtoLoading,
        produtoRefresh,
        permissions,
        registerSubmitHandler,
    }), [produto, produtoLoading, produtoRefresh, permissions, registerSubmitHandler]);

    return (
        <ProdutoProvider value={providerValue}>
            <ProfileStructure
                isLoading={produtoLoading}
                produto={produto}
                navTitle="Produtos > Editar"
                title={produto?.nome ?? "Editar Produto"}
                menuButtons={[
                    { title: "Informações", link: `/dashboard/configuracoes/produtos/${id}/editar`, isActive: pathname === `/dashboard/configuracoes/produtos/${id}/editar` },
                    { title: "Salvar", isActive: pathname === `/dashboard/configuracoes/produtos/${id}/opcoes`, onClick: onSave },
                    { title: "Cadastrar Novo", link: `/dashboard/configuracoes/produtos/${id}/editar`, isActive: pathname === `/dashboard/configuracoes/produtos/cadastrar` },
                ]}
            >
                {children}

                {isEditingRoute && produto && (
                    <SectionSeparator title="Area Gerencial" expanded={false}>
                        <DeleteInColumn
                            id={id}
                            service={produtosService}
                            refresh={produtoRefresh}
                            title={"Deletar produto?"}
                            span="Deletar produto"
                            permissions={permissions}
                        />
                    </SectionSeparator>
                )}
            </ProfileStructure>
        </ProdutoProvider>
    );
}
