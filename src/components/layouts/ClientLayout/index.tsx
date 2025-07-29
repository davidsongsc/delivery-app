'use client';

import { ConfigProvider, App as AntdApp, Layout, Spin } from "antd";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { useEffect, useMemo } from "react";
import ptBR from "antd/locale/pt_BR";
import { AuthProvider } from "@/contexts/AuthContext";


const fullConfig = resolveConfig(tailwindConfig);
const theme = {
    token: {
        //colorPrimary: fullConfig.theme?.colors?.d_am_acento || "#7D1E2E",
        //colorBgBase: fullConfig.theme?.colors?.grafite || "#1C1C1E",
        //colorTextBase: fullConfig.theme?.colors?.gelo || "#F5F5F5",
        //colorText: fullConfig.theme?.colors?.gelo || "#F5F5F5",
        borderRadius: 8,
    },
    components: {
        Layout: {
            colorBgContainer: fullConfig.theme?.colors?.grafite || "#1C1C1E",
        },

        Input: {
            // colorBgContainer: fullConfig.theme?.colors?.aço || "#1C1C1E",
        }
    },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const config = useMemo(() => resolveConfig(tailwindConfig), []);

    return (<ConfigProvider
        locale={ptBR}
        theme={{
            token: {
                colorPrimary: config.theme.colors.primary,
                colorBgBase: config.theme.colors.darkBg,
                colorBorder: config.theme.colors.darkModal,
                colorBgContainer: config.theme.colors.darkBg,
                colorBgLayout: config.theme.colors.darkBg,
                colorTextBase: config.theme.colors.darkTexto,
                colorBgElevated: config.theme.colors.darkModal,
            },
            components: {
                Layout: {
                    headerBg: config.theme.colors.darkModal,
                },
                Button: {
                    colorPrimary: config.theme.colors.btnPrimary, // cor do botão primário (fundo)
                    colorTextLightSolid: config.theme.colors.darkTexto, // cor do texto do botão primário
                    colorPrimaryHover: config.theme.colors.btnHoverPrimary, // hover
                    colorPrimaryActive: config.theme.colors.btnActivePrimary, // clique
                    colorPrimaryBorder: config.theme.colors.btnPrimary, // borda primária
                    colorBorder: config.theme.colors.btnPrimary, // borda padrão
                    defaultBg: config.theme.colors.darkModal, // cor de fundo do botão default
                    defaultColor: config.theme.colors.darkTexto, // cor do texto do botão default
                    defaultHoverBg: config.theme.colors.btnHoverPrimary, // hover botão default
                    defaultHoverColor: config.theme.colors.darkTextoDescricaoOff,
                    defaultActiveBg: config.theme.colors.btnActivePrimary, // click no botão default
                    defaultActiveColor: config.theme.colors.darkTexto,
                },
                Tag: {
                    colorSuccess: config.theme.colors.sistemaGreen,
                    colorSuccessBg: config.theme.colors.transparent,
                    colorSuccessBorder: config.theme.colors.transparent,
                    colorWarning: config.theme.colors.sistemaYellow,
                    colorWarningBg: config.theme.colors.transparent,
                    colorWarningBorder: config.theme.colors.transparent,
                },
                Menu: {
                    itemBg: config.theme.colors.darkBg,
                    darkItemSelectedBg: config.theme.colors.darkModal,
                    darkItemBg: config.theme.colors.darkModal,
                    darkSubMenuItemBg: config.theme.colors.darkModal,
                    darkItemHoverBg: config.theme.colors.darkSelecao,
                    darkItemSelectedColor: config.theme.colors.primary,
                    darkPopupBg: config.theme.colors.darkModal,
                },
                Table: {
                    colorBgContainer: config.theme.colors.darkModal,
                    colorBgLayout: config.theme.colors.darkModal,
                    colorBorder: config.theme.colors.darkModal,
                    colorBorderSecondary: config.theme.colors.darkModal,
                },

                Select: {
                    optionSelectedBg: config.theme.colors.darkSelecao,
                    optionSelectedColor: config.theme.colors.darkTextoDescricaoOff,
                    colorBgElevated: config.theme.colors.darkBg,
                },
                Input: {
                    colorBgContainer: config.theme.colors.darkBg,
                    colorBgLayout: config.theme.colors.darkBg,
                    colorBorder: config.theme.colors.darkModal,
                    colorBorderSecondary: config.theme.colors.darkModal,
                    hoverBorderColor: config.theme.colors.darkModal,
                    activeBorderColor: config.theme.colors.darkBg,
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
                        {children}
                    </AuthProvider>
                </Layout.Content>
            </Layout>
        </AntdApp>
    </ConfigProvider>)

}
