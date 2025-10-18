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
import { ref, onMounted } from 'vue';

const question = ref('Hello');
const answer = ref('');
const loading = ref(false);
const apiBaseUrl = ref('');

// 設定を動的に読み込み
onMounted(async () => {
  try {
    // まず設定APIから取得を試行
    const configResponse = await $fetch('/api/config');
    apiBaseUrl.value = (configResponse as any).apiBase;
  } catch (error) {
    // フォールバック: 静的設定を使用
    const config = useRuntimeConfig();
    apiBaseUrl.value = config.public.apiBase || 'https://container-apps-sample.thankfulbush-1c2ea568.japaneast.azurecontainerapps.io';
  }
  console.log('Final API Base URL:', apiBaseUrl.value);
});

async function send(){
  if (!apiBaseUrl.value) {
    answer.value = 'API Base URL not configured';
    return;
  }

  loading.value = true;
  try {
    console.log('Sending request to:', apiBaseUrl.value);
    const data = await $fetch(`/ai/chat`, { params: { q: question.value }, baseURL: apiBaseUrl.value });
    answer.value = (data as any).answer;
  } catch (error) {
    console.error('API Error:', error);
    answer.value = `Error: ${error}`;
  } finally { 
    loading.value = false; 
  }
}
</script>
<style scoped>
main { font-family: sans-serif; }
input { margin-right: .5rem; }
pre { background:#f5f5f5; padding:1rem; }
</style>