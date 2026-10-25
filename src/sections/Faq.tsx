import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'O que está incluído no passeio de lancha?',
    answer: 'Todos os passeios privativos e compartilhados incluem combustível, marinheiro habilitado, equipamentos de salvatagem (coletes), cooler com gelo, som Bluetooth e marinheiro para assar o seu churrasco a bordo.',
  },
  {
    question: 'Como funciona a opção de pernoite à bordo (Musa II)?',
    answer: 'A embarcação Musa II oferece estrutura completa de hotelaria marítima com quartos, banheiros, cozinha e salão. Você pode reservar diretamente pelo nosso link do Airbnb ou falar no WhatsApp.',
  },
  {
    question: 'Posso levar minhas próprias comidas e bebidas?',
    answer: 'Sim! Fique à vontade para levar carnes para o churrasco, bebidas e petiscos. Disponibilizamos cooler higienizado com gelo para manter tudo gelado.',
  },
  {
    question: 'O que acontece em caso de mau tempo ou chuva?',
    answer: 'A segurança em primeiro lugar. Se as condições de navegação forem desfavoráveis pela Capitania dos Portos, o passeio é reagendado sem custo ou o valor é reembolsado.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-navy-950 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 border border-cyan-500/20 mb-4">
            <HelpCircle className="w-4 h-4" />
            Tire suas dúvidas
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Perguntas Frequentes</h2>
          <p className="mt-3 text-gray-400">Tudo o que você precisa saber para preparar seu passeio a bordo da MUSA.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-navy-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-lg text-white transition hover:text-cyan-400"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-cyan-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* TRANSIÇÃO SUAVE DE ALTURA E OPACIDADE */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 px-5' : 'grid-rows-[0fr] opacity-0 px-5'
                  }`}
                >
                  <div className="overflow-hidden text-sm text-gray-300 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
