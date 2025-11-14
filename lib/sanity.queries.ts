import { client } from './sanity.client'

// Query para buscar páginas
export async function getPages() {
  return client.fetch(`
    *[_type == "page" && published == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      "slug": slug,
      content,
      hero {
        title,
        subtitle,
        image {
          asset -> {
            _id,
            _type,
            url
          },
          alt
        },
        video
      },
      sections[] {
        type,
        title,
        content,
        cards[] {
          title,
          description,
          icon,
          image {
            asset -> {
              _id,
              _type,
              url
            },
            alt
          },
          link
        },
        stats[] {
          label,
          value
        },
        contact {
          address,
          phone,
          email
        }
      },
      seo {
        title,
        description,
        image {
          asset -> {
            _id,
            _type,
            url
          },
          alt
        }
      },
      published
    }
  `)
}

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug && published == true][0] {
      _id,
      _type,
      title,
      "slug": slug,
      content,
      hero {
        title,
        subtitle,
        image {
          asset -> {
            _id,
            _type,
            url
          },
          alt
        },
        video
      },
      sections[] {
        type,
        title,
        content,
        cards[] {
          title,
          description,
          icon,
          image {
            asset -> {
              _id,
              _type,
              url
            },
            alt
          },
          link
        },
        stats[] {
          label,
          value
        },
        contact {
          address,
          phone,
          email
        }
      },
      seo {
        title,
        description,
        image {
          asset -> {
            _id,
            _type,
            url
          },
          alt
        }
      },
      published
    }`,
    { slug }
  )
}

// Query para buscar soluções
export async function getSolutions() {
  return client.fetch(`
    *[_type == "solution" && published == true] | order(order asc) {
      _id,
      _type,
      title,
      "slug": slug,
      description,
      icon,
      category,
      features,
      image {
        asset -> {
          _id,
          _type,
          url
        },
        alt
      },
      link,
      order,
      published
    }
  `)
}

export async function getSolutionBySlug(slug: string) {
  return client.fetch(
    `*[_type == "solution" && slug.current == $slug && published == true][0] {
      _id,
      _type,
      title,
      "slug": slug,
      description,
      icon,
      category,
      features,
      image {
        asset -> {
          _id,
          _type,
          url
        },
        alt
      },
      link,
      order,
      published
    }`,
    { slug }
  )
}

// Query para buscar conteúdo da home
export async function getHomeContent() {
  return client.fetch(`
    *[_type == "homeContent" && published == true] | order(order asc) {
      _id,
      _type,
      "slug": slug,
      type,
      title,
      subtitle,
      description,
      content,
      customContent,
      image {
        asset -> {
          _id,
          _type,
          url
        },
        alt
      },
      video,
      buttons,
      order,
      published
    }
  `)
}

export async function getHomeContentBySlug(slug: string) {
  return client.fetch(
    `*[_type == "homeContent" && slug.current == $slug && published == true][0] {
      _id,
      _type,
      "slug": slug,
      type,
      title,
      subtitle,
      description,
      content,
      customContent,
      image {
        asset -> {
          _id,
          _type,
          url
        },
        alt
      },
      video,
      buttons,
      order,
      published
    }`,
    { slug }
  )
}

export async function getHomeContentByType(type: string) {
  return client.fetch(
    `*[_type == "homeContent" && type == $type && published == true] | order(order asc) {
      _id,
      _type,
      "slug": slug,
      type,
      title,
      subtitle,
      description,
      content,
      customContent,
      image {
        asset -> {
          _id,
          _type,
          url
        },
        alt
      },
      video,
      buttons,
      order,
      published
    }`,
    { type }
  )
}
