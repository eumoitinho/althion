import { MedusaProduct } from '@/lib/hooks/use-products'
import { Product } from '@/lib/data/products'

/**
 * Converte um produto do Medusa para o formato usado no frontend
 */
export function medusaProductToProduct(medusaProduct: MedusaProduct): Product & { handle?: string } {
  // Obter o menor preço das variantes (em centavos)
  const minPrice = medusaProduct.variants?.reduce((min, variant) => {
    const variantPrice = variant.prices?.[0]?.amount || 0
    return variantPrice > 0 && (min === null || variantPrice < min) ? variantPrice : min
  }, null as number | null)

  // Converter centavos para reais
  const price = minPrice ? minPrice / 100 : undefined

  // Obter imagens
  const images = medusaProduct.images?.map(img => img.url) || []
  if (medusaProduct.thumbnail) {
    images.unshift(medusaProduct.thumbnail)
  }

  // Obter categoria do industrial_category ou metadata
  // Priorizar industrial_category que corresponde ao slug da categoria
  const category = medusaProduct.industrial_category || 
                   medusaProduct.metadata?.category || 
                   'default'

  // Obter fabricante do metadata
  const manufacturer = medusaProduct.metadata?.manufacturer || 
                      medusaProduct.metadata?.brand

  // Obter specs técnicas
  const technicalSpecs = medusaProduct.technical_specs || 
                        medusaProduct.metadata?.specifications || 
                        {}

  return {
    id: medusaProduct.id,
    name: medusaProduct.title,
    technicalName: medusaProduct.subtitle,
    category: category,
    description: medusaProduct.description || '',
    specifications: {
      ...technicalSpecs,
      model: technicalSpecs.model || medusaProduct.metadata?.model,
      series: technicalSpecs.series || medusaProduct.metadata?.series,
      voltage: technicalSpecs.voltage || medusaProduct.metadata?.voltage,
      norms: medusaProduct.certifications || technicalSpecs.norms || [],
    },
    images: images.length > 0 ? images : ['/placeholder.jpg'],
    videos: medusaProduct.demo_video_url ? [medusaProduct.demo_video_url] : undefined,
    catalogPdf: medusaProduct.technical_doc_url || medusaProduct.metadata?.pdfManual,
    price: price,
    hasPrice: !!price,
    requiresQuote: !price,
    featured: medusaProduct.metadata?.featured || false,
    brand: manufacturer,
    manufacturer: manufacturer,
    application: medusaProduct.recommended_applications || 
                 medusaProduct.metadata?.applications || 
                 [],
    tags: medusaProduct.metadata?.tags || [],
    pdfManual: medusaProduct.technical_doc_url || medusaProduct.metadata?.pdfManual,
    handle: medusaProduct.handle, // Adicionar handle para uso em URLs
  } as Product & { handle?: string }
}

/**
 * Converte uma lista de produtos do Medusa para o formato usado no frontend
 */
export function medusaProductsToProducts(medusaProducts: MedusaProduct[]): (Product & { handle?: string })[] {
  return medusaProducts.map(medusaProductToProduct)
}

