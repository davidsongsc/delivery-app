'use client';

import React, { useCallback, useState } from 'react';
import { Form, Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
import ReservaClienteForm from '@/components/ReservasCliente/Form';
import { reservaService } from '@/services/reserva.service';
import { IReservasCreate } from '@/interfaces/IReservas';
import { ICorporation } from '@/interfaces/ICorporation';
interface ReservaClientePageProps {
    corporation: ICorporation | null
}

const ReservaClientePage: React.FC<ReservaClientePageProps> = ({ corporation }) => {
    const [form] = Form.useForm<IReservasCreate>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    console.log(corporation)
    const submitData = useCallback(() => {
        if (isLoading) return;
        form.validateFields().then(values => {
            setIsLoading(true);

            reservaService
                .create({
                    ...values,
                    mesa: null,
                    
                })
                .then(res => {
                    notification.success({
                        message: 'Reserva cadastrada com sucesso!',
                    });
                    router.push(`/reservas/confirmacao/${res.data.id}`);
                })
                .catch(e => {
                    const errorData = e.response?.data;
                    if (errorData && typeof errorData === 'object') {
                        Object.entries(errorData).forEach(([field, messages]) => {
                            if (Array.isArray(messages)) {
                                messages.forEach(msg => {
                                    notification.error({
                                        message: field,
                                        description: msg,
                                        duration: 5,
                                    });
                                });
                            }
                        });
                    } else {
                        notification.info({
                            message: 'Confira os dados',
                            description: 'Verifique os campos.',
                        });
                    }
                })
                .finally(() => setIsLoading(false));
        });
    }, [form, isLoading, router]);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Fazer Reserva</h1>
            <ReservaClienteForm form={form} />
            <Button
                type="primary"
                onClick={submitData}
                loading={isLoading}
                className="mt-4"
            >
                Reservar
            </Button>
        </div>
    );
}

export default React.memo(ReservaClientePage);