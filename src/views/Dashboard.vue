<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMachineStore } from '../stores/machineStore'
import MachineCard from '../components/MachineCard.vue'
import type { Machine } from "../data/machines";

const store = useMachineStore()

// dejamos un solo onmounted para pedir los dats
onMounted(() => {
    store.fetchMachines()
})

// Refactorizacion: usamos computed para reactividad

// total reactivo
const totalMachines = computed(() => store.machines.length)

// getter creando anteriormente
const averageEfficiency = computed(() => store.totalEfficiency)


const operationalCount = computed(() => {
    return store.machines.filter((m: Machine) => m.status === 'operational').length
})

const maintenanceCount = computed(() => 
    store.machines.filter((m: Machine) => m.status === 'maintenance').length
)


</script>

<template>
    <div class="dashboard">
        <h1>Dashboard de Producción</h1>

        <div v-if="store.loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando datos de las máquinas...</p>
        </div>
        <div v-else>
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
                        {{operationalCount}}
                    </p>
                </div>

                <div class="stat-card">
                    <h3>En Mantenimiento</h3>
                    <p class="stat-value">
                        {{maintenanceCount}}
                    </p>
                </div>
            </div>

            <h2>Máquinas</h2>

            <div class="machines-grid">
                <MachineCard v-for="machine in store.machines" :key="machine.id" :machine="machine" />
            </div>
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
    /* Cambiamos el 250px fijo por min */
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
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
    /* Aqui tambien cambiamos el 250px fijo por min*/
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 1.5rem;
}

/* Estilos para el estado de carga */
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: #6b7280;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3b82f6; /* Color azul Vue */
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
