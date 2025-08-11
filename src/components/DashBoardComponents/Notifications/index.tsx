// components/Notification.tsx
'use client';

import { useEffect, useRef } from 'react';
import { notification } from 'antd';
import { useNotifications } from '@/hooks/useNotification';
import { IUser } from '@/interfaces/IUser';

interface NotificationProps {
    user: IUser;
}

export default function Notification({ user }: NotificationProps) {
    const { notifications } = useNotifications(user.id);
    const displayed = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!notifications.length) return;

        // Exibe só notificações novas, evitando repetição
        notifications.forEach((notif) => {
            const id = `${notif.remetente_id}-${notif.titulo}-${notif.corpo}`;
            if (!displayed.current.has(id)) {
                notification.info({
                    message: notif.titulo || 'Nova notificação',
                    description: notif.corpo,
                    placement: 'topRight',
                    duration: 5,
                });
                displayed.current.add(id);
            }
        });
    }, [notifications]);

    return null; // componente só dispara notificações, não renderiza nada
}
