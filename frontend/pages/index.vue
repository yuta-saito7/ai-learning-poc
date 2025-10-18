<template>
  <main class="p-6">
    <h1>AI Learning PoC</h1>
    <p>バックエンドのOpenAIチャットテスト</p>
    <div class="debug-info">
      <strong>API Base URL:</strong> {{ apiBaseUrl }}
    </div>
    <form @submit.prevent="send">
      <input v-model="question" placeholder="質問" />
      <button>送信</button>
    </form>
    <div v-if="loading">送信中...</div>
    <pre v-if="answer">{{ answer }}</pre>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const config = useRuntimeConfig();
const question = ref('Hello');
const answer = ref('');
const loading = ref(false);
const apiBaseUrl = config.public.apiBase;

async function send(){
  loading.value = true;
  try {
    console.log('API Base URL:', apiBaseUrl); // デバッグ用
    const data = await $fetch(`/ai/chat`, { params: { q: question.value }, baseURL: apiBaseUrl });
    answer.value = (data as any).answer;
  } finally { loading.value = false; }
}
</script>
<style scoped>
main { font-family: sans-serif; }
input { margin-right: .5rem; }
pre { background:#f5f5f5; padding:1rem; }
</style>