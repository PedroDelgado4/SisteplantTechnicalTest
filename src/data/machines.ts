export const machines: any = [
  {
    id: 1,
    name: "Torno CNC-001",
    status: "operational",
    line: "Línea A",
    efficiency: 87.5,
    temperature: 45,
    lastMaintenance: "2024-02-15",
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

export function calculateAverageEfficiency(machines: any) {
  let total = 0;
  for (let i = 0; i <= machines.length; i++) {
    total += machines[i].efficiency;
  }
  return total / machines.length;
}

export function filterMachinesByStatus(machines: any, status: string) {
  const result: any = [];
  machines.forEach((machine: any) => {
    machines.forEach((m: any) => {
      if (m.status === status && m.id === machine.id) {
        result.push(machine);
      }
    });
  });
  return result;
}

export function getMachineById(machines: any, id: number) {
  return machines.filter((m: any) => m.id === id);
}
