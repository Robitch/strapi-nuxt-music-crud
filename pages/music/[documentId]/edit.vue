<template>
  <div>
    <div class="mb-6">
      <NuxtLink
        :to="`/music/${id}`"
        class="text-primary-600 hover:text-primary-800 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Music Details
      </NuxtLink>
    </div>

    <div class="bg-white shadow-sm rounded-lg p-6 md:p-8">
      <h1 class="text-2xl font-bold text-primary-800 mb-6">Edit Music</h1>

      <div
        v-if="loading && !currentMusic"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"
        ></div>
      </div>

      <div v-else-if="!currentMusic && !loading" class="py-12 text-center">
        <h2 class="text-xl font-medium text-gray-600 mb-2">Music not found</h2>
        <p class="text-gray-500 mb-6">
          The music entry you're trying to edit doesn't exist or has been
          removed
        </p>
        <NuxtLink to="/" class="btn btn-primary"> Return to Catalog </NuxtLink>
      </div>

      <MusicForm
        v-else
        :music="currentMusic"
        :loading="submitting"
        @submit="updateMusic"
        @cancel="goBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.documentId);

const { currentMusic, loading, loadMusicById, editMusic, resetCurrentMusic } =
  useMusic();

const submitting = ref(false);

const updateMusic = async (data: any) => {
  submitting.value = true;
  const success = await editMusic(id.value, data);
  submitting.value = false;

  if (success) {
    router.push(`/music/${id.value}`);
  }
};

const goBack = () => {
  router.push(`/music/${id.value}`);
};

onMounted(async () => {
  const success = await loadMusicById(id.value);
  if (!success) {
    // Music not found
  }
});

onBeforeUnmount(() => {
  resetCurrentMusic();
});
</script>
