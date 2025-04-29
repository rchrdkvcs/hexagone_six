<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import type AdminUsersController from '../../../app/admin/controllers/admin_users_controller'

defineProps<{
  users: InferPageProps<AdminUsersController, 'render'>
}>()
</script>

<template>
  <div class="size-full p-6">
    <h1 class="text-2xl font-bold">Utilisateurs</h1>
  </div>
</template>
