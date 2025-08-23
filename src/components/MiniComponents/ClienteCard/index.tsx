import { motion } from 'framer-motion';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ClientCardProps {
  client: any;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-4 bg-white rounded-lg shadow cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-center">
        <Image
          src={client.logo_url || client.logo}
          alt={`Logo de ${client.nome}`}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center p-4 text-center"
      >
        <h3 className="text-lg font-semibold mb-2">{client.nome}</h3>
        {client.telefones?.length > 0 && (
          <div className="mb-4 text-sm text-gray-700">
            {client.telefones.map((tel: any, idx: number) => (
              <div key={idx}>
                {Object.entries(tel).map(([tipo, numero]) => (
                  <div key={tipo}>
                    <strong>{tipo}:</strong> {numero}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => router.push(`/${client.page}`)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Conhecer Loja
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function ClientsGrid({ corporations }: { corporations: any }) {
  return (
    <section id="clients" className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Nossos Clientes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
        {corporations?.result.map((client: any, index: number) => (
          <Tooltip key={index} title={client.nome}>
            <ClientCard client={client} />
          </Tooltip>
        ))}
      </div>
    </section>
  );
}
