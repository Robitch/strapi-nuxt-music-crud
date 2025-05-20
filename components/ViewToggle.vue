<template>
  <div class="flex items-center rounded-md bg-gray-100 p-1">
    <button 
      class="p-2 rounded-md transition-all duration-200"
      :class="viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-primary-600'"
      @click="$emit('toggle', 'grid')"
      aria-label="Grid view"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    </button>
    <button 
      class="p-2 rounded-md transition-all duration-200"
      :class="viewMode === 'table' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-primary-600'"
      @click="$emit('toggle', 'table')"
      aria-label="Table view"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  viewMode: 'grid' | 'table'
}>()

const emit = defineEmits<{
  (e: 'toggle', mode: 'grid' | 'table'): void
}>()
</script>