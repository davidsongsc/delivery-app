'use client';

import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Caixa = () => {
    return (
        <Card bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
            <Typography>
                <Title level={2}>Instruções do Caixa</Title>
                <Paragraph>
                    Esta seção é dedicada ao controle de caixa da unidade. Aqui você poderá visualizar
                    instruções sobre procedimentos operacionais, como abertura e fechamento de caixa, registro de
                    movimentações e controle de valores.
                </Paragraph>
                <Paragraph>
                    Certifique-se de registrar corretamente todas as entradas e saídas para manter a
                    consistência dos dados financeiros.
                </Paragraph>
                <Paragraph>
                    Caso tenha dúvidas, consulte o responsável financeiro ou acesse o manual do sistema.
                </Paragraph>
            </Typography>
        </Card>
    );
};

export default Caixa;
