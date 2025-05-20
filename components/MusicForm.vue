<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="form-group">
      <label for="title" class="form-label">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        class="input"
        :class="{ 'border-red-500': errors.title }"
        placeholder="Enter song title"
      />
      <p v-if="errors.title" class="error-text">{{ errors.title }}</p>
    </div>

    <div class="form-group">
      <label for="artist" class="form-label">Artist</label>
      <input
        id="artist"
        v-model="form.artist"
        type="text"
        class="input"
        :class="{ 'border-red-500': errors.artist }"
        placeholder="Enter artist name"
      />
      <p v-if="errors.artist" class="error-text">{{ errors.artist }}</p>
    </div>

    <div class="form-group">
      <label for="album" class="form-label">Album</label>
      <input
        id="album"
        v-model="form.album"
        type="text"
        class="input"
        :class="{ 'border-red-500': errors.album }"
        placeholder="Enter album name"
      />
      <p v-if="errors.album" class="error-text">{{ errors.album }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-group">
        <label for="genre" class="form-label">Genre</label>
        <input
          id="genre"
          v-model="form.genre"
          type="text"
          class="input"
          :class="{ 'border-red-500': errors.genre }"
          placeholder="Enter genre (e.g. Rock, Pop, Jazz)"
        />
        <p v-if="errors.genre" class="error-text">{{ errors.genre }}</p>
      </div>

      <div class="form-group">
        <label for="year" class="form-label">Release Date</label>
        <input
          id="year"
          v-model="form.year"
          type="date"
          max="9999-12-31"
          class="input"
          :class="{ 'border-red-500': errors.year }"
          placeholder="Select release date"
        />
        <p v-if="errors.year" class="error-text">
          {{ errors.year }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-group">
        <label for="coverImage" class="form-label">Cover Image</label>

        <div class="flex items-start space-x-4">
          <div
            class="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
            :class="{
              'border-2 border-dashed border-gray-300':
                !previewImage && !initialImage,
            }"
          >
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="Cover preview"
              class="w-full h-full object-cover"
            />
            <img
              v-else-if="initialImage"
              :src="initialImage"
              alt="Current cover"
              class="w-full h-full object-cover"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex flex-col">
              <input
                id="coverImage"
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
              />
              <button
                type="button"
                class="btn btn-secondary mb-2"
                @click="fileInput?.click()"
              >
                {{ initialImage ? "Change Image" : "Upload Image" }}
              </button>
              <button
                v-if="previewImage || initialImage"
                type="button"
                class="btn text-sm text-error-500 bg-transparent hover:bg-error-50"
                @click="clearImage"
              >
                Remove Image
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">JPEG, PNG or GIF, max 2MB</p>
            <p v-if="errors.coverImage" class="error-text mt-1">
              {{ errors.coverImage }}
            </p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="musicFile" class="form-label">Music File</label>

        <div class="flex items-start space-x-4">
          <div
            class="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
            :class="{
              'border-2 border-dashed border-gray-300':
                !previewMusicImage && !initialMusicImage,
            }"
          >
            <img
              v-if="previewMusicImage"
              :src="previewMusicImage"
              alt="Cover preview"
              class="w-full h-full object-cover"
            />
            <img
              v-else-if="initialMusicImage"
              :src="initialMusicImage"
              alt="Current cover"
              class="w-full h-full object-cover"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div class="flex-1">
            <div class="flex flex-col">
              <input
                id="musicFile"
                ref="fileInput2"
                type="file"
                accept="audio/*"
                class="hidden"
                @change="handleMusicFileChange"
              />
              <button
                type="button"
                class="btn btn-secondary mb-2"
                @click="fileInput2?.click()"
              >
                {{ initialMusicImage ? "Change Music" : "Upload Music" }}
              </button>
              <button
                v-if="previewMusicImage || initialMusicImage"
                type="button"
                class="btn text-sm text-error-500 bg-transparent hover:bg-error-50"
                @click="clearMusic"
              >
                Remove Music
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">JPEG, PNG or GIF, max 2MB</p>
            <p v-if="errors.musicUrl" class="error-text mt-1">
              {{ errors.musicUrl }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" class="btn btn-secondary" @click="cancel">
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="loading"
        :class="{ 'opacity-70 cursor-wait': loading }"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ music ? "Update Music" : "Create Music" }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import * as yup from "yup";
import type { Music } from "~/types/music";
const config = useRuntimeConfig();

const props = defineProps<{
  music?: Music | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    data: {
      title: string;
      artist: string;
      album: string;
      genre: string;
      year: string;
      coverImage: File | null;
      musicUrl: File | null;
    }
  ): void;
  (e: "cancel"): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileInput2 = ref<HTMLInputElement | null>(null);
// Define template refs for TypeScript
const $refs = {
  fileInput: fileInput,
  fileInput2: fileInput2,
};

const form = reactive({
  title: "Test Song",
  artist: "Test Artist",
  album: "Test Album",
  genre: "Test Genre",
  year: new Date().toISOString().split("T")[0],
  coverImage: null as File | null,
  musicUrl: null as File | null,
});

const errors = reactive({
  title: "",
  artist: "",
  album: "",
  genre: "",
  year: "",
  coverImage: "",
  musicUrl: "",
});

const previewImage = ref<string | null>(null);
const previewMusicImage = ref<string | null>(null);
const initialMusicImage = computed(() => {
  if (!props.music?.musicUrl) return null;
  return config.public.apiBase + props.music.musicUrl.url;
});
const currentYear = new Date().getFullYear();

const initialImage = computed(() => {
  if (!props.music?.coverImage) return null;
  return config.public.apiBase + props.music.coverImage.url;
});

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  artist: yup.string().required("Artist is required"),
  album: yup.string().required("Album is required"),
  genre: yup.string().required("Genre is required"),
  year: yup
    .string()
    .required("Release date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),

  coverImage: yup.mixed(),
});

const resetErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key as keyof typeof errors] = "";
  });
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    form.coverImage = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const clearImage = () => {
  form.coverImage = null;
  previewImage.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const handleMusicFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    form.musicUrl = file;
    previewMusicImage.value = URL.createObjectURL(file);
  }
};
const clearMusic = () => {
  form.musicUrl = null;
  previewMusicImage.value = null;
  if (fileInput2.value) {
    fileInput2.value.value = "";
  }
};

const handleSubmit = async () => {
  resetErrors();

  try {
    await schema.validate(form, { abortEarly: false });
    emit("submit", { ...form });
  } catch (validationError: any) {
    if (validationError.inner) {
      validationError.inner.forEach((error: any) => {
        errors[error.path as keyof typeof errors] = error.message;
      });
    }
  }
};

const cancel = () => {
  emit("cancel");
};

onMounted(() => {
  if (props.music) {
    form.title = props.music.title;
    form.artist = props.music.artist;
    form.album = props.music.album;
    form.genre = props.music.genre;

    // Adapter le champ 'year' (string de type ISO ou déjà formatée)
    if (props.music.year) {
      const date = new Date(props.music.year);
      form.year = date.toISOString().split("T")[0]; // format yyyy-MM-dd
    }
  }
});
</script>
