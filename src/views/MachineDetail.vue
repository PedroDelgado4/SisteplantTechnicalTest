<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMachineStore } from '../stores/machineStore'

const route = useRoute()
const router = useRouter()
const store = useMachineStore()

const machine = ref<any>(null)
const isEditing = ref(false)

const formData = ref({
    name: '',
    efficiency: 0,
    temperature: 0
})

onMounted(() => {
    const id = parseInt(route.params.id as string)
    machine.value = store.getMachineById(id)

    formData.value = {
        name: machine.value.name,
        efficiency: machine.value.efficiency,
        temperature: machine.value.temperature
    }
})

watch(() => route.params.id, (newId) => {
    const id = parseInt(newId as string)
    machine.value = store.getMachineById(id)
})

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const saveChanges = () => {
    const id = parseInt(route.params.id as string)
    store.updateMachine(id, formData.value)
    machine.value = { ...machine.value, ...formData.value }
    isEditing.value = false
    alert('Cambios guardados')
}

const cancelEdit = () => {
    formData.value = {
        name: machine.value.name,
        efficiency: machine.value.efficiency,
        temperature: machine.value.temperature
    }
    isEditing.value = false
}

const goBack = () => {
    router.push('/')
}
</script>

<template>
    <div class="machine-detail">
        <button @click="goBack" class="back-button">← Volver</button>

        <div class="detail-header">
            <h1>{{ machine.name }}</h1>
            <button @click="toggleEdit" class="edit-button">
                {{ isEditing ? 'Cancelar' : 'Editar' }}
            </button>
        </div>

        <div class="detail-content">
            <div class="info-section">
                <h2>Información General</h2>

                <div class="info-grid">
                    <div class="info-item">
                        <label>Nombre:</label>
                        <input v-if="isEditing" v-model="formData.name" type="text" />
                        <span v-else>{{ machine.name }}</span>
                    </div>

                    <div class="info-item">
                        <label>Línea de Producción:</label>
                        <span>{{ machine.line }}</span>
                    </div>

                    <div class="info-item">
                        <label>Estado:</label>
                        <span :class="'status-' + machine.status">{{ machine.status }}</span>
                    </div>

                    <div class="info-item">
                        <label>Eficiencia:</label>
                        <input v-if="isEditing" v-model="formData.efficiency" type="number" />
                        <span v-else>{{ machine.efficiency }}%</span>
                    </div>

                    <div class="info-item">
                        <label>Temperatura:</label>
                        <input v-if="isEditing" v-model="formData.temperature" type="number" />
                        <span v-else>{{ machine.temperature }}°C</span>
                    </div>

                    <div class="info-item">
                        <label>Último Mantenimiento:</label>
                        <span>{{ machine.lastMaintenance }}</span>
                    </div>
                </div>

                <div v-if="isEditing" class="edit-actions">
                    <button @click="saveChanges" class="save-button">Guardar Cambios</button>
                    <button @click="cancelEdit" class="cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.machine-detail {
    padding: 2rem;
    max-width: 900px;
}

.back-button {
    margin-bottom: 1rem;
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.detail-header h1 {
    margin: 0;
}

.edit-button {
    background-color: #3b82f6;
    color: white;
}

.detail-content {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-item label {
    font-weight: 600;
    color: #6b7280;
}

.info-item span {
    font-size: 1.125rem;
}

.status-operational {
    color: #10b981;
    font-weight: 600;
}

.status-warning {
    color: #f59e0b;
    font-weight: 600;
}

.status-maintenance {
    color: #ef4444;
    font-weight: 600;
}

.edit-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.save-button {
    background-color: #10b981;
    color: white;
}

.cancel-button {
    background-color: #6b7280;
    color: white;
}

@media (prefers-color-scheme: dark) {
    .detail-content {
        background-color: #1a1a1a;
        color: rgba(255, 255, 255, 0.87);
    }
}
</style>
