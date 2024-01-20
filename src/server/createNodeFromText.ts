import { v4 as uuidv4 } from 'uuid'
import { INode } from './INode'
export function createNodeFromText(text = ''): INode {
  return {
    id: uuidv4(),
    spaceId: '',
    type: 'COMMON',
    element: [
      {
        type: 'p',
        children: [{ text }],
      },
    ],

    props: {},
    collapsed: false,
    folded: true,
    children: [],
    openedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
