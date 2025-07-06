'use client';

import { ConfigProvider, App as AntdApp, Layout, Spin } from "antd";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import { useEffect } from "react";
import { usePlanStore } from "@/store/planosStore";


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

    return (<ConfigProvider theme={theme}>
        <AntdApp>
            <Layout className="flex-row">
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </AntdApp>
    </ConfigProvider>)

}
