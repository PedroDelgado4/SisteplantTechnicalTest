<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMachineStore } from '../stores/machineStore'
import MachineCard from '../components/MachineCard.vue'
import type { Machine } from '../data/machines'


const store = useMachineStore()

const selectedLine = ref('all')

const filteredMachines = computed(() => {
    if (selectedLine.value === 'all') {
        return store.machines
    }
    // refactor: cambio de foreach por .filter()
    return store.machines.filter(m => m.line === selectedLine.value)
})


const lineStats = computed(() => {
    const operational = filteredMachines.value.filter((m: Machine) => m.status === 'operational').length
    const maintenance = filteredMachines.value.filter((m: Machine) => m.status === 'maintenance').length
    const warning = filteredMachines.value.filter((m: Machine) => m.status === 'warning').length

    return { operational, maintenance, warning }
})

const productionLines = ['all', 'Línea A', 'Línea B', 'Línea C']
</script>

<template>
    <div class="production-lines">
        <h1>Líneas de Producción</h1>

        <div class="filters">
            <label>Filtrar por línea:</label>
            <select v-model="selectedLine">
                <option v-for="line in productionLines" :key="line" :value="line">
                    {{ line === 'all' ? 'Todas las líneas' : line }}
                </option>
            </select>
        </div>

        <div class="line-stats">
            <div class="stat-item">
                <span class="stat-label">Operativas:</span>
                <span class="stat-value operational">{{ lineStats.operational }}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Advertencia:</span>
                <span class="stat-value warning">{{ lineStats.warning }}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Mantenimiento:</span>
                <span class="stat-value maintenance">{{ lineStats.maintenance }}</span>
            </div>
        </div>

        <div class="machines-grid">
            <MachineCard v-for="machine in filteredMachines" :key="machine.id ":machine="machine" />
        </div>
    </div>
</template>

<style scoped>
.production-lines {
    padding: 2rem;
}

h1 {
    margin-bottom: 2rem;
}

.filters {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
}

.filters label {
    font-weight: 500;
}

.filters select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.line-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 8px;
    flex-wrap: wrap; /* Añadimos flex-wrap para que los elementos salten de linea si es necesario*/
}
@media (max-width: 768px) {
    .line-stats {
        flex-direction: column;
        gap: 1rem;
    }
}
.stat-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.stat-label {
    font-weight: 500;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
}

.stat-value.operational {
    color: #10b981;
    background-color: #d1fae5;
}

.stat-value.warning {
    color: #f59e0b;
    background-color: #fef3c7;
}

.stat-value.maintenance {
    color: #ef4444;
    background-color: #fee2e2;
}

.machines-grid {
    display: grid;
    /* Cambiamos el 250px fijo por min */
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 1.5rem;
}

@media (prefers-color-scheme: dark) {
    .line-stats {
        background-color: #1a1a1a;
    }
}
</style>
