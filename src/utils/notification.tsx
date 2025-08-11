import { notification } from 'antd';
import React from 'react';

export function showChangesNotification(title: string, changesText: string) {
  const lines = changesText.split('\n').filter(Boolean);
  
  notification.warning({
    message: title,
    description: (
      <div style={{ whiteSpace: 'pre-line' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            {line}
          </div>
        ))}
      </div>
    ),
    duration: 8,
  });
}
