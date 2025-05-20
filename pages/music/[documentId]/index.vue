<template>
  <div>
    <div class="mb-6">
      <NuxtLink
        to="/"
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
        Back to Music Catalog
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"
      ></div>
    </div>

    <div v-else-if="!currentMusic" class="py-20 text-center">
      <h2 class="text-xl font-medium text-gray-600 mb-2">Music not found</h2>
      <p class="text-gray-500 mb-6">
        The music entry you're looking for doesn't exist or has been removed
      </p>
      <NuxtLink to="/" class="btn btn-primary"> Return to Catalog </NuxtLink>
    </div>

    <div
      v-else
      class="bg-white shadow-sm rounded-lg overflow-hidden animate-fade-in"
    >
      <div class="md:flex">
        <div class="md:w-1/3 bg-gray-100">
          <div class="aspect-square w-full overflow-hidden">
            <img
              v-if="coverImageUrl"
              :src="coverImageUrl"
              :alt="currentMusic.title"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
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
        </div>

        <div class="md:w-2/3 p-6 md:p-8">
          <div
            class="flex flex-col md:flex-row md:justify-between md:items-start"
          >
            <div>
              <h1 class="text-3xl font-bold text-primary-800 mb-2">
                {{ currentMusic.title }}
              </h1>
              <p class="text-xl text-primary-600 mb-4">
                {{ currentMusic.artist }}
              </p>
            </div>

            <div class="flex space-x-3 mt-4 md:mt-0">
              <NuxtLink
                :to="`/music/${currentMusic.documentId}/edit`"
                class="btn btn-secondary"
              >
                Edit
              </NuxtLink>
              <button class="btn btn-danger" @click="openDeleteModal">
                Delete
              </button>
            </div>
          </div>

          <div class="mt-8 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Album</h3>
                <p class="text-primary-800 font-medium">
                  {{ currentMusic.album }}
                </p>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">
                  Release Year
                </h3>
                <p class="text-primary-800 font-medium">
                  {{ currentMusic.year }}
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-medium text-gray-500 mb-1">Genre</h3>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {{ currentMusic.genre }}
              </span>
            </div>

            <div class="pt-6">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Added On</h3>
              <p class="text-primary-600">
                {{ formatDate(currentMusic.createdAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      v-model="showDeleteModal"
      :item-id="currentMusic?.documentId || null"
      @confirm="confirmDelete"
    />
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
const config = useRuntimeConfig();

const { currentMusic, loading, loadMusicById, removeMusic, resetCurrentMusic } =
  useMusic();

const showDeleteModal = ref(false);

const coverImageUrl = computed(() => {
  return `${config.public.apiBase}${currentMusic.value?.coverImage?.url}`;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const confirmDelete = async (itemId: number) => {
  const success = await removeMusic(itemId);
  if (success) {
    router.push("/");
  }
};

onMounted(async () => {
  console.log("Loading music with ID:", id.value, route.params);
  // Ensure we pass a string, not an array
  const documentId = Array.isArray(id.value) ? id.value[0] : id.value;
  const success = await loadMusicById(documentId);
  if (!success) {
    // Music not found
  }
});

onBeforeUnmount(() => {
  resetCurrentMusic();
});
</script>
