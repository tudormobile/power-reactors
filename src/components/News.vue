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
                    <a v-if="item.link" :href="item.link" target="_blank" rel="noopener"><span class="item-link">{{ item.title }}</span><span class="link-symbol">&#x1F517;</span></a>
                    <span v-else>{{ item.title }}</span>
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
.item-link {
    text-decoration: underline;
    color: inherit;
}
.link-symbol {
    margin-left: 4px;
    font-size: 0.8em;
}
@media (prefers-color-scheme: dark) {
    .item-title img {
        filter: invert(97%) sepia(2%) saturate(4393%) hue-rotate(181deg) brightness(107%) contrast(91%);
    }
}
.item-footer {
    font-size: 0.8em;
    color: gray;
    margin-bottom: 1.5em;
    text-align: right;
}
</style>