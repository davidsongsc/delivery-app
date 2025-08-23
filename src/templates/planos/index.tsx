import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { Layout, Menu, Card, Button, Tooltip, Spin } from 'antd';
import { DollarOutlined, CheckOutlined, CloseOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { usePlanStore } from '@/store/planosStore';
import './styles.css';

import FinalCTASection from '@/components/MiniComponents/Section/FinalAction';
import { useAllCorporations } from '@/hooks/useCorporations';
import { useRouter } from 'next/navigation';
import ClientsGrid from '@/components/MiniComponents/ClienteCard';
const { Content } = Layout;


const Planos: NextPage = () => {
  const { planos, featuresGlobais } = usePlanStore();
  const { corporations } = useAllCorporations();
  return (
    <>
      <Content className='flex flex-col gap-4 py-2'>
        <section className="max-w-4xl mx-auto text-center px-s mb-2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tecnologia e Serviço de Qualidade</h1>
          <p className="text-gray-600 text-lg">
            Fornecemos soluções digitais sob medida para impulsionar seu negócio.
          </p>
        </section>

        <section id="plans" className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Nossos Planos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 container">

            {planos.map((plan) => {
              const getNumericPrice = (price: string) => {
                const numbersOnly = price.replace(/\D/g, '');
                return parseInt(numbersOnly || '0', 10);
              };

              const isSobDemanda = getNumericPrice(plan.price) === 0;

              return (
                <Card
                  key={plan.name}
                  className="rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out card py-2"
                  actions={[
                    isSobDemanda ? (
                      <Button
                        type="primary"
                        icon={
                          <WhatsAppOutlined style={{ color: '#25D366', scale: 1.8, transform: 'translateY(2px)' }} />
                        }
                        key="whatsapp"
                        href="https://wa.me/21958725380" // <-- coloque seu número de WhatsApp com DDI
                        target="_blank"
                        className='bg-green-600 hover:bg-green-700'
                      >

                      </Button>
                    ) : (
                      <Button type="primary" icon={<DollarOutlined />} key="buy">
                        Assinar
                      </Button>
                    ),
                  ]}
                >
                  <div className="text-sm font-semibold mb-2">
                    {plan.tag && (
                      <span
                        className={`text-${plan.tagColor}-600 bg-${plan.tagColor}-100 px-2 py-1 rounded-md`}
                      >
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>

                  <ul className="mt-2 space-y-2">
                    {featuresGlobais.map((feature, index) => {
                      const included = plan.features.includes(feature);
                      return (
                        <li
                          key={index}
                          className={`flex items-center ${included ? 'text-gray-700' : 'text-gray-400 line-through'
                            }`}
                        >
                          {included ? (
                            <CheckOutlined className="text-green-500 mr-2" />
                          ) : (
                            <CloseOutlined className="text-red-400 mr-2" />
                          )}
                          {feature}
                        </li>
                      );
                    })}
                  </ul>

                  <p className="text-sm text-gray-500 mt-4">{plan.observations}</p>

                  <p className="text-2xl font-bold text-blue-600 mt-4">
                    {isSobDemanda ? 'Sob demanda' : plan.price}
                  </p>
                </Card>
              );
            })}

          </div>
        </section>
        <FinalCTASection />
        <ClientsGrid corporations={corporations} />
      </Content>


    </>
  );
};

export default React.memo(Planos);
