import {describe, it, expect, beforeEach} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMachineStore } from './machineStore'

describe("Machine Store (Pinia)", () => {
    // creamos pinia nuevo antes de cada test
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it("deberia calcular correctamente la eficiencia media total", () => {
    // ARRANGE
        const store = useMachineStore()
        store.machines = [
            {
                id: 1,
                name: "Maquina prueba 01",
                status: "operational",
                line: "Línea A",
                efficiency: 100,
                temperature: 45,
                lastMaintenance: "2026-03-17"
            },
            { 
                id: 2,
                name: "Máquina Objetivo", 
                status: "warning", 
                line: "B", 
                efficiency: 50, 
                temperature: 40, 
                lastMaintenance: "2026-04-17" 
            }
        ]
        // ACT
        const resultado = store.totalEfficiency

        // ASSERT
        expect(resultado).toBe(75)
    })
    it("debería devolver 0 de eficiencia si no hay maquinas (para evitar NaN)", () => {
        // ARRANGE
        const store = useMachineStore()
        store.machines = []

        //ACT
        const resultado = store.totalEfficiency

        //ASSERT
        expect(resultado).toBe(0)

    })
})


