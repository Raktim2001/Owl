export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: "Comments won't show without approval of author"

    },
    {
      name: 'email',
      type: 'string',
      
    },
     {
      name: 'comment',
      type: 'text',
      
    },
    {
      name: 'post',
      type: 'reference',
      to: [{type: 'post'}],
    },
 
  ],
};