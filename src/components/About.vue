<script setup>
const packageVersion = import.meta.env.PACKAGE_VERSION;
</script>

<template>
    <div class="about-page">
        <div class="content">
            <div class="title">
                <img src="@/assets/icons/app-logo.png" width="25%" />
                <div>
                    <span class="app-name">Power Reactors<br /></span>
                    <span>Version: {{ packageVersion }}<br /> </span>
                    <span>© 2026 Bill Tudor</span>
                </div>
            </div>
            <div class="info">
                Power Reactor information, current status, and news reports from the US NRC.
            </div>
        </div>
        <div class="disclaimer">
            <p>Data provided by the public RSS feeds and web application programming interfaces published by the U.S. Nuclear Regulatory Commission (NRC). This application is not sponsored or endorsed by the U.S. Nuclear Regulatory Commission (NRC).</p>
        </div>
    </div>
</template>
<style scoped>
.about-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
}

.content {
    flex-grow: 1;
}

.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 2em;
}

.app-name {
    font-size: 1.5em;
    font-weight: bold;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.disclaimer {
    font-size: 0.8em;
    margin: 2em 0em 0 0em;
    line-height: 1.4em;
    color: var(--color-text-secondary);
    text-align: center;
}
</style>