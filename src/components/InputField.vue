<script setup>
const props = defineProps({
    label: { type: String },
    text: { type: String },
    placeholder: { type: String },
    isCurrency: {type: Boolean, default: false}
})

defineEmits(['update:modelValue'])

</script>

<template>
    <div>
        <label :for="label" class="block text-sm font-medium text-gray-700">{{text}}</label>
        <div class="mt-1 relative ">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400" v-if="isCurrency">
                €
            </div>
            <input :id="label" :name="label" :type="label" :autocomplete="label" required=""
                :placeholder="placeholder"  @input="(e) => $emit('update:modelValue', e.target.value)"
                class=" block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                :class="isCurrency?'pl-8':''"
                />
            <slot name="right">
            </slot>
        </div>
    </div>
</template>