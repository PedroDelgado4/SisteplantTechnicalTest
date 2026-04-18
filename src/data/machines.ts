export interface Machine {
  id: number;
  name: string;
  status: string;
  line: string;
  efficiency: number;
  temperature: number;
  lastMaintenance: string;
}

export const machines: Machine[] = [
  {
    id: 1,
    name: "Torno CNC-001",
    status: "operational",
    line: "Línea A",
    efficiency: 87.5,
    temperature: 45,
    lastMaintenance: "2026-04-15",
  },
  {
    id: 2,
    name: "Fresadora-002",
    status: "maintenance",
    line: "Línea A",
    efficiency: 0,
    temperature: 25,
    lastMaintenance: "2024-03-01",
  },
  {
    id: 3,
    name: "Robot Soldadura-003",
    status: "operational",
    line: "Línea B",
    efficiency: 92.3,
    temperature: 38,
    lastMaintenance: "2024-01-20",
  },
  {
    id: 4,
    name: "Prensa Hidráulica-004",
    status: "warning",
    line: "Línea B",
    efficiency: 65.2,
    temperature: 55,
    lastMaintenance: "2024-02-05",
  },
  {
    id: 5,
    name: "Ensambladora-005",
    status: "operational",
    line: "Línea C",
    efficiency: 88.9,
    temperature: 42,
    lastMaintenance: "2024-02-28",
  },
];

export function calculateAverageEfficiency(machines: Machine[]) {
  let total = 0;
  // El uso de "<=" implica que cuando el for llegue al final, se saldrá del array (y por eso da error al iniciar), 
  // ya que siempre sumará +1 cuando sea igual, y lo que queremos es que pare ahi
  for (let i = 0; i < machines.length; i++) {
    total += machines[i].efficiency;
  }
  return total / machines.length;
}

export function filterMachinesByStatus(machines: Machine[], status: string) {

  // Cambio los foreach anidados por un simple .filter.
  return machines.filter((m) => m.status === status)
  
}

// Cambio machines.filter por .find, ya que solo queremos buscar el primer ID que coincida, 
// no analizarlos todos cada vez
export function getMachineById(machines: Machine[], id: number) {
  return machines.find((m) => m.id === id);
}
