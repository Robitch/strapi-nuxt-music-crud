<template>
  <div>
    <div class="mb-6">
      <NuxtLink to="/" class="text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Music Catalog
      </NuxtLink>
    </div>
    
    <div class="bg-white shadow-sm rounded-lg p-6 md:p-8">
      <h1 class="text-2xl font-bold text-primary-800 mb-6">Add New Music</h1>
      
      <MusicForm 
        :loading="submitting"
        @submit="createMusic"
        @cancel="goBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { addMusic } = useMusic()
const submitting = ref(false)

const createMusic = async (data: any) => {
  submitting.value = true
  const success = await addMusic(data)
  submitting.value = false
  
  if (success) {
    router.push('/')
  }
}

const goBack = () => {
  router.push('/')
}
</script>