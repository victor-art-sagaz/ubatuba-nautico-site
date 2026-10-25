export interface Experience {
  id: string
  name: string
  category: 'tour' | 'rental'
  price: number
  priceType: 'per_person' | 'total'
  capacity: number
  durationHours: number
  description: string
  features: string[]
  routes?: string[]
  image: string
  instagramLink?: string
}

export const tours: Experience[] = [
  {
    id: 'passeio-compartilhado',
    name: 'Passeio Compartilhado',
    category: 'tour',
    price: 250,
    priceType: 'per_person',
    capacity: 12,
    durationHours: 6,
    description: 'Deseja viver essa experiência única economizando? Conheça nossas opções de passeio compartilhado por Ubatuba!',
    features: [
      '6 horas de passeio',
      'Economia e conforto',
      'Guia especializado local',
      'Som bluetooth a bordo',
    ],
    routes: ['Ilha das Couves', 'Ilha do Prumirim'],
    image: '/images/passeio-compartilhado.jpg',
  },
]

export const rentals: Experience[] = [
  {
    id: 'embarcacao-20-pes',
    name: 'Lancha 20 Pés',
    category: 'rental',
    price: 1600,
    priceType: 'total',
    capacity: 7,
    durationHours: 6,
    description: 'Ideal para grupos de até 7 pessoas. Passeio privativo com churrasqueira para curtir as melhores praias de Ubatuba.',
    features: [
      'Capacidade para 7 pessoas',
      'Churrasqueira a bordo',
      'Som Bluetooth',
      'Ducha de água doce',
    ],
    routes: ['Ilha Anchieta', 'Praia das Sete Fontes', 'Praia do Flamengo'],
    image: '/images/lancha-20-pes.jpg',
  },
  {
    id: 'carpe-diem',
    name: 'Carpe Diem',
    category: 'rental',
    price: 1800,
    priceType: 'total',
    capacity: 10,
    durationHours: 6,
    description: 'Para até 10 pessoas! Possui churrasqueira, som Bluetooth, cooler, espaguetes flutuantes, coletes e ducha de água doce.',
    features: [
      'Capacidade para 10 pessoas',
      'Churrasqueira e Cooler',
      'Espaguetes flutuantes e coletes',
      'Ducha de água doce e som Bluetooth',
    ],
    routes: [
      'Ilha das Couves',
      'Ilha Rapada',
      'Ilha Rachada',
      'Ilha dos Porcos',
      'Praia da Almada',
      'Ilha do Prumirim',
    ],
    image: '/images/carpe-diem.jpg',
  },
  {
    id: 'aloha',
    name: 'Embarcação Aloha (Offshore)',
    category: 'rental',
    price: 3000,
    priceType: 'total',
    capacity: 11,
    durationHours: 7,
    description: 'Embarcação premium estilo Offshore. Amplo espaço com solarium de popa, deck com churrasqueira, 1 quarto e 1 banheiro de primeira linha.',
    features: [
      'Capacidade para 11 pessoas',
      '7 horas de passeio',
      'Solarium de popa e deck com churrasqueira',
      '1 Quarto e 1 Banheiro de primeira linha',
    ],
    routes: [
      'Ilha Anchieta (Praia das Palmas, Presídio e do Sul)',
      'Praia das Sete Fontes',
      'Praia do Flamengo',
    ],
    image: '/images/aloha.jpg',
  },
  {
    id: 'lancha-runner',
    name: 'Lancha Runner',
    category: 'rental',
    price: 2500,
    priceType: 'total',
    capacity: 14,
    durationHours: 6,
    description: 'Estrutura completa com churrasqueira, solarium de proa para tomar sol, ampla praça para garantir o conforto e cabine com cama e banheiro.',
    features: [
      'Capacidade para até 14 pessoas',
      'Solarium de proa para tomar sol',
      'Praça espaçosa e confortável',
      'Cabine com cama e banheiro',
      'Churrasqueira a bordo',
    ],
    routes: ['Roteiros personalizados pelo Norte e Sul de Ubatuba'],
    image: '/images/runner.jpg',
  },
  {
    id: 'musa-ii',
    name: 'Musa II (Passeio e Pernoite)',
    category: 'rental',
    price: 3500,
    priceType: 'total',
    capacity: 12,
    durationHours: 8,
    description: 'A embarcação principal MUSA. Amplo salão interno, flybridge, cozinha e opção de pernoite a bordo reservando pelo Airbnb.',
    features: [
      'Opção de Pernoite à bordo (Airbnb)',
      'Flybridge espaçoso e acabamento em madeira',
      'Cozinha, salão interno e camarote',
      'Churrasqueira e som náutico de alta qualidade',
    ],
    routes: ['Roteiros exclusivos e Pernoite em ilhas paradisíacas'],
    image: '/images/musa-ii.jpg',
  },
]
