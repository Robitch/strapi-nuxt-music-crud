import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import type { Music, MusicCreatePayload, MusicUpdatePayload, PaginationMeta } from '~/types/music'

export const useMusic = () => {
  const toast = useToast()
  const {
    loading,
    error,
    fetchMusic,
    fetchMusicById,
    createMusic,
    updateMusic,
    deleteMusic
  } = useApi()

  const music = ref<Music[]>([])
  const currentMusic = ref<Music | null>(null)
  const pagination = ref<PaginationMeta>({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0
  })
  const viewMode = ref<'grid' | 'table'>('grid')
  const sortField = ref('title')
  const sortDirection = ref<'asc' | 'desc'>('asc')

  const sortBy = computed(() => {
    return `${sortField.value}:${sortDirection.value}`
  })

  const resetCurrentMusic = () => {
    currentMusic.value = null
  }

  const loadMusic = async (page = 1, pageSize = 10) => {
    const response = await fetchMusic(page, pageSize, sortBy.value)
    if (response) {
      music.value = response.data
      pagination.value = response.meta.pagination
    }
    return !!response
  }

  const loadMusicById = async (documentId: string) => {
    const response = await fetchMusicById(documentId)
    if (response) {
      currentMusic.value = response
    }
    return !!response
  }

  const addMusic = async (data: MusicCreatePayload) => {
    const newMusic = await createMusic(data)
    if (newMusic) {
      toast.success('Music entry created successfully!')
      await loadMusic(pagination.value.page, pagination.value.pageSize)
      return true
    } else if (error.value) {
      toast.error(`Error: ${error.value.message}`)
    }
    return false
  }

  const editMusic = async (id: number, data: MusicUpdatePayload) => {
    const updatedMusic = await updateMusic(id, data)
    if (updatedMusic) {
      toast.success('Music entry updated successfully!')
      await loadMusic(pagination.value.page, pagination.value.pageSize)
      return true
    } else if (error.value) {
      toast.error(`Error: ${error.value.message}`)
    }
    return false
  }

  const removeMusic = async (id: number) => {
    const success = await deleteMusic(id)
    if (success) {
      toast.success('Music entry deleted successfully!')
      await loadMusic(pagination.value.page, pagination.value.pageSize)
      return true
    } else if (error.value) {
      toast.error(`Error: ${error.value.message}`)
    }
    return false
  }

  const toggleSortDirection = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  }

  const changeSort = (field: string) => {
    if (sortField.value === field) {
      toggleSortDirection()
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
    loadMusic(pagination.value.page, pagination.value.pageSize)
  }

  const toggleViewMode = () => {
    viewMode.value = viewMode.value === 'grid' ? 'table' : 'grid'
  }

  return {
    music,
    currentMusic,
    pagination,
    loading,
    error,
    viewMode,
    sortField,
    sortDirection,
    loadMusic,
    loadMusicById,
    addMusic,
    editMusic,
    removeMusic,
    resetCurrentMusic,
    changeSort,
    toggleViewMode
  }
}