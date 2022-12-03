<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBalDsdP8XhbkLZJxaIrNz1CsqxPsrX7s8",
  authDomain: "statisticsinbelgium.firebaseapp.com",
  projectId: "statisticsinbelgium",
  storageBucket: "statisticsinbelgium.appspot.com",
  messagingSenderId: "321860284939",
  appId: "1:321860284939:web:c5b8956cf838b3172bcd0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const navigation = [
  { name: 'Home', to: '/' },
]


</script>

<template>
  <div>
  <header class="bg-indigo-600">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
        <div class="flex items-center">
          <a href="#">
            <span class="sr-only">Your Company</span>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
          </a>
          <div class="ml-10 hidden space-x-8 lg:block">
            <RouterLink v-for="link in navigation" :key="link.name" :to="link.to" class="text-base font-medium text-white hover:text-indigo-50">{{ link.name }}</RouterLink>
          </div>
        </div>
        <div class="ml-10 space-x-4">
          <!-- <RouterLink to="/input" href="#" class="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50">Fill in</RouterLink> -->
        </div>
      </div>
      <div class="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
        <a v-for="link in navigation" :key="link .name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">{{ link.name }}</a>
      </div>
    </nav>
  </header>

  <Suspense>
    <RouterView></RouterView>
  </Suspense>
</div>
</template>
