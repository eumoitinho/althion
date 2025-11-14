# 🚀 Exemplos de Uso do Sanity CMS

## 📄 Página Dinâmica com Sanity

### Exemplo 1: Página "Sobre"

```typescript
// app/sobre/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'

export default async function SobrePage() {
  const page = await getPageBySlug('sobre')

  if (!page) {
    return (
      <div className="container py-20">
        <h1>Página não encontrada</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {page.hero && (
        <section className="relative h-[500px]">
          {page.hero.image && (
            <img
              src={urlForImage(page.hero.image).width(1920).height(500).url()}
              alt={page.hero.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="relative z-10 container h-full flex flex-col justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">{page.hero.title}</h1>
            <p className="text-xl">{page.hero.subtitle}</p>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="container py-20">
        <PortableText value={page.content} />
      </section>

      {/* Sections */}
      {page.sections && page.sections.map((section: any, index: number) => (
        <section key={index} className="container py-10">
          <h2 className="text-3xl font-bold mb-6">{section.title}</h2>

          {section.type === 'cards' && section.cards && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.cards.map((card: any, cardIndex: number) => (
                <div key={cardIndex} className="border rounded-lg p-6">
                  {card.image && (
                    <img
                      src={urlForImage(card.image).width(400).height(300).url()}
                      alt={card.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          )}

          {section.type === 'stats' && section.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {section.stats.map((stat: any, statIndex: number) => (
                <div key={statIndex} className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
```

---

## 🏠 Homepage com Sanity

### Exemplo 2: Seções da Home

```typescript
// app/page.tsx
import { getHomeContent } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import Link from 'next/link'

export default async function HomePage() {
  const content = await getHomeContent()

  const heroContent = content.find((c: any) => c.type === 'hero')
  const aboutContent = content.find((c: any) => c.type === 'about')
  const solutionsContent = content.find((c: any) => c.type === 'solutions')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroContent && (
        <section className="relative h-screen">
          {heroContent.video ? (
            <video
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroContent.video} type="video/mp4" />
            </video>
          ) : heroContent.image && (
            <img
              src={urlForImage(heroContent.image).width(1920).height(1080).url()}
              alt={heroContent.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="relative z-10 container h-full flex flex-col justify-center text-white">
            <h1 className="text-6xl font-bold mb-4">{heroContent.title}</h1>
            <p className="text-2xl mb-8">{heroContent.subtitle}</p>

            {heroContent.buttons && (
              <div className="flex gap-4">
                {heroContent.buttons.map((button: any, index: number) => (
                  <Link
                    key={index}
                    href={button.link}
                    className={`px-8 py-3 rounded-lg font-semibold ${
                      button.variant === 'primary'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-transparent border border-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      {aboutContent && (
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold mb-6">{aboutContent.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{aboutContent.description}</p>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      {solutionsContent && (
        <section className="py-20">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {solutionsContent.title}
            </h2>
            {/* Aqui você pode renderizar as soluções */}
          </div>
        </section>
      )}
    </div>
  )
}
```

---

## 🎯 Lista de Soluções

### Exemplo 3: Página de Soluções

```typescript
// app/solucoes/page.tsx
import { getSolutions } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import Link from 'link'
import * as Icons from 'lucide-react'

export default async function SolucoesPage() {
  const solutions = await getSolutions()

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <h1 className="text-5xl font-bold mb-12">Nossas Soluções</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution: any) => {
            const Icon = solution.icon && Icons[solution.icon as keyof typeof Icons]

            return (
              <Link
                key={solution._id}
                href={`/solucoes/${solution.slug.current}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {solution.image && (
                  <img
                    src={urlForImage(solution.image).width(600).height(400).url()}
                    alt={solution.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && <Icon className="w-6 h-6 text-blue-600" />}
                    <h3 className="text-2xl font-bold">{solution.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-4">{solution.description}</p>

                  {solution.category && (
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {solution.category}
                    </span>
                  )}

                  {solution.features && solution.features.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {solution.features.slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-600">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

---

## 📱 Componente Reutilizável

### Exemplo 4: Hero Component

```typescript
// components/Hero.tsx
import { urlForImage } from '@/lib/sanity.image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  image?: any
  video?: string
  buttons?: Array<{
    text: string
    link: string
    variant: 'primary' | 'secondary' | 'outline'
  }>
}

export function Hero({ title, subtitle, description, image, video, buttons }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background */}
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image && (
        <img
          src={urlForImage(image).width(1920).height(600).url()}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 container text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl mb-4">{subtitle}</p>}
        {description && <p className="text-lg mb-8 max-w-2xl">{description}</p>}

        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  button.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : button.variant === 'secondary'
                    ? 'bg-gray-800 hover:bg-gray-900'
                    : 'bg-transparent border-2 border-white hover:bg-white hover:text-black'
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Uso:
import { getHomeContentByType } from '@/lib/sanity.queries'
import { Hero } from '@/components/Hero'

export default async function Page() {
  const [heroContent] = await getHomeContentByType('hero')

  return (
    <Hero
      title={heroContent.title}
      subtitle={heroContent.subtitle}
      image={heroContent.image}
      video={heroContent.video}
      buttons={heroContent.buttons}
    />
  )
}
```

---

## 🔄 Revalidação e ISR

### Exemplo 5: Incremental Static Regeneration

```typescript
// app/produtos/[slug]/page.tsx
import { getSolutionBySlug, getSolutions } from '@/lib/sanity.queries'

// Gera as rotas estáticas no build time
export async function generateStaticParams() {
  const solutions = await getSolutions()

  return solutions.map((solution: any) => ({
    slug: solution.slug.current,
  }))
}

// Revalidate a cada 60 segundos
export const revalidate = 60

export default async function SolutionPage({
  params,
}: {
  params: { slug: string }
}) {
  const solution = await getSolutionBySlug(params.slug)

  if (!solution) {
    return <div>Solução não encontrada</div>
  }

  return (
    <div className="container py-20">
      <h1 className="text-5xl font-bold mb-6">{solution.title}</h1>
      <p className="text-xl text-gray-600">{solution.description}</p>
      {/* ... resto do conteúdo */}
    </div>
  )
}
```

---

## 🎨 PortableText (Rich Text)

### Exemplo 6: Renderizando Conteúdo Rico

```typescript
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity.image'

const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlForImage(value).width(800).url()}
        alt={value.alt || 'Image'}
        className="rounded-lg my-8"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-4">{children}</h2>,
    normal: ({ children }: any) => <p className="my-4 text-gray-700">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
}

// Uso:
<PortableText value={page.content} components={components} />
```

---

## 🚀 Pronto para usar!

Estes exemplos cobrem os casos de uso mais comuns. Personalize conforme necessário!
