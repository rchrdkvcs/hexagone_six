<script lang="ts" setup>
import { InferPageProps } from '@adonisjs/inertia/types'
import type AdminUsersController from '#controllers/admin/admin_users_controller'

const props = defineProps<{
  users: InferPageProps<AdminUsersController, 'render'>
}>()

console.log('users', props.users)
</script>

<template></template>

<style scoped></style>
