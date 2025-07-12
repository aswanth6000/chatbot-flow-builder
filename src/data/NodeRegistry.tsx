
import TextNode from '@/components/TextNode';

export const NODE_TYPES = {
  text: {
    label: 'Text Message',
    type: 'text',
    component: TextNode,
    defaultData: {
      label: 'New Text Node',
    },
  },

  // Future nodes can be added here:
  // image: {
  //   label: 'Image Message',
  //   type: 'image',
  //   component: ImageNode,
  //   defaultData: {
  //     src: '',
  //   },
  // },
};
