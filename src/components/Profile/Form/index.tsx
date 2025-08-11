import { Form, Input, FormInstance, Select, Collapse, Switch, Modal, Button } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { IPerfil, IPermissao } from '@/interfaces/IPerfil';
import { useProfileTypes } from '@/hooks/useProfileTypes';
import agruparPermissoes from '@/utils/agruparPermissoes';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { usePermissions } from '@/hooks/usePermissions';

const { Panel } = Collapse;

interface Permission {
  id: number;
  codigo: string;
  nome: string;
}

interface ProfileFormProps {
  form: FormInstance<IPerfil>;
  isEditing?: boolean;
}

const actionIcons = {
  criar: <PlusOutlined />,
  visualizar: <EyeOutlined />,
  editar: <EditOutlined />,
  deletar: <DeleteOutlined />,
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  isEditing = false,
}) => {
  const filters = useMemo(() => ({}), []);
  const { tipos, tiposLoading } = useProfileTypes({ page: 1, limit: 100, filters });
  const { permissions } = usePermissions({ page: 1, limit: 100, filters });
  const grupos = agruparPermissoes(permissions);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupSwitches, setGroupSwitches] = useState<Record<string, boolean>>({});

  const getActionFromCode = (codigo: string) => {
    if (codigo.includes('criar') || codigo.includes('create')) return 'criar';
    if (codigo.includes('visualizar') || codigo.includes('view')) return 'visualizar';
    if (codigo.includes('editar') || codigo.includes('update') || codigo.includes('put')) return 'editar';
    if (codigo.includes('deletar') || codigo.includes('delete') || codigo.includes('remove')) return 'deletar';
    return null;
  };
  const openModal = (group: string) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGroup(null);
  };

  const toggleGroupSwitch = (group: string, checked: boolean) => {
    setGroupSwitches(prev => ({ ...prev, [group]: checked }));
  };

  const handleSwitchChange = useCallback((checked: boolean, group: string) => {
    setGroupSwitches(prev => ({ ...prev, [group]: checked }));
  }, []);

  const handleSwitchClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      {/* Campos de nome, tipos e descrição */}
      <div className="grid grid-cols-12 gap-x-4">
        <Form.Item
          name="nome"
          label={<span className="font-bold">Nome do Cargo:</span>}
          className="col-span-12 md:col-span-6"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Nome do perfil/cargo" />
        </Form.Item>

        <Form.Item
          name="tipos"
          label={<span className="font-bold">Tipos de Perfil:</span>}
          className="col-span-12 md:col-span-6"
          rules={[{ required: true, message: 'Selecione pelo menos um tipo' }]}
        >
          <Select
            mode="multiple"
            loading={tiposLoading}
            allowClear
            placeholder="Selecione um ou mais tipos"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children?.toString().toLowerCase() ?? '').includes(input.toLowerCase())
            }
          >
            {tipos.map((tipo) => (
              <Select.Option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="descricao"
          label={<span className="font-bold">Descrição:</span>}
          className="col-span-12"
        >
          <Input.TextArea rows={3} placeholder="Descreva a função do perfil..." />
        </Form.Item>
      </div>

      {/* Permissões com colunas e ícones */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {Object.entries(grupos).map(([group, subgroups]) => (
          <div
            key={group}
            style={{
              flex: '0 1 320px',
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 8,
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Button type="primary" onClick={() => openModal(group)}>Ver</Button>
              <div className='flex items-center justify-center' >
                <div style={{ fontSize: 24, color: '#1890ff', marginRight: 8 }}>
                  <svg width="24" height="24" fill="#1890ff" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase" style={{ margin: 0 }}>{group}</h3>
              </div>

              <div
                onClick={e => e.stopPropagation()}
              >
                <Switch

                  checked={groupSwitches[group] ?? true}
                  onChange={checked =>
                    setGroupSwitches(prev => ({ ...prev, [group]: checked }))
                  }
                />
              </div>


            </div>
          </div>
        ))}
      </div>

      {/* Modal para exibir subgrupos e permissões do grupo selecionado */}
      <Modal
        title={`Permissões do grupo: ${selectedGroup}`}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={750}
      >
        {selectedGroup && Object.entries(grupos[selectedGroup]).map(([subgroup, perms]) => {
          const permsByAction = {
            criar: perms.filter(p => getActionFromCode(p.codigo) === 'criar'),
            visualizar: perms.filter(p => getActionFromCode(p.codigo) === 'visualizar'),
            editar: perms.filter(p => getActionFromCode(p.codigo) === 'editar'),
            deletar: perms.filter(p => getActionFromCode(p.codigo) === 'deletar'),
          };

          return (
            <div key={subgroup} style={{ marginBottom: 24 }}>
              <h4 className='text-lg font-bold uppercase'>{subgroup}</h4>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {Object.entries(permsByAction).map(([action, permsArray]) => (
                  <div
                    key={action}
                    className='flex flex-col items-center border border-gray-200 rounded-lg p-4 w-1/8'
                  >
                    <div style={{ fontSize: 28, color: '#1890ff', marginBottom: 8 }}>
                      {actionIcons[action as keyof typeof actionIcons]}
                    </div>
                    <div style={{ fontWeight: '600', marginBottom: 12, textTransform: 'capitalize' }}>
                      {action}
                    </div>

                    <div className='w-28 flex flex-col gap-2 items-center justify-center'>
                      {permsArray.length ? (
                        permsArray.map((perm) => (
                          <Form.Item
                            name={['permissoes', perm.codigo]}
                            valuePropName="checked"
                            noStyle
                          >
                            <Switch />
                          </Form.Item>

                        ))
                      ) : (
                        <em style={{ fontSize: 12, color: '#999' }}>
                          Nenhuma permissão
                        </em>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Modal>

    </Form>
  );
};

export default React.memo(ProfileForm);
