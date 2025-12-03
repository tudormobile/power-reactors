<script setup>
import { RouterLink, RouterView } from 'vue-router';
const packageVersion = import.meta.env.PACKAGE_VERSION;
</script>

<template>
    <div class="root-container">
        <main class="main-content">
            <RouterView v-slot="{ Component, route }">
                <component :is="Component" :key="$route.fullPath" />
            </RouterView>
        </main>

        <nav class="nav-bar">
            <RouterLink to="/plants" class="nav-item"
                :class="{ active: $route.path.startsWith('/plants') || $route.path === '/' }" replace>
                <div><img src="../assets/icons/power-icon.svg" alt="Plants Icon"
                        :class="{ active: $route.path.startsWith('/plants') || $route.path === '/' }" /></div>
                <div>Power Reactors</div>
            </RouterLink>
            <RouterLink to="/news" class="nav-item" :class="{ active: $route.path.startsWith('/news') }" replace>
                <div><img src="../assets/icons/news-icon.svg" alt="News Icon"
                        :class="{ active: $route.path.startsWith('/news') }"></div>
                <div>NRC News</div>
            </RouterLink>
            <RouterLink to="/about" class="nav-item" :class="{ active: $route.path.startsWith('/about') }" replace>
                <div><img src="../assets/icons/about-icon.svg" alt="About Icon"
                        :class="{ active: $route.path.startsWith('/about') }"></div>
                <div>About</div>
            </RouterLink>
        </nav>
        <div class="footer">v{{ packageVersion }}</div>
    </div>
</template>

<style scoped>
.root-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

img {
    width: 24px;
    height: 24px;
}

img.active {
    filter: invert(17%) sepia(16%) saturate(966%) hue-rotate(161deg) brightness(92%) contrast(92%);
}

@media (prefers-color-scheme: dark) {
    img {
        width: 18px;
        height: 18px;
        filter: invert(100%)
    }

    img.active {
        filter: invert(97%) sepia(2%) saturate(4393%) hue-rotate(181deg) brightness(107%) contrast(91%);
    }
}

.main-content {
    flex: 1;
    overflow-y: auto;
    padding: 60px 26px calc(120px + env(safe-area-inset-bottom));
    -webkit-overflow-scrolling: touch;
}

.nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--color-navigation-background);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1px 0 max(28px, env(safe-area-inset-bottom, 0px));
    z-index: 1000;
    border-top: 1px solid var(--color-navigation-border);
}

.nav-item {
    flex: 1;
    color: var(--color-navigation-text);
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px 2px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease, border-bottom 0.3s ease, font-weight 0.2s ease, transform 0.2s ease;
    text-align: center;
    border-bottom: 4px solid transparent;
}

.nav-item.active {
    background: var(--color-navigation-background-active);
    font-weight: 600;
    border-bottom: 4px solid var(--color-navigation-border-active);
    color: var(--color-navigation-text-active);
}

.footer {
    position: fixed;
    bottom: 2px;
    left: 0;
    right: 0;
    background-color: transparent;
    text-align: right;
    color: var(--color-text-secondary);
    font-size: 10px;
    z-index: 1001;
    padding: 0px 34px 4px 16px;
}
</style>