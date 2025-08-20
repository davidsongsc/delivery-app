'use client';
import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { jobFeatures } from '@/enum/features.enum';


export default function ComparisonSection() {
  return (
    <section className="w-full bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6 py-20 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Por que empresas confiam em nós</h2>

        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-6 py-4 text-left">Funcionalidade</th>
                <th className="px-6 py-4 text-center">Nosso Sistema</th>
                <th className="px-6 py-4 text-center">Outros</th>
              </tr>
            </thead>
            <tbody>
              {jobFeatures.map((feature, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-medium">{feature.label}</td>
                  <td className="px-6 py-4 text-center">
                    {feature.ours ? (
                      <CheckCircleOutlined className="text-green-600 text-2xl" />
                    ) : (
                      <CloseCircleOutlined className="text-red-500 text-2xl" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.others ? (
                      <CheckCircleOutlined className="text-green-600 text-2xl" />
                    ) : (
                      <CloseCircleOutlined className="text-red-500 text-2xl" />
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
