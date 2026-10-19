export type ExperienceKind = 'passeio' | 'aluguel'

export type SceneVariant = 'hero' | 'boat' | 'island' | 'beach' | 'crew' | 'sunset'

export type ImageKey =
  | 'hero'
  | 'lancha'
  | 'barco'
  | 'ilha'
  | 'praia'
  | 'equipe'
  | 'churrasqueira'
  | 'pordosol'
  | 'manutencao'
  | 'mergulho'

export interface ImageAsset {
  /** Caminho em /public/images ou URL. Se o arquivo não existir, uma ilustração é exibida. */
  src: string
  alt: string
  scene: SceneVariant
}

export interface Experience {
  id: string
  kind: ExperienceKind
  name: string
  description: string
  duration: string
  capacity: string
  amenities: string[]
  /** Valor demonstrativo exibido ao cliente (sempre acompanhado do selo de demonstração). */
  price: string
  priceUnit: string
  included: string[]
  notIncluded?: string[]
  /** Paradas de exemplo (apenas para passeios com roteiro definido). */
  stops?: string[]
  image: ImageKey
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Destination {
  id: string
  name: string
  type: 'Ilha' | 'Praia' | 'Embarque'
  description: string
  image: ImageKey
}

export interface Testimonial {
  id: string
  text: string
  author: string
  context: string
}

export interface Amenity {
  id: string
  title: string
  description: string
  icon: 'flame' | 'music' | 'sofa' | 'sun' | 'snowflake' | 'life-buoy'
}

export type TimePeriod = 'manha' | 'tarde' | 'dia-inteiro' | 'por-do-sol' | 'a-combinar'

export interface BookingFormValues {
  name: string
  phone: string
  experienceId: string
  date: string
  period: TimePeriod | ''
  passengers: string
  notes: string
  /** Campo isca contra robôs: deve permanecer vazio. */
  website: string
}

export interface BookingPayload {
  name: string
  phone: string
  experienceId: string
  experienceName: string
  date: string
  period: TimePeriod
  passengers: number
  notes: string
}
