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
    <div class="mt-4">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Nom</th>
            <th class="border border-gray-300 p-2">Email</th>
            <th class="border border-gray-300 p-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border border-gray-300 p-2">{{ user.name }}</td>
            <td class="border border-gray-300 p-2">{{ user.email }}</td>
            <td class="border border-gray-300 p-2">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
