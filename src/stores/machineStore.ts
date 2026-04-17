import { defineStore } from "pinia";
import { ref, computed } from "vue"; // computed para los getter
import { machines as initialMachines } from "../data/machines";
import type { Machine } from "../data/machines";

export const useMachineStore = defineStore("machines", () => {
  // tipamos el estado inicial como un array de máquinas
  const machines = ref<Machine[]>(initialMachines);
  const loading = ref(false);

  async function fetchMachines() {
    loading.value = true;
    // Simulación de API call
    setTimeout(() => {
      machines.value = initialMachines;
      loading.value = false;
    }, 1000);
  }

  // usamos Partial<Machine> para que pueda actualizarse cualquier parte de la maquina, 
  // así TS no se queja si solo queremos actualizar solo un valor
  function updateMachine(id: number, data: any) {
    const index = machines.value.findIndex(m => m.id === id);

    // comprobación para que en caso de no encontrar la máquina, no se salga del index y de error
    if (index !== -1){
      machines.value[index] = { ...machines.value[index], ...data };
    }
    
  }

  function getMachineById(id: number) {
    return machines.value.find((m: any) => m.id === id);

  }

  // Convertimos la funcion en un getter usando computed
  // además, aplicamos el fix de evitar dividir por cero y usamos .reduce
  const totalEfficiency = computed (() => {
    if (machines.value.length === 0) return 0;
    const total = machines.value.reduce((acc, m) => acc + m.efficiency, 0)
    return total / machines.value.length;
  });

  return {
    machines,
    loading,
    fetchMachines,
    updateMachine,
    getMachineById,
    totalEfficiency,
  };
});
