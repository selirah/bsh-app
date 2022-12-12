export type KeyValuePair = {
  [key: string]: string
}

export type FilterPayload = {
  keyword?: string
  filters?: KeyValuePair
  sort?: {
    by: string
    order: string
  }
  page?: {
    size: number
    number: number
  }
  userId?: number
  periodFrom?: string
  periodTo?: string
}
