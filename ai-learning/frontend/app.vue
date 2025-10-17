<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        AI チャット PoC
      </h1>
      
      <!-- チャット履歴 -->
      <div class="max-w-4xl mx-auto mb-6">
        <div class="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto">
          <div v-if="conversations.length === 0" class="text-gray-500 text-center">
            会話を始めてください...
          </div>
          
          <div v-for="(conv, index) in conversations" :key="index" class="mb-4">
            <!-- ユーザーメッセージ -->
            <div class="flex justify-end mb-2">
              <div class="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                {{ conv.prompt }}
              </div>
            </div>
            
            <!-- AIレスポンス -->
            <div class="flex justify-start">
              <div class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                {{ conv.response }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 入力フォーム -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <form @submit.prevent="sendMessage" class="flex gap-4">
            <input
              v-model="newMessage"
              type="text"
              placeholder="メッセージを入力してください..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isLoading"
            />
            <button
              type="submit"
              :disabled="isLoading || !newMessage.trim()"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? '送信中...' : '送信' }}
            </button>
          </form>
        </div>
      </div>
      
      <!-- エラーメッセージ -->
      <div v-if="error" class="max-w-4xl mx-auto mt-4">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const newMessage = ref('')
const conversations = ref([])
const isLoading = ref(false)
const error = ref('')

// APIクライアント
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${config.public.apiBase}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`API エラー: ${response.status}`)
  }
  
  return response.json()
}

// メッセージ送信
const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return
  
  const prompt = newMessage.value.trim()
  newMessage.value = ''
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await apiRequest('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    })
    
    if (result.success) {
      conversations.value.push({
        prompt,
        response: result.response,
      })
    } else {
      error.value = result.error || 'エラーが発生しました'
    }
  } catch (err) {
    error.value = 'APIとの通信に失敗しました'
    console.error('送信エラー:', err)
  } finally {
    isLoading.value = false
  }
}

// 履歴読み込み
const loadHistory = async () => {
  try {
    const result = await apiRequest('/ai/history')
    if (result.success) {
      conversations.value = result.conversations.reverse() // 古い順に表示
    }
  } catch (err) {
    console.error('履歴読み込みエラー:', err)
  }
}

// ページ読み込み時に履歴を取得
onMounted(() => {
  loadHistory()
})
</script>