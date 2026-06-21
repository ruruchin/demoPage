<template>
  <VueLenis
    root
    :options="{
      lerp: 0.1,
      smoothWheel: true,
    }"
  >
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </VueLenis>
</template>
