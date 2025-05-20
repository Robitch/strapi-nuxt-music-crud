<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-slide-up"
        @click.stop
      >
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete this music entry? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            class="btn btn-secondary" 
            @click="$emit('update:modelValue', false)"
          >
            Cancel
          </button>
          <button 
            class="btn btn-danger"
            @click="confirm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  itemId: number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', id: number): void
}>()

const confirm = () => {
  if (props.itemId !== null) {
    emit('confirm', props.itemId)
  }
  emit('update:modelValue', false)
}
</script>