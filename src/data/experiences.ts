import type { Experience } from '@/types'

/**
 * CONTEÚDO DEMONSTRATIVO: nomes, roteiros, durações, capacidades e preços abaixo
 * são exemplos para apresentação. Substitua pelos dados reais da empresa.
 * Não representam roteiros oficiais, preços praticados nem capacidade autorizada.
 */

export const tours: Experience[] = [
  {
    id: 'passeio-ilhas',
    kind: 'passeio',
    name: 'Passeio pelas ilhas',
    description:
      'Roteiro de exemplo com navegação pela costa e paradas para banho em águas claras, conforme condições do mar.',
    duration: '4 horas (exemplo)',
    capacity: 'Até 10 passageiros (exemplo)',
    amenities: ['Som ambiente', 'Área coberta', 'Banheiro a bordo'],
    price: 'R$ 180',
    priceUnit: 'por pessoa',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Água mineral'],
    notIncluded: ['Alimentação', 'Bebidas alcoólicas'],
    stops: ['Ilha das Couves', 'Ilha do Prumirim'],
    image: 'ilha',
  },
  {
    id: 'passeio-praias',
    kind: 'passeio',
    name: 'Praias e águas calmas',
    description:
      'Passeio de exemplo para quem quer conhecer praias de difícil acesso por terra, com tempo livre para banho.',
    duration: '3 horas (exemplo)',
    capacity: 'Até 10 passageiros (exemplo)',
    amenities: ['Som ambiente', 'Área coberta'],
    price: 'R$ 140',
    priceUnit: 'por pessoa',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Água mineral'],
    notIncluded: ['Alimentação'],
    stops: ['Praias da região (a definir com a empresa)'],
    image: 'praia',
  },
  {
    id: 'passeio-pordosol',
    kind: 'passeio',
    name: 'Pôr do sol a bordo',
    description:
      'Saída no fim da tarde para apreciar o entardecer no mar. Horários variam conforme a estação do ano.',
    duration: '2 horas (exemplo)',
    capacity: 'Até 8 passageiros (exemplo)',
    amenities: ['Som ambiente', 'Área de convivência'],
    price: 'R$ 160',
    priceUnit: 'por pessoa',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Água mineral'],
    notIncluded: ['Bebidas e petiscos'],
    stops: ['Navegação panorâmica pela baía'],
    image: 'pordosol',
  },
  {
    id: 'passeio-mergulho',
    kind: 'passeio',
    name: 'Mergulho livre e relax',
    description:
      'Parada em ponto de águas transparentes para mergulho livre, sujeita a condições de mar e visibilidade.',
    duration: '4 horas (exemplo)',
    capacity: 'Até 8 passageiros (exemplo)',
    amenities: ['Área coberta', 'Escada de acesso ao mar'],
    price: 'R$ 200',
    priceUnit: 'por pessoa',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Equipamento de snorkel (se disponível)'],
    notIncluded: ['Alimentação'],
    stops: ['Ponto de mergulho (a definir com a empresa)'],
    image: 'mergulho',
  },
]

export const rentals: Experience[] = [
  {
    id: 'aluguel-lancha-hora',
    kind: 'aluguel',
    name: 'Lancha privativa por hora',
    description:
      'Embarcação exclusiva para o seu grupo, com roteiro combinado diretamente com o comandante.',
    duration: 'A partir de 2 horas (exemplo)',
    capacity: 'Até 8 passageiros (exemplo)',
    amenities: ['Som', 'Área de sol', 'Banheiro a bordo'],
    price: 'R$ 700',
    priceUnit: 'por hora',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Combustível conforme roteiro combinado'],
    notIncluded: ['Alimentação e bebidas'],
    image: 'lancha',
  },
  {
    id: 'aluguel-lancha-churrasqueira',
    kind: 'aluguel',
    name: 'Lancha com churrasqueira (diária)',
    description:
      'Ideal para comemorações e dias inteiros no mar. Disponibilidade de churrasqueira depende da embarcação.',
    duration: 'Diária de até 8 horas (exemplo)',
    capacity: 'Até 12 passageiros (exemplo)',
    amenities: ['Churrasqueira (quando disponível)', 'Som', 'Área de convivência', 'Geladeira'],
    price: 'R$ 4.200',
    priceUnit: 'por diária',
    included: ['Comandante e marinheiro', 'Coletes salva-vidas', 'Gelo e utensílios básicos'],
    notIncluded: ['Carvão, alimentos e bebidas', 'Combustível excedente'],
    image: 'churrasqueira',
  },
  {
    id: 'aluguel-barco-grupo',
    kind: 'aluguel',
    name: 'Barco para grupos (diária)',
    description:
      'Embarcação maior para grupos, famílias e confraternizações, com mais espaço para circulação.',
    duration: 'Diária de até 8 horas (exemplo)',
    capacity: 'Até 25 passageiros (exemplo)',
    amenities: ['Som', 'Área coberta', 'Banheiro a bordo', 'Área de convivência'],
    price: 'R$ 6.500',
    priceUnit: 'por diária',
    included: ['Comandante e marinheiros', 'Coletes salva-vidas'],
    notIncluded: ['Alimentação e bebidas', 'Combustível excedente'],
    image: 'barco',
  },
]

export const allExperiences: Experience[] = [...tours, ...rentals]
