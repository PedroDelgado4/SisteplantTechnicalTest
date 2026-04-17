import { defineStore } from "pinia";
import { ref } from "vue";
import { machines as initialMachines } from "../data/machines";

export const useMachineStore = defineStore("machines", () => {
  const machines = ref<any>(initialMachines);
  const loading = ref(false);

  async function fetchMachines() {
    loading.value = true;
    // Simulación de API call
    setTimeout(() => {
      machines.value = initialMachines;
      loading.value = false;
    }, 1000);
  }

  function updateMachine(id: number, data: any) {
    const index = machines.value.findIndex((m: any) => m.id === id);
    machines.value[index] = { ...machines.value[index], ...data };
  }

  function getMachineById(id: number) {
    machines.value.find((m: any) => m.id === id);
  }

  function getTotalEfficiency() {
    let total = 0;
    for (let i = 0; i < machines.value.length; i++) {
      total = total + machines.value[i].efficiency;
    }
    return total / machines.value.length;
  }

  return {
    machines,
    loading,
    fetchMachines,
    updateMachine,
    getMachineById,
    getTotalEfficiency,
  };
});
