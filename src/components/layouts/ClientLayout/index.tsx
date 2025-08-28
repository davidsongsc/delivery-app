'use client';

import { ConfigProvider, App as AntdApp, Layout, Spin } from "antd/es";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { useEffect, useMemo } from "react";
import ptBR from "antd/locale/pt_BR";
import { AuthProvider } from "@/contexts/AuthContext";
import GlobalLoader from "@/components/ui/GlobalLoader";

import LoginModalIcon from "@/components/Login";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import './styles.css';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const config = useMemo(() => resolveConfig(tailwindConfig), []);
    return (<ConfigProvider
        locale={ptBR}
        theme={{
            token: {
                colorPrimary: config.theme.colors.primary,
                colorBgBase: config.theme.colors.secondary,
                colorBorder: config.theme.colors.tertiary,
                colorBgContainer: config.theme.colors.secondary,
            },
            components: {
                Tag: {
                    colorSuccess: config.theme.colors.sistemaGreen,
                    colorSuccessBg: config.theme.colors.transparent,
                    colorSuccessBorder: config.theme.colors.transparent,
                    colorWarning: config.theme.colors.sistemaYellow,
                    colorWarningBg: config.theme.colors.transparent,
                    colorWarningBorder: config.theme.colors.transparent,
                },
                Menu: {
                    colorText: config.theme.colors.secondary,
                    colorItemText: config.theme.colors.secondary, 
                    colorItemTextSelected: config.theme.colors.secondary, 
                    colorItemBgSelected: config.theme.colors.primary, 
                    colorItemBgActive: config.theme.colors.primary,
                },

                Select: {
                    optionSelectedBg: config.theme.colors.darkSelecao,
                    optionSelectedColor: config.theme.colors.darkTextoDescricaoOff,
                    colorBgElevated: config.theme.colors.darkBg,
                },

                Notification: {
                    colorSuccess: config.theme.colors.sistemaGreen,
                    colorWarning: config.theme.colors.sistemaYellow,
                    colorError: config.theme.colors.sistemaRed,
                    colorInfo: config.theme.colors.sistemaBlue,
                    colorBgContainer: config.theme.colors.darkModal,
                },
            },
        }}
    >
        <AntdApp>
            <Layout className="flex-row">
                <Layout.Content>
                    <AuthProvider>
                        <LoginModalProvider>
                            <LoginModalIcon />

                            {children}
                            <GlobalLoader />
                        </LoginModalProvider>
                    </AuthProvider>
                </Layout.Content>
            </Layout>
        </AntdApp>
    </ConfigProvider>)

}
