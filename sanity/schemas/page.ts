import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Imagem',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'video',
          title: 'Vídeo URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Seções',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Texto', value: 'text' },
                  { title: 'Cards', value: 'cards' },
                  { title: 'Estatísticas', value: 'stats' },
                  { title: 'Contato', value: 'contact' },
                  { title: 'Processo', value: 'process' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Conteúdo',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'cards',
              title: 'Cards',
              type: 'array',
              hidden: ({ parent }) => parent?.type !== 'cards',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Título', type: 'string' },
                    { name: 'description', title: 'Descrição', type: 'text' },
                    { name: 'icon', title: 'Ícone (lucide-react)', type: 'string' },
                    {
                      name: 'image',
                      title: 'Imagem',
                      type: 'image',
                      options: { hotspot: true }
                    },
                    { name: 'link', title: 'Link', type: 'url' },
                  ],
                },
              ],
            },
            {
              name: 'stats',
              title: 'Estatísticas',
              type: 'array',
              hidden: ({ parent }) => parent?.type !== 'stats',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'value', title: 'Valor', type: 'string' },
                  ],
                },
              ],
            },
            {
              name: 'contact',
              title: 'Informações de Contato',
              type: 'object',
              hidden: ({ parent }) => parent?.type !== 'contact',
              fields: [
                { name: 'address', title: 'Endereço', type: 'string' },
                { name: 'phone', title: 'Telefone', type: 'string' },
                { name: 'email', title: 'Email', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Meta Image',
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
