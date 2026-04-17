# Bugs Encontrados

> **Instrucciones**: Documenta cada bug que encuentres siguiendo el formato indicado.

---

## Bug #1: [Error de índice en cálculo de eficiencia]

**Archivo**: `src/data/machines.ts`  
**Línea**: ~52

**Descripción del problema**:
[El uso de "<=" implica que cuando el for llegue al final, se saldrá del array (y por eso da error al iniciar), 
 ya que siempre sumará +1 cuando sea igual, y lo que queremos es que pare ahi]

**Impacto**:
- [x] Crítico (rompe funcionalidad principal)

**Solución aplicada**:
```
// Código anterior
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
// Código corregido
export function calculateAverageEfficiency(machines: Machine[]) {
  let total = 0;
  for (let i = 0; i < machines.length; i++) {
    total += machines[i].efficiency;
  }
  return total / machines.length;
}
```

**Explicación de la solución**:
  Se ha corregido el límite del bucle for para no exceder la longitud del array.

---

## Bug #2: [Método incorrecto de filtrado]

**Archivo**: `src/data/machines.ts`  
**Línea**: ~78

**Descripción del problema**:
Se usaba .filter() en lugar de .find() para buscar el primer elemento que coincida con la ID. Ésto provocaba que se devolviera un array en lugar de un objeto, lo que rompía la vista de detalles.

**Impacto**:
- [X] Alto (afecta UX significativamente)

**Solución aplicada**:
```
// Código anterior

export function getMachineById(machines: any, id: number) {

  return machines.filter((m: any) => m.id === id);

}

// Código corregido

export function getMachineById(machines: Machine[], id: number) {
  return machines.find((m) => m.id === id);
}
```

**Explicación de la solución**:
Uso .find() en la función getMachineById() para que devuelva un objeto en lugar de un array evitando así errores de renderizado.
---

---
## Bug #3: [Funciones del Store sin retorno de datos]

**Archivo**: `src/stores/machinesStore.ts`  
**Línea**: ~24

**Descripción del problema**:
La funcion getMachineById hacía una búsqueda de la máquina correctamente, pero no tenía return. 
Ésto provocaba que la función devolviera siempre undefined (void en TS) impidiendo que los componentes
obtuvieran los datos de las máquinas.

**Impacto**:
- [X] Crítico (rompe funcionalidad principal)

**Solución aplicada**:
```
// Código anterior
function getMachineById(id: number) {
    machines.value.find((m: any) => m.id === id);
  }

// Código corregido
function getMachineById(id: number) {
    return machines.value.find((m: any) => m.id === id);
  }
```

**Explicación de la solución**:
Se añadió la sentencia return necesaria para que la función devuelva el objeto encontrado al componente que realiza la consulta.

---
## Bug #1: [Título descriptivo del bug]

**Archivo**: `ruta/al/archivo.vue`  
**Línea**: ~XX

**Descripción del problema**:
[Explica qué está mal y por qué]

**Impacto**:
- [ ] Crítico (rompe funcionalidad principal)
- [ ] Alto (afecta UX significativamente)
- [ ] Medio (problema notable pero no bloqueante)
- [ ] Bajo (problema menor o de calidad de código)

**Solución aplicada**:
```
// Código anterior

// Código corregido
```

**Explicación de la solución**:


---
**Total de bugs encontrados**: XX
**Total de bugs corregidos**: XX
