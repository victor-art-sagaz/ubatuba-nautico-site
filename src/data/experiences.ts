import type { Experience } from '@/types'

/** Dados comerciais informados pela empresa. Valores exibidos como preço inicial. */
export const tours: Experience[] = [
{
    id: 'compartilhado', kind: 'passeio', name: 'Passeio compartilhado',
    description: 'Uma opção para conhecer as ilhas de Ubatuba dividindo o passeio com outros passageiros.',
    duration: '6 horas', capacity: 'Consulte a disponibilidade',
    amenities: ['Passeio em grupo', 'Contato com a natureza'],
    price: 'R$ 250,00', priceUnit: 'por pessoa',
    included: ['Passeio compartilhado'], notIncluded: ['Confirme os itens incluídos ao reservar'],
    stops: ['Ilha das Couves', 'Ilha do Prumirim'], image: 'ilha',
  }
]

export const rentals: Experience[] = [
{
    id: 'musa-ii', kind: 'aluguel', name: 'Musa II',
    description: 'Lancha espaçosa com sala e cozinha integradas, 3 quartos, 2 banheiros e flybridge.',
    duration: '7 horas', capacity: 'Até 16 pessoas',
    amenities: ['Churrasqueira', 'Cooler', 'Espaguetes flutuantes', 'Flybridge'],
    price: 'R$ 5.500,00', priceUnit: 'por passeio',
    included: ['Passeio privativo', 'Roteiro conforme condições do dia'],
    notIncluded: ['Confirme alimentação, bebidas e demais itens ao reservar'],
    stops: ['Ilha Anchieta', 'Praia das Palmas', 'Praia do Presídio', 'Praia do Sul', 'Sete Fontes', 'Praia do Flamengo'], image: 'barco',
  },
  {
    id: 'aloha', kind: 'aluguel', name: 'Aloha',
    description: 'Embarcação premium com amplo espaço, solário de popa, deck com churrasqueira, quarto e banheiro.',
    duration: '7 horas', capacity: 'Até 11 pessoas',
    amenities: ['Churrasqueira', 'Solário de popa', 'Quarto', 'Banheiro'],
    price: 'R$ 3.000,00', priceUnit: 'por passeio',
    included: ['Passeio privativo', 'Roteiro conforme condições do dia'],
    notIncluded: ['Confirme alimentação, bebidas e demais itens ao reservar'],
    stops: ['Ilha Anchieta', 'Praia das 7 Fontes', 'Praia do Flamengo'], image: 'lancha',
  },
  {
    id: 'lancha-20-pes', kind: 'aluguel', name: 'Lancha de 20 pés',
    description: 'Passeio privativo com churrasqueira para curtir as ilhas e praias de Ubatuba.',
    duration: 'Consulte a duração', capacity: 'Até 7 pessoas',
    amenities: ['Churrasqueira', 'Passeio privativo'],
    price: 'R$ 1.600,00', priceUnit: 'por passeio',
    included: ['Passeio privativo'], notIncluded: ['Confirme os itens incluídos ao reservar'],
    stops: ['Ilha Anchieta', 'Sete Fontes', 'Praia do Flamengo'], image: 'churrasqueira',
  },
  {
    id: 'carpe-diem', kind: 'aluguel', name: 'Carpe Diem',
    description: 'Lancha com churrasqueira, som Bluetooth, cooler, espaguetes flutuantes, coletes e ducha de água doce.',
    duration: 'Consulte a duração', capacity: 'Até 10 pessoas',
    amenities: ['Churrasqueira', 'Som Bluetooth', 'Cooler', 'Ducha de água doce'],
    price: 'R$ 1.800,00', priceUnit: 'por passeio',
    included: ['Passeio privativo', 'Coletes salva-vidas'], notIncluded: ['Confirme alimentação e bebidas ao reservar'],
    stops: ['Ilha das Couves', 'Ilha Rapada', 'Ilha Rachada', 'Ilha dos Porcos', 'Praia da Almada', 'Ilha do Prumirim'], image: 'lancha',
  },
  {
    id: 'runner', kind: 'aluguel', name: 'Lancha Runner',
    description: 'Lancha com churrasqueira, solário de proa, ampla praça e cabine com cama e banheiro.',
    duration: 'Consulte a duração', capacity: 'Até 14 pessoas',
    amenities: ['Churrasqueira', 'Solário de proa', 'Cabine', 'Banheiro'],
    price: 'Consultar valor', priceUnit: 'mediante consulta',
    included: ['Consulte as condições do passeio'],
    notIncluded: ['Preço não informado no material recebido'], image: 'barco',
  }
]

export const allExperiences: Experience[] = [...tours, ...rentals]
