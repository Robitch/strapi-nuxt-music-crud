<template>
  <div class="flex items-center justify-between mt-6 pb-8">
    <div class="text-sm text-gray-600">
      Showing {{ startItem }} to {{ endItem }} of {{ pagination.total }} entries
    </div>
    
    <nav class="flex items-center space-x-2">
      <button 
        class="btn btn-secondary px-3 py-1 text-sm"
        :disabled="pagination.page === 1"
        :class="{ 'opacity-50 cursor-not-allowed': pagination.page === 1 }"
        @click="changePage(pagination.page - 1)"
      >
        Previous
      </button>
      
      <div class="flex items-center">
        <template v-for="page in displayedPages" :key="page">
          <button 
            v-if="page !== '...'" 
            class="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 text-sm"
            :class="page === pagination.page ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
            @click="changePage(Number(page))"
          >
            {{ page }}
          </button>
          <span v-else class="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
        </template>
      </div>
      
      <button 
        class="btn btn-secondary px-3 py-1 text-sm"
        :disabled="pagination.page === pagination.pageCount"
        :class="{ 'opacity-50 cursor-not-allowed': pagination.page === pagination.pageCount }"
        @click="changePage(pagination.page + 1)"
      >
        Next
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from '~/types/music'

const props = defineProps<{
  pagination: PaginationMeta
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const startItem = computed(() => {
  return (props.pagination.page - 1) * props.pagination.pageSize + 1
})

const endItem = computed(() => {
  return Math.min(props.pagination.page * props.pagination.pageSize, props.pagination.total)
})

const displayedPages = computed(() => {
  const { page, pageCount } = props.pagination
  const pages = []
  
  if (pageCount <= 7) {
    // Show all pages if there are 7 or fewer
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (page > 3) {
      // Add ellipsis if current page is more than 3 pages from start
      pages.push('...')
    }
    
    // Determine start and end of centered range
    let rangeStart = Math.max(2, page - 1)
    let rangeEnd = Math.min(pageCount - 1, page + 1)
    
    // Adjust range to always show 3 pages
    if (page <= 3) {
      rangeEnd = Math.min(4, pageCount - 1)
    }
    if (page >= pageCount - 2) {
      rangeStart = Math.max(pageCount - 3, 2)
    }
    
    // Add range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }
    
    if (page < pageCount - 2) {
      // Add ellipsis if current page is more than 2 pages from end
      pages.push('...')
    }
    
    // Always show last page
    pages.push(pageCount)
  }
  
  return pages
})

const changePage = (page: number) => {
  emit('page-change', page)
}
</script>