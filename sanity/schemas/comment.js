import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'post',
      type: 'reference',
      to: [{type: 'post'}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'isApproved',
      title: 'Is Approved',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
      image: 'post.mainImage',
    },
    prepare({name, comment, post, image}) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
        media: image,
      }
    },
  },
})
