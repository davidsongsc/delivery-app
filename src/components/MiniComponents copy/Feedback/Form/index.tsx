import React, { useCallback, useState } from "react";
import { Modal, Input, Button, Form, App } from "antd";
import FeedbackIcon from "../Icon";
import './styles.css';
import { feedbackService } from "@/services/feedback.service";


interface FeedBackModalProps {
    open: boolean;
    onCancel: () => void;
}

const FeedBackModal: React.FC<FeedBackModalProps> = ({ open, onCancel }) => {
    const { TextArea } = Input;
    const { notification } = App.useApp();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const submitData = useCallback(() => {
        if (isLoading) return;

        form
            .validateFields()
            .then((values) => {
                setIsLoading(true);

                feedbackService
                    .create(values)
                    .then(() => {
                        notification.success({
                            message: "Feedback enviado com sucesso!",
                        });
                        form.resetFields();
                        onCancel();

                    })
                    .catch((e) => {
                        notification.error({
                            message: `Erro ao enviar feedback: ${e.response?.data?.message || 'Erro desconhecido'}`,
                        });
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch((error) => {
                if (error.errorFields) {
                    notification.error({
                        message: "Campos obrigatórios não preenchidos",
                        description: "Verifique o campo de mensagem e tente novamente.",
                        duration: 8,
                    });
                }
            });
    }, [form, isLoading]);


    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closable
            width={600}
        >
            <div className="bg-darkModal  modal-feedback p-4">
                <div className="mb-4 ">
                    <FeedbackIcon width={36} height={30} />
                    <h3>Seu feedback é essencial!</h3>
                    <h4>Deixe aqui sua sugestão ou crítica.</h4>
                    <h5>Diretrizes:</h5>

                    <ul className="mb-4 text-sm text-gray-300">
                        <li>•Sua privacidade é garantida: não coletamos dados pessoais, informações do seu dispositivo ou localização.</li>
                        <li>•Você pode acessar esta página de qualquer computador ou celular, garantindo total anonimato, se desejar.</li>
                        <li>•Sua mensagem será enviada diretamente ao CEO da empresa e não será acessada por nenhum outro colaborador.</li>
                    </ul>
                </div>

                <Form form={form} layout="vertical" onFinish={submitData}>
                    <Form.Item
                        name="message"
                        rules={[
                            { required: true, message: "Por favor, escreva seu feedback." },
                            { max: 1000, message: "Limite de 1000 caracteres." },
                        ]}
                    >
                        <TextArea
                            placeholder="Escreva sua mensagem aqui..."
                            rows={5}
                            maxLength={1000}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Enviar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default React.memo(FeedBackModal);
