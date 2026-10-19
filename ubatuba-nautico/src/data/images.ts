import type { ImageAsset, ImageKey } from '@/types'

/**
 * Imagens do site. Coloque as fotografias em /public/images com estes nomes
 * (ou altere o caminho/URL). Enquanto o arquivo não existir, o site mostra uma
 * ilustração vetorial e o selo "imagem ilustrativa".
 *
 * IMPORTANTE: use fotos ilustrativas apenas como ilustração. Só apresente fotos
 * como "nossa frota" ou "nossa equipe" quando forem reais e fornecidas pela empresa.
 */
export const images: Record<ImageKey, ImageAsset> = {
  hero: {
    src: '/images/hero.jpg',
    alt: 'Lancha navegando em águas turquesa perto de uma ilha (imagem ilustrativa)',
    scene: 'hero',
  },
  lancha: {
    src: '/images/lancha.jpg',
    alt: 'Lancha de passeio em mar calmo (imagem ilustrativa)',
    scene: 'boat',
  },
  barco: {
    src: '/images/barco.jpg',
    alt: 'Barco de passeio ancorado perto da costa (imagem ilustrativa)',
    scene: 'boat',
  },
  ilha: {
    src: '/images/ilha.jpg',
    alt: 'Ilha coberta de mata atlântica vista do mar (imagem ilustrativa)',
    scene: 'island',
  },
  praia: {
    src: '/images/praia.jpg',
    alt: 'Praia com águas claras e vegetação ao fundo (imagem ilustrativa)',
    scene: 'beach',
  },
  equipe: {
    src: '/images/equipe.jpg',
    alt: 'Espaço reservado para foto real da equipe de marinheiros (imagem ilustrativa)',
    scene: 'crew',
  },
  churrasqueira: {
    src: '/images/churrasqueira.jpg',
    alt: 'Área de convivência a bordo de uma embarcação (imagem ilustrativa)',
    scene: 'boat',
  },
  pordosol: {
    src: '/images/por-do-sol.jpg',
    alt: 'Pôr do sol sobre o mar visto de uma embarcação (imagem ilustrativa)',
    scene: 'sunset',
  },
  manutencao: {
    src: '/images/manutencao.jpg',
    alt: 'Espaço reservado para foto real de manutenção e limpeza das embarcações (imagem ilustrativa)',
    scene: 'crew',
  },
  mergulho: {
    src: '/images/mergulho.jpg',
    alt: 'Águas transparentes ideais para mergulho livre (imagem ilustrativa)',
    scene: 'beach',
  },
}
