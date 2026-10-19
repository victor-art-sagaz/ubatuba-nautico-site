import type { Amenity, Destination, FaqItem, Testimonial } from '@/types'

export const faqItems: FaqItem[] = [
  {
    id: 'faq-reserva',
    question: 'Como solicito uma reserva?',
    answer:
      'Preencha o formulário de reserva. Ao enviar, preparamos uma mensagem com os seus dados para você enviar pelo WhatsApp. A equipe responde confirmando (ou não) a disponibilidade: o envio do formulário não garante a reserva.',
  },
  {
    id: 'faq-embarque',
    question: 'Onde é o embarque?',
    answer:
      'O ponto de embarque de referência é o Píer do Saco da Ribeira, em Ubatuba-SP. Informações finais de horário e orientação de chegada serão passadas na confirmação.',
  },
  {
    id: 'faq-clima',
    question: 'E se o tempo estiver ruim?',
    answer:
      'A decisão de sair ou não é do comandante, com base nas condições de mar e meteorologia. Regras de remarcação ou reembolso serão definidas pela empresa e informadas nas condições de contratação.',
  },
  {
    id: 'faq-seguranca',
    question: 'Os passageiros recebem orientações de segurança?',
    answer:
      'Sim. Antes da saída, a tripulação apresenta as orientações de segurança a bordo e o uso dos equipamentos disponíveis. A segurança é prioridade, mas nenhuma atividade náutica é isenta de riscos.',
  },
  {
    id: 'faq-criancas',
    question: 'Crianças e pessoas com mobilidade reduzida podem participar?',
    answer:
      'Em geral é possível, mas depende da embarcação e do roteiro. Informe nas observações da reserva para a equipe avaliar e orientar com antecedência.',
  },
  {
    id: 'faq-alimentos',
    question: 'Posso levar comida e bebida?',
    answer:
      'As regras de bordo (alimentos, bebidas, gelo, churrasqueira) variam conforme a embarcação e serão informadas pela empresa. Combine os detalhes ao solicitar a reserva.',
  },
  {
    id: 'faq-pagamento',
    question: 'Quais são as formas de pagamento?',
    answer:
      'As formas de pagamento serão definidas pela empresa. Os valores exibidos neste site são demonstrativos e não representam preços reais.',
  },
]

export const destinations: Destination[] = [
  {
    id: 'dest-anchieta',
    name: 'Ilha Anchieta',
    type: 'Ilha',
    description:
      'Grande ilha da região, muito procurada para contemplação em passeios náuticos. Desembarque e atividades dependem de regras e autorizações locais.',
    image: 'ilha',
  },
  {
    id: 'dest-couves',
    name: 'Ilha das Couves',
    type: 'Ilha',
    description:
      'Destino frequente em roteiros de barco, conhecido pelas águas claras para banho e mergulho livre, conforme condições do dia.',
    image: 'mergulho',
  },
  {
    id: 'dest-prumirim',
    name: 'Ilha do Prumirim',
    type: 'Ilha',
    description:
      'Ilha próxima à costa, comum em passeios de curta duração. Paradas variam conforme mar, maré e orientação do comandante.',
    image: 'praia',
  },
  {
    id: 'dest-saco-ribeira',
    name: 'Saco da Ribeira',
    type: 'Embarque',
    description:
      'Região de píeres e marinas onde fica o ponto de embarque de referência deste modelo demonstrativo.',
    image: 'lancha',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    text: 'Exemplo de depoimento: espaço reservado para o relato de um cliente real sobre o passeio.',
    author: 'Cliente demonstrativo 1',
    context: 'Passeio pelas ilhas',
  },
  {
    id: 't2',
    text: 'Exemplo de depoimento: aqui entrará um comentário real sobre atendimento, pontualidade e segurança.',
    author: 'Cliente demonstrativo 2',
    context: 'Aluguel de lancha',
  },
  {
    id: 't3',
    text: 'Exemplo de depoimento: substitua por avaliações verdadeiras, com autorização de quem as escreveu.',
    author: 'Cliente demonstrativo 3',
    context: 'Pôr do sol a bordo',
  },
]

export const amenities: Amenity[] = [
  {
    id: 'a-churrasqueira',
    title: 'Churrasqueira',
    description: 'Disponível apenas em embarcações equipadas. Confirme na reserva.',
    icon: 'flame',
  },
  {
    id: 'a-som',
    title: 'Som ambiente',
    description: 'Sistema de som para animar o passeio, quando disponível a bordo.',
    icon: 'music',
  },
  {
    id: 'a-convivencia',
    title: 'Áreas de convivência',
    description: 'Bancos, mesas e espaços para o grupo conversar e relaxar.',
    icon: 'sofa',
  },
  {
    id: 'a-sol',
    title: 'Áreas de sol e sombra',
    description: 'Espaços abertos para tomar sol e áreas cobertas para descansar.',
    icon: 'sun',
  },
  {
    id: 'a-gelo',
    title: 'Geladeira ou caixa térmica',
    description: 'Para manter bebidas e alimentos gelados, conforme a embarcação.',
    icon: 'snowflake',
  },
  {
    id: 'a-seguranca',
    title: 'Equipamentos de segurança',
    description: 'Coletes salva-vidas e demais itens conforme a embarcação e a legislação aplicável.',
    icon: 'life-buoy',
  },
]
