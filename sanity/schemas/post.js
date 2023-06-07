import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'descriptionForSeo',
      title: 'Description For Seo',
      type: 'string',
    }),
    defineField({
      name: 'keywordsForSeo',
      title: 'Keywords For Seo',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Description',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'carousel',
      title: 'Carousel',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'destination',
              title: 'Destination',
              type: 'string',
            },
            {
              name: 'admissionFees',
              title: 'Admission Fees',
              type: 'string',
            },
            {
              name: 'guidedTours',
              title: 'Guided Tours',
              type: 'string',
            },
            {
              name: 'culturalActivities',
              title: 'Cultural Activities',
              type: 'string',
            },
            {
              name: 'souvenirShopping',
              title: 'Souvenir Shopping',
              type: 'string',
            },
            {
              name: 'localCuisine',
              title: 'Local Cuisine',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
