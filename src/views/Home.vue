<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 sm:p-12 text-center">
      <h2 class="text-3xl sm:text-4xl font-extrabold mb-3 text-green-600">Deine persönliche Fußballgeschichte</h2>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
        Eltern, Großeltern und Freunde erzählen über dein Kind – die KI macht daraus eine Geschichte voller Fußballmagie!
      </p>

      <RouterLink
        to="/create"
        class="inline-block transform transition-all duration-200 ease-out hover:scale-105 focus:scale-105 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md"
      >
        Jetzt starten
      </RouterLink>
    </div>
  </section>
</template>
