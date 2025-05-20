<template>
  <header
    class="sticky top-0 z-10 bg-white shadow-sm transition-all duration-300"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-xl font-bold text-primary-600 flex items-center"
      >
        <span class="text-2xl mr-2">🎵</span>
        Music Catalog
      </NuxtLink>

      <nav class="flex items-center" v-if="$route.path !== '/'">
        <NuxtLink to="/" class="btn btn-secondary mr-2"> Browse </NuxtLink>
        <NuxtLink to="/music/new" class="btn btn-primary"> Add Music </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component with navigation links
</script>
