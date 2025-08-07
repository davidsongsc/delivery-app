'use client';
import React from 'react';
import { Upload, Modal, Form } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

const UploadWithPreview = ({ form, permissions }: any) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="col-span-12 md:col-span-6 bg-darkBg p-4 rounded-lg">
      <Form.Item
        label={<h3 className="font-bold text-xl">Imagens:</h3>}
        name="imagens"
        valuePropName="fileList"
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
      >
        <Upload
          listType="picture-card"
          beforeUpload={() => false}
          multiple
          accept="image/*"
          onPreview={handlePreview}
          disabled={!permissions?.includes('produtos_editar_desconto')}
        >
          {permissions?.includes('produtos_editar_imagem') && (
            <div>
              <span>+ Upload</span>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default React.memo(UploadWithPreview);
