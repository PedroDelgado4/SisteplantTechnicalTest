export interface Machine {
  id: number
  name: string
  status: MachineStatus
  line: string
  efficiency: number
  temperature: number
  lastMaintenance: string
}

export type MachineStatus = 'operational' | 'maintenance' | 'warning'

export interface MachineFormData {
  name: string
  efficiency: number
  temperature: number
}

export interface LineStats {
  operational: number
  maintenance: number
  warning: number
}
