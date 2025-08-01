'use client';
import ProfileStructure from "@/components/ProfileStructure";
import { IPerfil } from "@/interfaces/IPerfil";
import { profileService } from "@/services/profile.service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profile, setProfile] = useState<IPerfil | null>(null);

    const { id } = useParams<{ id: string }>();
    const fetchProfile = useCallback(() => {
        setLoadingProfile(true);
        profileService
            .getById(id)
            .then(data => setProfile(data))
            .finally(() => setLoadingProfile(false));
    }, [id]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <>
            <div className="container w-7xl">
                <ProfileStructure
                    isLoading={loadingProfile}
                    navTitle="Sistema > Perfis"
                    title="Editar Perfil"
                    menuButtons={[
                        {
                            title: 'Perfil',
                            link: `/dashboard/configuracoes/permissoes/${id}/editar`,
                            isActive: true,
                        },
                        {
                            title: 'Tipo',
                            link: `/dashboard/configuracoes/permissoes/${id}/tipo`,
                            isActive: true,
                        },
                    ]}
                >
                    {children}
                </ProfileStructure>
            </div>

        </>)
}
