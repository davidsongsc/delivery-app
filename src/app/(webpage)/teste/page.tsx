'use client';

import { useState } from 'react';
import { Button, Input, List, Tag } from 'antd';
import { useTaskWebSocket, TaskMessage } from '@/hooks/useTaskWebSocket';

export default function TaskPage() {
  const tenantId = '2ec1d108-fee4-4480-ae22-12842034a0d0'; // Pode vir do estado global
  const { tasks, isConnected, sendTask } = useTaskWebSocket(tenantId);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState(''); // definir o id do usuário que receberá a task

  const handleCreateTask = () => {
    if (!newTaskTitle.trim() || !assigneeId) return;

    sendTask(newTaskTitle, newTaskTitle, assigneeId); // description = title
    setNewTaskTitle('');
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'done': return 'green';
      case 'in_progress': return 'blue';
      case 'pending': return 'orange';
      case 'overdue': return 'red';
      case 'canceled': return 'gray';
      default: return 'orange';
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Painel de Tasks</h1>

      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input
          style={{ width: 200 }}
          placeholder="Nova task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Input
          style={{ width: 200 }}
          placeholder="Assignee ID"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        />
        <Button type="primary" onClick={handleCreateTask} disabled={!isConnected}>
          Criar Task
        </Button>
      </div>

      <List
        bordered
        dataSource={tasks}
        renderItem={(task: TaskMessage) => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>
                <strong>{task.title}</strong> — {task.payload?.description || 'Sem descrição'}
              </span>
              <Tag color={statusColor(task.status)}>
                {task.status}
              </Tag>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
