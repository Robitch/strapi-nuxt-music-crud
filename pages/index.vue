<template>
  <div>
    <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-primary-800 mb-2">Music Catalog</h1>
        <p class="text-primary-600">Browse your collection of music</p>
      </div>
      
      <div class="mt-4 md:mt-0 flex space-x-4 items-center">
        <ViewToggle 
          :view-mode="viewMode" 
          @toggle="toggleViewMode" 
        />
        
        <NuxtLink to="/music/new" class="btn btn-primary">
          Add New Music
        </NuxtLink>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
    
    <template v-else>
      <div v-if="music.length === 0" class="py-20">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <h2 class="text-xl font-medium text-gray-600 mb-2">No music entries found</h2>
          <p class="text-gray-500 mb-6">Start adding music to your catalog</p>
          <NuxtLink to="/music/new" class="btn btn-primary">
            Add Your First Music Entry
          </NuxtLink>
        </div>
      </div>
      
      <template v-else>
        <!-- Grid View -->
        <div 
          v-if="viewMode === 'grid'" 
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <MusicCard 
            v-for="item in music" 
            :key="item.id" 
            :music="item"
          />
        </div>
        
        <!-- Table View -->
        <MusicTable 
          v-else
          :music="music" 
          :sort-field="sortField"
          :sort-direction="sortDirection"
          @sort="changeSort"
          @delete="openDeleteModal"
        />
        
        <!-- Pagination -->
        <Pagination 
          v-if="music.length > 0" 
          :pagination="pagination" 
          @page-change="changePage"
        />
      </template>
    </template>
    
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      v-model="showDeleteModal"
      :item-id="itemToDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default'
})

const {
  music,
  pagination,
  loading,
  viewMode,
  sortField,
  sortDirection,
  loadMusic,
  removeMusic,
  changeSort,
  toggleViewMode
} = useMusic()

const showDeleteModal = ref(false)
const itemToDelete = ref<number | null>(null)

const changePage = async (page: number) => {
  await loadMusic(page, pagination.value.pageSize)
}

const openDeleteModal = (id: number) => {
  itemToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async (id: number) => {
  await removeMusic(id)
}

onMounted(async () => {
  await loadMusic()
})
</script>