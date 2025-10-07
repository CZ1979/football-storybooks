<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="border-b bg-white">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">⚽️ Storybooks</h1>
        <nav class="space-x-4 text-sm">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/create">Erstellen</RouterLink>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
