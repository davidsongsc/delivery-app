import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const features = [
  { label: 'Agendamento online', ours: true, others: false },
  { label: 'Painel de controle intuitivo', ours: true, others: false },
  { label: 'Suporte humanizado 24/7', ours: true, others: false },
  { label: 'Relatórios de desempenho', ours: true, others: true },
  { label: 'Integração com WhatsApp', ours: true, others: false },
  { label: 'Cancelamento sem burocracia', ours: true, others: false },
];

export default function ComparisonSection() {
  return (
    <section className="w-full py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Por que escolher nosso sistema?</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="px-6 py-4">Funcionalidade</th>
                <th className="px-6 py-4">Nosso Sistema</th>
                <th className="px-6 py-4">Outros</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-6 py-4 font-medium">{feature.label}</td>
                  <td className="px-6 py-4">
                    {feature.ours ? (
                      <CheckCircleOutlined className="text-green-500 text-xl" />
                    ) : (
                      <CloseCircleOutlined className="text-red-400 text-xl" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {feature.others ? (
                      <CheckCircleOutlined className="text-green-500 text-xl" />
                    ) : (
                      <CloseCircleOutlined className="text-red-400 text-xl" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
