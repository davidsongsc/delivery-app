import React, { useState, useCallback } from "react";
import { Form, Upload, Button, Modal, List, App } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { UploadFile } from "antd/es/upload";
import { saleCoursesDocumentationService } from "@/services/sale-courses-documentation.service";
import { ISaleCourseDocumentations } from "@/interfaces/ISaleCourseDocumentation";
import apiService from "@/services/api.service";

interface ISaleCourseDocumentationProps {
    dataDoc: ISaleCourseDocumentations;
    document?: string;
    iconSize?: number
}

const SaleCourseDocumentation: React.FC<ISaleCourseDocumentationProps> = ({ dataDoc, document = null, iconSize = 20 }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [documentId, setDocumentId] = useState<string>('');
    const { notification } = App.useApp();

    const handleChange = useCallback((info: any) => {
        const { fileList: newFileList } = info;

        if (newFileList.length > 1) {
            newFileList.splice(1);
        }
        setFileList(newFileList);
    }, []);

    const handleRemoveFile = useCallback(
        async (fileUid: string) => {
            try {
                const emptyFile = new File([""], "empty.txt", { type: "text/plain" });

                await saleCoursesDocumentationService.update(documentId, emptyFile);

                notification.success({ message: "Arquivo removido!" });
            } catch (e: any) {
                notification.error({
                    message: "Erro ao remover arquivo!",
                    description: e.response?.data?.message || "Erro inesperado.",
                });
            } finally {
                setFileList((prevList) => prevList.filter((file) => file.uid !== fileUid));
            }
        },
        [documentId]
    );

    const handlePreview = useCallback(() => {
        if (fileList.length > 0) {
            const file = fileList[0];
            const previewUrl =
                file.url ||
                file.thumbUrl ||
                (file.originFileObj && URL.createObjectURL(file.originFileObj));

            if (previewUrl) {
                setPreviewImage(previewUrl);
                setIsPreviewModalOpen(true);
            }
        }
    }, [fileList]);

    return (
        <Form.Item
            className="w-full "
            name="document"
        >
            <div className="w-full   flex flex-row justify-between ">
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-11 bg-darkBg rounded-md flex gap-2 flex-row items-center justify-between">
                        <div className="flex flex-row gap-4 items-center">
                            <Upload
                                customRequest={async (options) => {
                                    const { file, onSuccess, onError } = options;

                                    try {
                                        const formData = new FormData();
                                        formData.append("file", file as File);

                                        const response = await saleCoursesDocumentationService.update(dataDoc.student_documentation_id, file as File);
                                        setDocumentId(response.data.studentDocumentation.id);

                                        notification.success({
                                            message: dataDoc.studentDocumentation.default_documentation.name,
                                            description: "Documento enviado com sucesso!",
                                        });

                                        setFileList([{
                                            ...(file as UploadFile),
                                            status: "done",
                                            uid: (file as UploadFile).uid,
                                            name: (file as UploadFile).name,
                                        }]);
                                        onSuccess?.({}, file as any);
                                    } catch (error: any) {
                                        notification.error({
                                            message: "Erro ao enviar documento.",
                                            description: error?.response?.data?.message || error.message,
                                        });
                                        onError?.(error);
                                        console.error("erro Enviar Documento", error);
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
                            >
                                <Button className="scale-90">
                                    <Image
                                        src={
                                            fileList.length < 1
                                                ? "/images/icones/upload.svg"
                                                : "/images/icones/check.svg"
                                        }
                                        width={iconSize}
                                        height={iconSize}
                                        alt="Upload"
                                    />
                                </Button>
                            </Upload>


                            <Upload
                                customRequest={async (options) => {
                                    const { file, onSuccess, onError } = options;

                                    try {
                                        const formData = new FormData();
                                        formData.append("file", file as File);

                                        await saleCoursesDocumentationService.update(dataDoc.student_documentation_id, file as File);

                                        notification.success({
                                            message: dataDoc.studentDocumentation.default_documentation.name,
                                            description: "Documento enviado com sucesso!",
                                        });

                                        setFileList([{
                                            ...(file as UploadFile),
                                            status: "done",
                                            uid: (file as UploadFile).uid,
                                            name: (file as UploadFile).name,
                                        }]);
                                        onSuccess?.({}, file as any);
                                    } catch (error: any) {
                                        notification.error({
                                            message: "Erro ao enviar documento.",
                                            description: error?.response?.data?.message || error.message,
                                        });
                                        onError?.(error);
                                        console.error("erro Enviar Documento", error);
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
                            >
                                {fileList.length < 1 && (
                                    <div className="w-full text-darkTextoOff flex flex-row items-center justify-between">
                                        <span>{`Clique aqui para enviar...  ${dataDoc.studentDocumentation.default_documentation.name}`}</span>
                                    </div>
                                )}
                                {fileList.map((file) => (
                                    <div
                                        key={file.uid}
                                        className="flex items-center gap-2 py-1 rounded-md text-sm text-white"
                                    >
                                        {file.name} -{" "}
                                        <span className="col-span-8">
                                            {document} - {dataDoc.studentDocumentation.default_documentation.name}
                                        </span>
                                    </div>
                                ))}
                            </Upload>
                        </div>
                        <div>
                            {fileList.length > 0 && (
                                <>
                                    <Button
                                        className="relative right-2 bg-transparent border-none"
                                        type="default"
                                        onClick={() => setIsModalOpen(true)}
                                        size="small"
                                        icon={
                                            <Image
                                                src="/icones/reselect.svg"
                                                width={iconSize}
                                                height={iconSize}
                                                alt="Ver Selecionados"
                                            />
                                        }
                                    />

                                    <Button
                                        className="relative right-2 bg-transparent border-none"
                                        type="default"
                                        size="small"
                                        icon={
                                            <Image
                                                src="/icones/download.svg"
                                                width={iconSize}
                                                height={iconSize}
                                                alt="Ver Selecionados"
                                            />
                                        }
                                    />
                                </>
                            )}
                            {fileList.length < 1 && (
                                <Button
                                    className="relative right-2 bg-transparent border-none"
                                    type="default"
                                    size="small"
                                    title="Documento obrigatorio"
                                    icon={
                                        <Image
                                            src="/icones/exclamacao.svg"
                                            width={iconSize}
                                            height={iconSize}
                                            alt="Ver Selecionados"
                                        />
                                    }

                                />
                            )}
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-row gap-2 mx-2 ">
                        <Button
                            className="col-span-2 bg-darkBg rounded-md w-full flex items-center justify-center"
                            onClick={handlePreview}
                            title={`Visualizar ${dataDoc.studentDocumentation.default_documentation.name}`}
                            icon={
                                <Image
                                    src={fileList.length < 1 ? "/images/icones/eye-off.svg" : "/images/icones/eye.svg"}
                                    width={iconSize}
                                    height={iconSize}
                                    alt="Visualizar Selecionado"
                                />
                            }
                        >
                        </Button>
                        <Button
                            className="col-span-2 bg-darkBg rounded-md w-full flex items-center justify-center"
                            title={`Remover ${dataDoc.studentDocumentation.default_documentation.name}`}
                            onClick={() => {
                                if (fileList.length > 0) {
                                    handleRemoveFile(fileList[0].uid);
                                }
                            }}
                            icon={
                                <Image
                                    src="/images/icones/trash.svg"
                                    width={iconSize}
                                    height={iconSize}
                                    alt="Remover Selecionado"
                                    className={fileList.length < 1 ? "grayscale opacity-50" : ""}
                                />
                            }
                        >
                        </Button>
                    </div>
                </div>
            </div>
            <Modal
                open={isPreviewModalOpen}
                onCancel={() => setIsPreviewModalOpen(false)}
                footer={null}
                centered
                width={600}
            >
                {previewImage && (
                    <Image
                        src={previewImage}
                        alt="Preview"
                        width={500}
                        height={500}
                        className="w-full h-auto object-contain rounded"
                    />
                )}
            </Modal>

            <Modal
                title="Documento Selecionado"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <List
                    bordered
                    dataSource={fileList}
                    renderItem={(file) => {
                        const previewUrl = file.url || file.thumbUrl || (file.originFileObj && URL.createObjectURL(file.originFileObj));

                        return (
                            <List.Item className="flex items-center gap-2">
                                {previewUrl && (
                                    <Image
                                        src={previewUrl}
                                        alt={file.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                )}
                                <span className="flex-1">{file.name}</span>
                                <CloseOutlined
                                    className="cursor-pointer text-red-400 hover:text-red-600 ml-auto"
                                    onClick={() => handleRemoveFile(file.uid || "")}
                                />
                            </List.Item>
                        );
                    }}
                />

            </Modal>

        </Form.Item>
    );
};

export default React.memo(SaleCourseDocumentation);
