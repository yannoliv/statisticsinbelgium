<script setup>
import { supabase } from '@/composables/supabase'
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

import InputField from '@/components/InputField.vue';

const moods = [
  { mood: '😉', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
  { mood: '🥳', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500' },
  { mood: '🤔', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
  { mood: '🥱', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
  { mood: '😓', bgColor: 'bg-yellow-500', selectedColor: 'ring-yellow-500' },
]

const selectedMood = ref(moods[0])

var { count, data } = await supabase
  .from('Salary')
  .select()
  .order('created_at')


var formData = {
  'job_position': '',
  'salary_bruto': 0,
  'salary_netto': 0,
  'car_model': '',
  'experience': 0,
  'happy': selectedMood
}

// Modal forms

const isOpenForm = ref(false)
const isOpenTy = ref(false)

function closeModalForm() {
  isOpenForm.value = false
}
function closeModalTy() {
  isOpenTy.value = false
}
function openModalForm() {
  isOpenForm.value = true
}
function openModalTy() {
  isOpenTy.value = true
}

async function submitModalForm(event) {
  const newLine = {
    'job_position': formData.job_position, 'salary_bruto': parseFloat(formData.salary_bruto),
    'salary_netto': parseFloat(formData.salary_netto), 'car_model': formData.car_model,
    'experience': parseFloat(formData.experience), 'happy': formData.happy.value.mood
  }
  console.log(newLine)
  const { iData, iError } = await supabase
    .from('Salary')
    .insert([newLine])

  data.push(newLine)
  closeModalForm()
  
  setTimeout(function() {
    openModalTy()
  }, 500)
}

</script>

<template>
  <main class="container mx-auto px-4 pb-10">
    <!-- Leading paragraph -->
    <div class="bg-white">
      <div class="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-indigo-600">Compare wages</h2>
          <p class="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">Take control of your
            career.</p>
          <p class="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            By comparing wages you can be more confident if asking for a raise or during solicitations because of this
            data.
          </p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Salaries</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title,
            email and role.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button type="button" @click="openModalForm"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Add salary
          </button>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="w-full flex flex-row flex-no-wrap overflow-hidden divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr v-for="person in data" :key="person.id" class="flex flex-col flex-no wrap sm:table-row py-5">
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">
                      Position</th>
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">Bruto</th>
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">Netto</th>
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">Car</th>
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                    <th scope="col" class="px-3 py-4 text-left text-sm font-semibold text-gray-900">Mood</th>
                  </tr>
                </thead>
                <tbody class="flex-1 sm:flex-none divide-y divide-gray-200 bg-white">
                  <tr v-for="person in data" :key="person.id" class="flex flex-col flex-no wrap sm:table-row py-5">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{
                        person.job_position
                    }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">€ {{ person.salary_bruto }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">€ {{ person.salary_netto }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.car_model }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.experience }} months</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.happy }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fill in ModalForm  -->
    <TransitionRoot appear :show="isOpenForm" as="template">
      <Dialog as="div" @close="closeModalForm" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-10 text-gray-900">
                  Fill in your salary
                </DialogTitle>
                <div class="mt-2">
                  <form class="space-y-6" v-on:submit.prevent="submitModalForm">
                    <div>
                      <InputField label="position" text="Position" placeholder="Software developer"
                        v-model="formData.job_position" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <InputField label="bruto" text="Bruto" placeholder="2600.00" :isCurrency="true"
                        v-model="formData.salary_bruto" />
                      <InputField label="netto" text="Netto" placeholder="2100.00" :isCurrency="true"
                        v-model="formData.salary_netto" />
                    </div>

                    <InputField label="car" text="Car info" placeholder="Volkswagen Golf 2019"
                      v-model="formData.car_model" />

                    <div class="grid grid-cols-2 gap-4">
                      <InputField label="experience" text="Experience" placeholder="20" v-model="formData.experience">
                        <template #right>
                          <small
                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                            months
                          </small>
                        </template>
                      </InputField>

                      <div>
                        <RadioGroup v-model="selectedMood">
                          <RadioGroupLabel class="block text-sm font-medium text-gray-700">Mood at work
                          </RadioGroupLabel>
                          <div class="mt-2 flex items-center space-x-3 flex-wrap">
                            <RadioGroupOption as="template" v-for="mood in moods" :key="mood.mood" :value="mood"
                              v-slot="{ active, checked }">
                              <div
                                :class="[mood.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none']">
                                <span aria-hidden="true" class="bg-white h-6 w-6 rounded-full">
                                  {{ mood.mood }}
                                </span>
                              </div>
                            </RadioGroupOption>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div class="mt-4">
                      <input type="submit"
                        class="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        value="Upload salary" />
                    </div>

                  </form>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Thank you modal -->
    <TransitionRoot appear :show="isOpenTy" as="template">
      <Dialog as="div" @close="closeModalTy" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Thank you 😊
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Your salary has been succesfully submitted, Thank you for participating!
                  </p>
                </div>

                <div class="mt-4">
                  <button type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModalTy">
                    No problem!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </main>
</template>


<style scoped>
  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

</style>