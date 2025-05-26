import React, { useState } from 'react';
import cortesData from '@/json/cortes.json';
import './style.css';
import { formatPhoneNumber } from '@/utils/phoneNumber';
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';

// Tipagens
type Agendamento = {
  cliente: string;
  telefone: string;
  data: string;       // Ex: "2025-05-20"
  horario: string;    // Ex: "14:00"
  barbeiro: string;
};

type Corte = {
  nomeCorte: string;
  imagem: string;
};

type Cliente = {
  cliente: string;
  nome: string;
  cortes: Corte[];
};

type Barbeiro = {
  barbeiro: string;
  nome: string;
  whatsapp: string;
  profileImage: string;
  atendimento: { dia: string; abertura: string; fechamento: string }[];
  clientes: Cliente[];
};

export default function Galeria() {
  const barbeiros: Barbeiro[] = cortesData;

  const [modalAberto, setModalAberto] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<Barbeiro | null>(null);

  const abrirModalAgendamento = (barbeiro: Barbeiro) => {
    setBarbeiroSelecionado(barbeiro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setBarbeiroSelecionado(null);
  };

  return (
    <div className="space-y-10 p-0 ">
      {modalAberto && barbeiroSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-grafite rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={fecharModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">
              Agendar com {barbeiroSelecionado.nome}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Seu nome:</label>
                <Input type="text" className="w-full border rounded px-3 py-2" required />
              </div>

              <div>
                <label className="block text-sm font-semibold">Telefone:</label>
                <Input type="text" className="w-full border rounded px-3 py-2" required />
              </div>

              <div>
                <label className="block text-sm font-semibold">Data:</label>
                <Input type="date" className="w-full border rounded px-3 py-2" required />
              </div>

              <div >
                <label className="block text-sm font-semibold">Horário:</label>
                <Select className="w-full border rounded px-3 py-2" >
                  <Option>10:00</Option>
                  <Option>10:30</Option>
                  <Option>11:00</Option>
                  <Option>... (preencher com base no horário de atendimento)</Option>
                </Select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Confirmar Agendamento
              </button>
            </form>
          </div>
        </div>
      )}

      {barbeiros.map((barbeiro) => (
        <div
          key={barbeiro.barbeiro}
          className=" bg-gradient-to-l from-[#CBA135] to-black rounded-lg shadow-md"
        >

          <div className='flex p-4'>
            <img
              src={barbeiro.profileImage}
              alt={barbeiro.nome}
              className="rounded-xl shadow-md w-1/12 h-32 object-cover"
            />
            <div className='border-r-2 pr-4 border-aço'>
              <h2 className="text-2xl text-left font-bold pt-4 pl-4">
                {barbeiro.nome}{' '}

              </h2>
              <h3 className="text-2xl font-bold  text-left pl-4 flex items-center gap-4">
                <FaInstagram />
                <a href={`https://www.instagram.com/${barbeiro.barbeiro}`} target='_blank' className="text-[12px]">(@{barbeiro.barbeiro})</a>
              </h3>
              <h4 className="text-2xl font-bold  text-left pl-4 flex items-center gap-4">
                <FaWhatsapp />
                <a href={`https://wa.me/${barbeiro.whatsapp}`} target='_blank' className=" text-[12px] ">  {formatPhoneNumber(barbeiro.whatsapp)}                </a>
              </h4>

            </div>
            <div className='flex gap-4 items-center pl-4 hidden sm:flex '>
              <div>Horarios:</div>
              {barbeiro.atendimento.map((horario, index) => (
                <div key={index}>
                  <p>{horario.dia}</p>
                  <p>{horario.abertura} </p>
                  <p>{horario.fechamento}</p>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => abrirModalAgendamento(barbeiro)}
                className="ml-4 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Agendar Corte
              </button>
            </div>
          </div>

          <div className="cortes space-x-6  p-4 bg-gradient-to-l from-[#2F2F31] to-black ">
            {barbeiro.clientes.map((cliente) => (
              <div key={cliente.cliente} className="min-w-[250px] ">


                <div className="space-y-4 mt-2">
                  {cliente.cortes.map((corte, index) => (
                    <div key={index}>
                      <img
                        src={corte.imagem}
                        alt={corte.nomeCorte}
                        className="rounded-t-xl shadow-md w-full h-64 object-cover "
                      />
                      <p className="text-left text-sm mt-1 assinatura"><span>{corte.nomeCorte}</span>  <span>{cliente.cliente}</span></p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
