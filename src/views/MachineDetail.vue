<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMachineStore } from '../stores/machineStore'
import type { Machine } from '../data/machines'

const route = useRoute()
const router = useRouter()
const store = useMachineStore()

const machine = ref<Machine>()
const isEditing = ref(false)

const formData = ref({
    name: '',
    efficiency: 0,
    temperature: 0
})

// Estado ara guardar los mensajes de error
const formErrors = ref({
    name: '',
    efficiency: '',
    temperature: '' 
})
// funcion de validacion
const validateForm = () => {
    let isValid = true
    // Reseteamos errores
    formErrors.value = { name: '', efficiency: '', temperature: '' }

    if (!formData.value.name.trim()) {
        formErrors.value.name = 'El nombre es obligatorio'
        isValid = false
    }
    
    if (formData.value.efficiency < 0 || formData.value.efficiency > 100) {
        formErrors.value.efficiency = 'Debe estar entre 0 y 100%'
        isValid = false
    }

    if (formData.value.temperature < -20 || formData.value.temperature > 250) {
        formErrors.value.temperature = 'Temperatura fuera de rango (-20 a 250)'
        isValid = false
    }

    return isValid
}

// Mejora: función para no repetir código en onMounted y watch
const loadMachine = () => {
    const id = parseInt(route.params.id as string)
    machine.value = store.getMachineById(id)
    if(machine.value) {
        formData.value = {
            name: machine.value.name,
            efficiency: machine.value.efficiency,
            temperature: machine.value.temperature
        } 
    }
}

onMounted(() => {
    loadMachine()  
})

watch(() => route.params.id, () => {
    loadMachine()
})

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const saveChanges = () => {
    // comprobamos si el form es valido antes de guardar nada
    if (!validateForm()) {
        return // Si hay errores, cortamos la ejecución aquí
    }
    // protegmos la logica (solo guarda si la maquina existe)
    if (machine.value){
        const id = parseInt(route.params.id as string)
        store.updateMachine(id, formData.value)

        // actualizamos vista localmente
        machine.value = { ...machine.value, ...formData.value }
        isEditing.value = false
        alert('Cambios guardados')
    }  
}

const cancelEdit = () => {
    // protegemos el cancelar
    if (machine.value) {
        formData.value = {
            name: machine.value.name,
            efficiency: machine.value.efficiency,
            temperature: machine.value.temperature
        }
    }
    // limpiamos errores al cancelar
    formErrors.value = { name: '', efficiency: '', temperature: '' }
    isEditing.value = false
}

const goBack = () => {
    router.push('/')
}
</script>

<template>
    <div class="machine-detail" v-if="machine">
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
                        <div v-if="isEditing" class="input-group">
                            <input v-model="formData.name" type="text" :class="{ 'has-error': formErrors.name }"/>
                            <span v-if="formErrors.name" class="error-text">{{ formErrors.name }}</span>
                        </div>
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
                        <div v-if="isEditing" class="input-group">
                            <input v-model="formData.efficiency" type="number" :class="{ 'has-error': formErrors.efficiency }" />
                            <span v-if="formErrors.efficiency" class="error-text">{{ formErrors.efficiency }}</span>
                        </div>
                        <span v-else>{{ machine.efficiency }}%</span>
                    </div>

                    <div class="info-item">
                        <label>Temperatura:</label>
                        <div v-if="isEditing" class="input-group">
                            <input v-model="formData.temperature" type="number" :class="{ 'has-error': formErrors.temperature }" />
                            <span v-if="formErrors.temperature" class="error-text">{{ formErrors.temperature }}</span>
                        </div>
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
    <div v-else class="loading-state">
        <p>Cargando detalles de la máquina o máquina no encontrada...</p>
        <button @click="goBack" class="back-button">← Volver al inicio</button>
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

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem
}

.error-text {
    color: red;
    font-size: 0.75rem;
    font-weight: 500;
}
input.has-error {
    border-color: red;
    outline: #ef4444;
}
</style>
