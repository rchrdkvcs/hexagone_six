<script lang="ts" setup>
const actualYear = new Date().getFullYear()
</script>

<template>
  <footer class="container mx-auto px-4 py-10 border-t border-white/10">
    <div class="flex justify-between items-center gap-6">
      <div>
        <p class="text-xl font-bold mb-1">R6CALLS</p>
        <p class="color-white/60 text-sm">&copy; {{ actualYear }} R6Calls. Tous droits réservés.</p>
      </div>

      <ul class="flex items-center gap-6">
        <li>
          <a
            class="flex items-center justify-center gap-2 color-white transition-all duration-300 color-white/60 hover:color-white/100"
            href="https://discord.com"
          >
            <i class="i-mdi:discord size-6"></i>
          </a>
        </li>
        <li>
          <a
            class="flex items-center justify-center gap-2 color-white transition-all duration-300 color-white/60 hover:color-white/100"
            href="https://twitter.com"
          >
            <i class="i-mdi:twitter size-6"></i>
          </a>
        </li>
      </ul>

      <div class="flex gap-6 text-sm color-white/60">
        <a class="hover:color-white transition-colors" href="#">Contact</a>
        <a class="hover:color-white transition-colors" href="#">Mentions légales</a>
      </div>
    </div>
  </footer>
</template>
