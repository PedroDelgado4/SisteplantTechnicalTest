import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MachineCard from './MachineCard.vue'
import type { Machine } from '../data/machines'

describe('MachineCard.vue', () => {
    it("debería renderizar la info correcta de una maquina operativa", () => {
        // ARRANGE
        // Maquina de prueba con fecha de mantenimiento de history
        const mockMachine: Machine = {
            id: 1,
            name: "Torno CNC Test",
            status: "operational",
            line: "Línea A",
            efficiency: 100,
            temperature: 45,
            lastMaintenance: new Date().toISOString()
        }
        // ACT
        const wrapper = mount(MachineCard, {
            props: {
                machine: mockMachine
            },
            global: {
                stubs: {
                    stubs: ["router-link"]
                }
            }
        })
        // ASSERT 
        expect(wrapper.text()).toContain("Torno CNC Test")
        expect(wrapper.text()).toContain("Operativa")
        // No debería salir el aviso de mantenimiento porque la fecha es de hoy
        expect(wrapper.find('.warning-message').exists()).toBe(false)
    })

    it("deberia mostrar alerta de mantenimiento si pasaron mas de 30 dias", () => {
        // ARRANGE
        // simulamos fecha de hace 40 dias
        const fechaAntigua = new Date();
        fechaAntigua.setDate(fechaAntigua.getDate() - 40);
        const mockMachine: Machine = {
            id: 2,
            name: "Fresadora Vieja",
            status: "warning",
            line: "Línea B",
            efficiency: 80,
            temperature: 50,
            lastMaintenance: fechaAntigua.toISOString()
        }

        //ACT
        const wrapper = mount(MachineCard, {
            props: { machine: mockMachine },
            global: { stubs: ['router-link'] }
        })

        //ASSERT
        // Esta vez el <div> con el mensaje si deberia existir en el HTML
        expect(wrapper.find('.warning-message').exists()).toBe(true)
        expect(wrapper.text()).toContain('Requiere mantenimiento')
    })

})