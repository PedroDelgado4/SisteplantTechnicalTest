import { describe, it, expect } from 'vitest'
import { getMachineById } from './machines'
import type { Machine } from './machines'

describe('Utilidades de máquinas (machine.ts)', () => {

    it('debería encontrar la maquina correcta cuando se le pasa un ID existente', () => {
        // ARRANGE (Preparación)
        const maquinasFalsas: Machine[] = [
            {
                id: 1,
                name: "Maquina prueba 01",
                status: "operational",
                line: "Línea A",
                efficiency: 87.5,
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
        // ACT (Accion)
        const resultado = getMachineById(maquinasFalsas, 2)
        
        // ASSERT (Verificación)
        expect(resultado).toBeDefined(); // Comprobamos que no devuelve undefined
        expect(resultado?.name).toBe("Máquina Objetivo"); // Comprobamos que trajo la correcta

    })

    it('debería devolver undefined si el ID no existe', () => {
        // Arrange
        const maquinasFalsas: Machine[] = [
            { 
                id: 1, 
                name: "Máquina 1", 
                status: "operational", 
                line: "A", 
                efficiency: 100, 
                temperature: 20, 
                lastMaintenance: "2026-04-01" }
        ];

        // Act
        // Buscamos un ID que sabemos que no está en el array (el 99)
        const resultado = getMachineById(maquinasFalsas, 99);

        // Assert
        expect(resultado).toBeUndefined(); // Esperamos que la función devuelva undefined
    });

})