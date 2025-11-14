import { urlForImage } from '@/lib/sanity.image'
import { SanityHomeContent } from '@/lib/hooks/use-sanity-content'

/**
 * Converte dados do Sanity para o formato esperado pelos componentes
 */
export function sanityHomeContentToContent(sanityContent: SanityHomeContent | null) {
  if (!sanityContent) return null

  // Helper para obter URL da imagem
  const getImageUrl = (image?: { 
    asset?: { 
      _ref?: string
      _type?: string
      url?: string
      _id?: string
    }
    alt?: string 
  }) => {
    if (!image?.asset) return undefined
    
    // Se já temos a URL direta (após resolver a referência)
    if (image.asset.url) {
      return image.asset.url
    }
    
    // Caso contrário, usar o builder
    try {
      return urlForImage(image).width(1920).height(1080).url()
    } catch {
      return undefined
    }
  }

  // Converter botões
  const buttons = sanityContent.buttons?.map(btn => ({
    text: btn.text,
    link: btn.link,
    variant: btn.variant || 'primary'
  })) || []

  return {
    id: sanityContent._id,
    slug: sanityContent.slug?.current || '',
    type: sanityContent.type,
    title: sanityContent.title,
    subtitle: sanityContent.subtitle,
    description: sanityContent.description,
    image: getImageUrl(sanityContent.image),
    video: sanityContent.video,
    // Compatibilidade com formato antigo
    content: {
      video: sanityContent.video,
      image: getImageUrl(sanityContent.image),
      primaryButton: buttons.find(b => b.variant === 'primary') || buttons[0],
      secondaryButton: buttons.find(b => b.variant === 'secondary' || b.variant === 'outline'),
      buttons: buttons,
      // Para soluções e outros tipos de conteúdo
      solutions: sanityContent.customContent ? JSON.parse(sanityContent.customContent || '{}') : undefined,
      features: sanityContent.customContent ? JSON.parse(sanityContent.customContent || '{}')?.features : undefined,
      stats: sanityContent.customContent ? JSON.parse(sanityContent.customContent || '{}')?.stats : undefined,
    },
    order: sanityContent.order || 0,
    is_active: sanityContent.published || false,
  }
}
