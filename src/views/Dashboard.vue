<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMachineStore } from '../stores/machineStore'
import MachineCard from '../components/MachineCard.vue'
import { calculateAverageEfficiency } from '../data/machines'

const store = useMachineStore()

const selectedLine = ref('all')

onMounted(() => {
    store.fetchMachines()
})

const averageEfficiency = ref(0)
const calculateAverage = () => {
    try {
        averageEfficiency.value = calculateAverageEfficiency(store.machines)
    } catch (e) {
        console.error('Error calculating efficiency:', e)
        averageEfficiency.value = 0
    }
}

const totalMachines = ref(store.machines.length)

onMounted(() => {
    calculateAverage()
    totalMachines.value = store.machines.length
})
</script>

<template>
    <div class="dashboard">
        <h1>Dashboard de Producción</h1>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Máquinas</h3>
                <p class="stat-value">{{ totalMachines }}</p>
            </div>

            <div class="stat-card">
                <h3>Eficiencia Promedio</h3>
                <p class="stat-value">{{ averageEfficiency.toFixed(1) }}%</p>
            </div>

            <div class="stat-card">
                <h3>Operativas</h3>
                <p class="stat-value">
                    {{store.machines.filter((m: any) => m.status === 'operational').length}}
                </p>
            </div>

            <div class="stat-card">
                <h3>En Mantenimiento</h3>
                <p class="stat-value">
                    {{store.machines.filter((m: any) => m.status === 'maintenance').length}}
                </p>
            </div>
        </div>

        <h2>Máquinas</h2>

        <div class="machines-grid">
            <MachineCard v-for="machine in store.machines" :machine="machine" />
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 2rem;
}

h1 {
    margin-bottom: 2rem;
}

h2 {
    margin: 2rem 0 1rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    opacity: 0.9;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
}

.machines-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
</style>
