<template>
  <div class="overflow-x-auto rounded-lg shadow-sm">
    <table class="w-full bg-white">
      <thead>
        <tr class="text-left bg-gray-50 border-b">
          <th
            v-for="header in tableHeaders"
            :key="header.field"
            class="px-4 py-3 text-sm font-medium text-primary-600 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            @click="handleSort(header.field)"
          >
            <div class="flex items-center">
              {{ header.label }}
              <span v-if="sortField === header.field" class="ml-1">
                {{ sortDirection === "asc" ? "↑" : "↓" }}
              </span>
            </div>
          </th>
          <th class="px-4 py-3 text-sm font-medium text-primary-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in music"
          :key="item.id"
          class="border-b hover:bg-gray-50 transition-colors duration-200"
        >
          <td class="px-4 py-3">
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded overflow-hidden bg-gray-100 mr-3 flex-shrink-0"
              >
                <img
                  v-if="getCoverImage(item)"
                  :src="getCoverImage(item)"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
                    />
                  </svg>
                </div>
              </div>
              <span class="font-medium">{{ item.title }}</span>
            </div>
          </td>
          <td class="px-4 py-3">{{ item.artist }}</td>
          <td class="px-4 py-3">{{ item.album }}</td>
          <td class="px-4 py-3">
            <span
              class="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
            >
              {{ item.genre }}
            </span>
          </td>
          <td class="px-4 py-3">{{ item.year }}</td>
          <td class="px-4 py-3">
            <div class="flex space-x-2">
              <button
                class="text-gray-500 hover:text-primary-600 transition-colors duration-200"
                @click="navigateToDetail(item.documentId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <button
                class="text-gray-500 hover:text-accent-600 transition-colors duration-200"
                @click="navigateToEdit(item.documentId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>

              <button
                class="text-gray-500 hover:text-error-500 transition-colors duration-200"
                @click="$emit('delete', item.documentId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Music } from "~/types/music";
const config = useRuntimeConfig();

const props = defineProps<{
  music: Music[];
  sortField: string;
  sortDirection: "asc" | "desc";
}>();

const emit = defineEmits<{
  (e: "sort", field: string): void;
  (e: "delete", id: number): void;
}>();

const router = useRouter();

const tableHeaders = [
  { field: "title", label: "Title" },
  { field: "artist", label: "Artist" },
  { field: "album", label: "Album" },
  { field: "genre", label: "Genre" },
  { field: "year", label: "Year" },
];

const getCoverImage = (music: Music) => {
  if (!music.coverImage) return null;
  return config.public.apiBase + music.coverImage?.url;
};

const handleSort = (field: string) => {
  emit("sort", field);
};

const navigateToDetail = (id: number) => {
  router.push(`/music/${id}`);
};

const navigateToEdit = (id: number) => {
  router.push(`/music/${id}/edit`);
};
</script>
