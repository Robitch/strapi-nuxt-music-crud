export interface Music {
  id: number
  documentId: number
  title: string
  artist: string
  album: string
  genre: string
  year: number
  coverImage: CoverImage | null
  createdAt: string
  updatedAt: string
}

export interface CoverImage {
  id: number,
  documentId: number,
  url: string,
}

export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path: string | null
  url: string
}

export interface MusicCreatePayload {
  title: string
  artist: string
  album: string
  genre: string
  year: string
  coverImage?: File | null
}

export interface MusicUpdatePayload {
  title?: string
  artist?: string
  album?: string
  genre?: string
  year?: number
  coverImage?: File | null
}

export interface PaginationMeta {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface MusicResponse {
  data: Music[]
  meta: {
    pagination: PaginationMeta
  }
}

export interface StrapiError {
  status: number
  name: string
  message: string
  details: any
}