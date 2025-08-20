import React from 'react';
import { NextPage } from 'next';
import { Layout, Menu, Card, Button, Tooltip, Spin } from 'antd/es';
import './styles.css';
import HeroSection from '@/components/MiniComponents/Section/HeroSection';
import UseCasesSection from '@/components/MiniComponents/Section/UseCase';
import TestimonialsSection from '@/components/MiniComponents/Section/Testimonials';
import ComparisonSection from '@/components/MiniComponents/Section/Comparation';
import FAQSection from '@/components/MiniComponents/Section/Faq';
import FinalCTASection from '@/components/MiniComponents/Section/FinalAction';

const { Header, Content, Footer } = Layout;

const featureList = [
  'Cardápio Digital',
  'Controle de Estoque',
  'Pagamentos Online',
  'Caixa',
  'Painel de controle',
  'Colaboradores Ilimitados',
  'Publicidade',
  'Marketing Digital',
  'Suporte dedicado',
  'Toten de Autoatendimento',
  'Acesso total',
  'Suporte premium',
  'Customizações',
  'PDV (Ponto de Venda)',
  'KDS (Kitchen Display System)',

];

const plans = [
  {
    name: 'Start',
    price: 'R$ 49,90',
    tag: 'Mais em conta',
    tagColor: 'green',
    features: ['Cardápio Digital', 'Controle de Estoque', 'Pagamentos Online'],
    observations: 'Ideal para uso individual ou testes iniciais. Você pode alterar ou cancelar a qualquer momento.',
  },
  {
    name: 'Básico',
    price: 'R$ 79,90',
    tag: '',
    tagColor: '',
    features: ['Cardápio Digital', 'Controle de Estoque', 'Pagamentos Online', 'Caixa', 'Painel de controle', 'Colaboradores Ilimitados', 'Suporte dedicado', 'Publicidade',
      'Marketing Digital',],
    observations: 'Ideal para uso individual ou testes iniciais. Você pode alterar ou cancelar a qualquer momento.',
  },
  {
    name: 'Profissional',
    price: 'R$ 89,90',
    tag: 'Recomendado',
    tagColor: 'blue',
    features: ['Cardápio Digital',
      'Controle de Estoque',
      'Pagamentos Online',
      'Caixa',
      'Painel de controle',
      'Colaboradores Ilimitados',
      'Suporte dedicado',
      'Toten de Autoatendimento',
      'Publicidade',
      'Marketing Digital',
    ],
    observations: 'Perfeito para equipes pequenas e médias. Contrato minimo de 12 meses com opção de prorrogação.',
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    tag: 'Plano personalizado',
    tagColor: 'orange',
    features: [...featureList],
    observations: 'Solução completa para empresas de grande porte.',
  },
];


const Home: NextPage = () => {

  return (
    <>
      <Content >
        <HeroSection />
        <UseCasesSection />
        <div className='grid grid-cols-2 gap-4'>
          <ComparisonSection />
          <FAQSection />
        </div>

        <TestimonialsSection />
        <FinalCTASection />
      </Content>
    </>
  );
};

export default React.memo(Home);
