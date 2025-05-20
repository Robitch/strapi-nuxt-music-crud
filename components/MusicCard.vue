<template>
  <div
    class="card p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 animate-fade-in"
    @click="navigateToDetail"
  >
    <div class="aspect-square overflow-hidden rounded-md bg-gray-100 mb-3">
      <img
        v-if="coverImageUrl"
        :src="coverImageUrl"
        :alt="music.title"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>
    </div>

    <h3 class="font-medium text-primary-800 truncate">{{ music.title }}</h3>
    <p class="text-primary-600 truncate">{{ music.artist }}</p>
    <p class="text-sm text-primary-500 truncate">{{ music.album }}</p>
    <div class="flex justify-between items-center mt-2">
      <span
        class="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
      >
        {{ music.genre }}
      </span>
      <span class="text-xs text-primary-500">{{ music.year }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Music } from "~/types/music";
const config = useRuntimeConfig();

const props = defineProps<{
  music: Music;
}>();

const router = useRouter();

const coverImageUrl = computed(() => {
  return `${config.public.apiBase}${props.music.coverImage?.url}`;
});

const navigateToDetail = () => {
  router.push(`/music/${props.music.documentId}`);
};
</script>
