<script setup lang="ts">
import type { Machine } from '../data/machines'
import { computed } from 'vue'
import { PropType } from 'vue'

const props = defineProps({
    machine: {
        type: Object as PropType<Machine>,
        required: true //obligatoria para evitar errores
    }
})

const statusColor = computed(() => {
    if (props.machine.status === 'operational') return 'green'
    if (props.machine.status === 'warning') return 'orange'
    if (props.machine.status === 'maintenance') return 'red'
    return 'gray'
})

const statusText = computed(() => {
    const status = props.machine.status
    if (status === 'operational') return 'Operativa'
    if (status === 'warning') return 'Advertencia'
    if (status === 'maintenance') return 'Mantenimiento'
    return 'Desconocido'
})

const isMaintenanceNeeded = computed(() => {
    const lastMaintenance = new Date(props.machine.lastMaintenance)
    const now = new Date()
    const daysDiff = (now.getTime() - lastMaintenance.getTime()) / (1000 * 3600 * 24)
    return daysDiff > 30
})
</script>

<template>
    <div class="machine-card">
        <div class="machine-header">
            <h3>{{ machine.name }}</h3>
            <span class="status-badge" :style="{ backgroundColor: statusColor }">
                {{ statusText }}
            </span>
        </div>

        <div class="machine-details">
            <div class="detail-row">
                <span>Línea:</span>
                <strong>{{ machine.line }}</strong>
            </div>

            <div class="detail-row">
                <span>Eficiencia:</span>
                <strong>{{ machine.efficiency.toFixed(1) }}%</strong>
            </div>

            <div class="detail-row">
                <span>Temperatura:</span>
                <strong>{{ machine.temperature }}°C</strong>
            </div>

            <div v-if="isMaintenanceNeeded" class="warning-message">
                ⚠️ Requiere mantenimiento
            </div>
        </div>

        <div class="machine-actions">
            <router-link :to="'/machine/' + machine.id" class="action-btn">Ver Detalles</router-link>
        </div>
    </div>
</template>

<style scoped>
.machine-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    color: #213547;
}

.machine-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.machine-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.machine-header h3 {
    margin: 0;
    font-size: 1.25rem;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    color: white;
    font-weight: 500;
}

.machine-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
}

.warning-message {
    color: #f59e0b;
    font-weight: 500;
    margin-top: 0.5rem;
}

.machine-actions {
    margin-top: 1rem;
}

.machine-actions button {
    width: 100%;
}

.machine-actions a {
    color: inherit;
    text-decoration: none;
}

.action-btn {
    display: block;
    width: 100%;
    text-align: center;
    background-color: #f3f4f6;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.2s;
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
}

.action-btn:hover {
    background-color: #e5e7eb;
}


@media (prefers-color-scheme: dark) {
    .machine-card {
        background-color: #1a1a1a;
        border-color: #444;
        color: rgba(255, 255, 255, 0.87);
    }
    .action-btn {
        background-color: #343434;
    }
    .action-btn:hover {
        background-color: #444444;
    }
}
</style>
