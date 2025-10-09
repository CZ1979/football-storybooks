<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
    <header class="bg-white border-b shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-[#00B86B]">⚽ Fußball-Storybooks</h1>
        <nav class="space-x-4 text-sm font-medium">
          <RouterLink to="/" class="hover:text-[#00B86B]">Home</RouterLink>
          <RouterLink to="/create" class="hover:text-[#00B86B]">Erstellen</RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-6xl mx-auto px-4 py-10">
      <RouterView />
    </main>

    <footer class="bg-white border-t text-sm text-center py-4 text-gray-500">
      © {{ new Date().getFullYear() }} Fußball-Storybooks
    </footer>
  </div>
</template>
