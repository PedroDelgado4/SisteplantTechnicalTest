<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

// convertimos la variable en reactiva con ref para que vue note el cambio
const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const navigate = (path: string) => {
    router.push(path)
    isMenuOpen.value = false
}
</script>

<template>
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <h1>Sisteplant</h1>
                <span class="subtitle">Control de Producción</span>
            </div>

            <button class="menu-toggle" @click="toggleMenu">
                ☰
            </button>

            <nav class="nav" :class="{ open: isMenuOpen }">
                <a @click="navigate('/')">Dashboard</a>
                <a @click="navigate('/production-lines')">Líneas de Producción</a>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #1e3a8a;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h1 {
    font-size: 1.5rem;
    margin: 0;
}

.subtitle {
    font-size: 0.875rem;
    opacity: 0.9;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

.nav {
    display: flex;
    gap: 2rem;
}

.nav a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s;
}

.nav a:hover {
    opacity: 0.8;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #1e3a8a;
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        z-index: 99; /* para que esté por encima de todo */
    }

    .nav.open {
        display: flex;
    }
}
</style>
