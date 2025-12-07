<script setup>
import { ref, onMounted, computed } from 'vue';

import config from '@/assets/config.json';
import plants from '@/assets/plants.json';
import plantsIconGray from '@/assets/icons/plants-icon-gray.png';
import plantsIconGreen from '@/assets/icons/plants-icon-green.png';
import plantsIconRed from '@/assets/icons/plants-icon-red.png';
import plantsIconYellow from '@/assets/icons/plants-icon-yellow.png';

const serviceUrl = process.env.NODE_ENV === 'development'
    ? (config.dev.tudorzone ?? config.tudorzone) + config.data
    : config.tudorzone + config.data;

let stations = ref(plants);
let lastUpdated = ref(null);

// Plant links: https://www.nrc.gov/info-finder/reactors/ano1.html


onMounted(async () => {
    fetch(serviceUrl, {
        headers: {
            'x-tudormobile-api': config.serviceId,
            'x-tudormobile-client': config.client,
            'x-tudormobile-rss': config.statusRssUrl,
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
        processData(data);
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
});

function processData(data) {
    let updatedStations = stations.value.map((station) => {
        let updatedStation = { ...station };
        let stationData = data.items.find((item) => item.title.startsWith(station.Name));
        if (stationData) {
            let powerMatch = stationData.title.match(/- (\d+)% power/i);
            let power = powerMatch ? powerMatch[1] : null;
            updatedStation.Status = power;
            updatedStation.link = stationData.link.replace('/reactors/', '/info-finder/reactors/');
        }
        return updatedStation;
    });
    stations.value = updatedStations;
    
    // Convert ISO date to local date/time without seconds
    const date = new Date(data.pubDate);
    lastUpdated.value = date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function statusColor(p) {
    if (p === undefined) {
        return plantsIconGray;
    }
    else if (p === "100") {
        return plantsIconGreen;
    } else if (p === "0") {
        return plantsIconRed;
    } else {
        return plantsIconYellow;
    }
};
function showStation(link) {
    if (link != undefined && link != null && link.length > 0) {
        window.open(link, '_blank');
    }
}
</script>

<template>
    <div class="plants-page">
        <div class="last-updated">{{ lastUpdated }}</div>
        <ul>
            <li v-for="station in stations" :key="station.Name">
                <div class="plant-item">
                    <div class="plant-item-title" @click="showStation(station.link)">
                        <img :src="`${config.nrcApiBaseUrl}${station.Image}`" :alt="station.Name" />
                        <div class="plant-details">
                            <span class="plant-status">
                                <img :src="`${statusColor(station.Status)}`" />
                                <h1>{{ station.Name }}</h1>
                            </span>
                            <span class="plant-status-power" v-if="station.Status !== undefined">{{ station.Status }}%
                                Power</span>
                        </div>
                    </div>
                    <div v-for="(tag, key) in station.Tags" :key="key">
                        <span class="tag-key">{{ key }}:</span><span class="tag-value">{{ tag }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.last-updated {
    font-size: 0.8em;
    color: var(--color-text-secondary);
    position: fixed;
    top: 30px;
    left: 4px;
    right: 4px;
    z-index: 1000;
    text-align: right;
}

.plants-page {
    padding: 0.25em 0em;
}

.plant-item {
    margin-bottom: 1em;
}

.plant-item-title {
    display: flex;
    flex-direction: row;
    cursor: pointer;
}

.plant-item img {
    width: 125px;
    height: 93px;
    margin-right: 0.5em;
}

.plant-details {
    display: flex;
    flex-direction: column;
}

.plant-details h1 {
    font-size: 1em;
    margin: 0;
}

.plant-details img {
    width: 64px;
    height: 64px;
    filter: invert(1);
}

.tag-key {
    font-weight: bold;
    margin-right: 0.5em;
    font-size: 0.8em;
}

.tag-value {
    font-size: 0.8em;
}

.plant-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
}

.plant-status img {
    filter: none;
}

.plant-status-power {
    font-size: 0.8em;
    font-weight: 600;
    color: var(--color-text-accent);
}
</style>