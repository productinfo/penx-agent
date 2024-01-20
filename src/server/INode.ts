export interface INode {
  id: string

  spaceId: string

  parentId?: string

  databaseId?: string

  type: any

  element: any | any[]

  // for dynamic data
  props: {
    name?: string
    date?: string // 2024-01-01
    [key: string]: any
  }

  /**
   * for editor
   */
  collapsed: boolean

  /**
   * for tree view
   */
  folded: boolean

  children: string[]

  openedAt: Date

  createdAt: Date

  updatedAt: Date
}
