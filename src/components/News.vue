<script setup>
import { ref, onMounted } from 'vue';
import config from '@/assets/config.json';
const serviceUrl = process.env.NODE_ENV === 'development'
    ? (config.dev.tudorzone ?? config.tudorzone) + config.data
    : config.tudorzone + config.data;
const newsItems = ref([]);

onMounted(async () => {
    fetch(serviceUrl, {
        headers: {
            'x-tudormobile-api': config.serviceId,
            'x-tudormobile-client': config.client,
            'x-tudormobile-rss': config.newsRssUrl,
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error('Unauthorized: Invalid service or key.');
        } else {
            throw new Error(`HTTP error; status: ${response.status}`);
        }
    }).then((data) => {
        newsItems.value = data.items;
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
});

</script>
<template>
    <div class="news-page">
        <ul>
            <li v-for="(item, index) in newsItems" :key="index">
                <div class="item-title">
                    <img src="@/assets/icons/news-icon.svg" width="24" alt="News" />
                    <a :href="item.link" target="_blank" rel="noopener">{{ item.title }}</a>
                </div>
                <div class="item-footer">{{ item.pubDate }}</div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.news-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.item-title {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}
.item-footer {
    font-size: 0.8em;
    color: gray;
    margin-bottom: 1.5em;
    text-align: right;
}
</style>