import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/types'
import { cn } from '@/lib/cn'

interface AccordionProps {
  items: FaqItem[]
}

/** Lista de perguntas e respostas acessível (botões com aria-expanded). */
export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white shadow-soft">
      {items.map((item) => {
        const open = openId === item.id
        const buttonId = `${item.id}-button`
        const panelId = `${item.id}-panel`
        return (
          <div key={item.id}>
            <h3 className="font-sans">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy-900 sm:px-6 sm:py-5"
              >
                {item.question}
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-sea-700 transition-transform', open && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-navy-600 sm:px-6">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
