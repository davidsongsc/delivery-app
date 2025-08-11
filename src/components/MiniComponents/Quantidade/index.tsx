import React from 'react';
import { Tag } from 'antd';

interface QuantidadeProps {
  valor: number;
  className?: string;
}

const Quantidade: React.FC<QuantidadeProps> = ({ valor, className }) => {
  let color = 'green';

  if (valor <= 10) color = 'red';
  else if (valor <= 20) color = 'orange';

  return (
    <Tag color={color} className={`${className} w-16 h-10 flex items-center justify-center text-xl `}>
      {valor}
    </Tag>
  );
};

export default Quantidade;
