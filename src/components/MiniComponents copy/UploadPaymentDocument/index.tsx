import React, { useState, useCallback } from "react";
import { Form, Upload, Button, Modal, List, App } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { UploadFile } from "antd/es/upload";
import { salePaymentMethodService } from "@/services/sale-payment-method.service";
import { salesStudentPayment } from "@/services/sales-student-payments";
interface UploadPaymentDocumentProps {
    dataPayment?: {
        paymentMethodId: string | null;
        saleId: string | undefined;
        value: number;
    };
    onUploadSuccess?: (id: string) => void;
    onRemoveRequest?: () => Promise<void>;
}
interface CustomUploadFile extends UploadFile {
    id?: string;
    url?: string;
}
const UploadPaymentDocument: React.FC<UploadPaymentDocumentProps> = ({
    dataPayment,
    onUploadSuccess,
    onRemoveRequest
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notification } = App.useApp();
    const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
    const [idDoc, setIdDoc] = useState<string>('');

    const handleChange = useCallback((info: any) => {
        setFileList(info.fileList);
    }, [setFileList]);

    const handleRemoveFile = useCallback(
        async (uid: string) => {
            const fileToRemove = fileList.find(f => f.uid === uid);

            if (!fileToRemove) return;
            if (idDoc) {
                try {
                    await salesStudentPayment.remove(idDoc);
                    notification.success({ message: "Arquivo removido!" });
                    onRemoveRequest?.();
                } catch (e) {
                    notification.error({ message: "Erro ao remover arquivo!" });
                } finally {
                    setFileList([]);
                    setIdDoc('');
                }
            }
        },
        [fileList, idDoc, onRemoveRequest]
    );
    const removeFile = useCallback((fileUid: string) => {
        setFileList((prevList) => prevList.filter((file) => file.uid !== fileUid));
    }, [setFileList]);

    return (
        <Form.Item
            className="col-span-6"
            name="document"
            label="Anexar aqruivo"
        >
            <div className="w-full bg-darkBg rounded-md flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <Upload
                        maxCount={1}
                        customRequest={async (options) => {
                            const { file, onSuccess, onError } = options;

                            try {
                                if (!dataPayment) {
                                    throw new Error("ID do método de pagamento ou da venda não informado.");
                                }

                                const response = await salesStudentPayment.create(
                                    {
                                        sales_payment_method_id: dataPayment.paymentMethodId as string,
                                        sale_id: dataPayment.saleId as string,
                                        value: dataPayment.value,
                                        installment: 1,
                                    },
                                    file as File
                                );

                                const uploadedPayment = response?.data.saleStudentPayment;

                                setIdDoc(response?.data.saleStudentPayment.id);
                                onUploadSuccess?.(response.data.saleStudentPayment.id);
                                notification.success({
                                    message: "Arquivo enviado com sucesso!",
                                    description: `Comprovante de R$ ${dataPayment.value} enviado com sucesso!`,
                                });

                                setFileList([
                                    {
                                        ...(file as UploadFile),
                                        status: 'done',
                                        uid: (file as UploadFile).uid,
                                        name: (file as UploadFile).name,
                                        id: uploadedPayment.id,
                                        url: uploadedPayment.url,
                                    },
                                ]);


                                onSuccess?.({}, file as any);
                            } catch (error: any) {
                                notification.error({
                                    message: "Erro ao enviar arquivo.",
                                    description: error?.response?.data?.message || error.message,
                                });
                                onError?.(error);
                                console.error("Erro ao enviar arquivo:", error);
                            }
                        }}

                        listType="picture"
                        fileList={fileList}
                        onChange={handleChange}
                        showUploadList={false}
                        accept="image/*"
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith("image/");
                            if (!isImage) {
                                notification.warning({
                                    message: "Arquivo inválido",
                                    description: "Apenas arquivos de imagem são permitidos.",
                                });
                            }
                            return isImage || Upload.LIST_IGNORE;
                        }}
                        itemRender={(originNode, file) => (
                            <div className="text-red-500">
                                {originNode}
                                <span className="ml-2">(Substituirá o arquivo atual)</span>
                            </div>
                        )}
                    >
                        <Button icon={<UploadOutlined />} />
                    </Upload>


                    {fileList.length > 0 && (
                        <div className="flex gap-2">
                            {fileList.slice(0, 1).map((file) => (
                                <div key={file.uid} className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-md text-sm text-white">
                                    {file.name}
                                    <CloseOutlined
                                        className="cursor-pointer text-red-400 hover:text-red-600"
                                        onClick={() => handleRemoveFile(file.uid)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <Modal
                title="Documentos Selecionados"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <List
                    bordered
                    dataSource={fileList}
                    renderItem={(file) => (
                        <List.Item>
                            {file.name}
                            <CloseOutlined
                                className="cursor-pointer text-red-400 hover:text-red-600 ml-auto"
                                onClick={() => removeFile(file.uid || "")}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </Form.Item>
    );
};

export default UploadPaymentDocument;