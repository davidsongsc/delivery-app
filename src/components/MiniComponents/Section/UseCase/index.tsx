import React, { useEffect, useState } from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons'
import useMediaQuery from '@/hooks/useMediaQuery'
import { UseCase, useCases } from '@/enum/useCases'


export default function UseCasesSection() {
  const [visibleItems, setVisibleItems] = useState<UseCase[]>([])

  useEffect(() => {
    // Função tipada corretamente
    const shuffleArray = (array: UseCase[]): UseCase[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    const randomItems = shuffleArray(useCases).slice(0, 6)
    setVisibleItems(randomItems)
  }, [])

  return (
    <section className="w-full bg-white text-gray-800">
      <div className="container mx-auto px-6 py-4 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Tipos de negócios que atendemos</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}