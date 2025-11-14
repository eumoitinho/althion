import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeContent',
  title: 'Conteúdo da Home',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador',
      type: 'slug',
      description: 'Ex: home-hero, home-about, home-solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Sobre', value: 'about' },
          { title: 'Soluções', value: 'solutions' },
          { title: 'Produtos', value: 'products' },
          { title: 'Clientes', value: 'clients' },
          { title: 'Depoimentos', value: 'testimonials' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo Rico',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'customContent',
      title: 'Conteúdo Customizado (JSON)',
      type: 'text',
      description: 'JSON customizado para configurações específicas',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Vídeo URL',
      type: 'url',
    }),
    defineField({
      name: 'buttons',
      title: 'Botões',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Texto', type: 'string' },
            { name: 'link', title: 'Link', type: 'url' },
            {
              name: 'variant',
              title: 'Variante',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
