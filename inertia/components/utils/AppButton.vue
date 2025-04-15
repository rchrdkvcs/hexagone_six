<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'

const props = withDefaults(
  defineProps<{
    href?: string
    label?: string
    icon?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'tag'
    disabled?: boolean
    loading?: boolean
    value?: string
    active?: boolean
  }>(),
  {
    href: '',
    label: '',
    icon: '',
    variant: 'primary',
    disabled: false,
    loading: false,
    value: '',
    active: false,
  }
)

const getClass = (variant?: string, active?: boolean) => {
  const classes: Record<string, string> = {
    primary: 'bg-white color-black border border-white/10 hover:bg-white/70',
    secondary: 'bg-transparent color-white border border-white/10 hover:bg-white/5',
    ghost: 'bg-transparent color-white/75 hover:color-white hover:bg-white/5',
    tag: active
      ? 'bg-white/15 text-white border-white/15'
      : 'bg-primary-800/25 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 !w-fit backdrop-blur-md transition-all duration-200 !rounded-full px-4',
  }

  return variant ? classes[variant] || '' : ''
}
</script>

<template>
  <component
    :is="props.href ? Link : 'button'"
    :class="[
      'py-2 px-4 rounded-xl flex items-center gap-2 justify-center transition-all duration-300 font-medium',
      getClass(props.variant, props.active),
      props.disabled || props.loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
      props.variant === 'tag' ? 'backdrop-blur-md border border-white/10 !rounded-full' : '',
    ]"
    :disabled="props.disabled || props.loading"
    :href="props.href"
  >
    <i v-if="props.loading" class="i-mdi:loading animate-spin size-5" />
    <i v-else-if="props.icon" :class="props.icon" class="size-5" />
    <span v-if="props.label !== ''">{{ props.label }}</span>
  </component>
</template>
