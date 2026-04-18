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
## Bug #4: [Menú móvil no se despliega]

**Archivo**: `src/components/Header.vue`  
**Línea**: ~6-16 (script) ~46-50 (estilos)

**Descripción del problema**:
[
Había dos problemas: 
- El estado del menú (isMenuOpen) no era rezctivo (let en vez de ref) por lo que Vue no actualizaba el HTML al hacer click en el boton
- En CSS, el desplegable (.nav en móvil) no tenia un z-index definido y su contenedor padre (.header) carecía de position relative.
Esto provocaba que Vue no supiera que el menú había cambiado y que, aunque lo supiera, el usuario no lo vería por que lo tapa el resto de la página.
]

**Impacto**:
- [X] Alto (afecta UX significativamente)


**Solución aplicada**:
```
// Código anterior
(script)
let isMenuOpen = false
const toggleMenu = () => { isMenuOpen = !isMenuOpen }

(stilos)
.header {
    background-color: #1e3a8a;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative; /* ¡Añade esta línea! */
}
@media (max-width: 768px) {
.nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1e3a8a;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
}


// Código corregido
(script)
import { ref } from 'vue'
const isMenuOpen = ref(false)
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }

(estilos)
.header {
    position: relative; /* Añadido para anclar el submenú */
}
@media (max-width: 768px) {
    .nav {
        z-index: 99; /* Añadido para sobreponerse al contenido */
    }
}
```

**Explicación de la solución**:
Se implementó ref de Vue para recuperar la reactividad del botón de menú. En los estilos, se aplicó position:relative al padre .header y se le
asignó position:absolute y z-index: 99 a .nav para garantizar que se superponga correctamente al contenido.


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
## Bug #5: [Desbordamiento de interfaz en listado de estadísticas]

**Archivo**: `src/views/ProductionLines.vue`  
**Línea**: ~92

**Descripción del problema**:
En pantallas móvil, el contenedor de estadísticas de las líneas de producción (.line-stats) no adaptaba su contenido por
estar configurado como flex sin permitir el salto de línea.

**Impacto**:
- [X] Alto (afecta UX significativamente)


**Solución aplicada**:
```
// Código anterior
.line-stats {

    display: flex;
    {...}


}
// Código corregido
.line-stats {
    display: flex;
    flex-wrap: wrap; 
    {...} 
}
@media (max-width: 768px) {
    .line-stats {
        flex-direction: column;
        gap: 1rem;
    }
}
```

**Explicación de la solución**:
Se aplicó flex-wrap: wrap para permitir que el contenido fluya a la siguiente línea si falta espacio.
Además, se ha añadido una media query para pantallas pequeñas que cambia el flex a column para su correcta visualización.

---

## Bug #6: [HTML inválido y sintaxis nativa de eventos]

**Archivo**: `src/components/MachineCard.vue`  
**Línea**: ~37

**Descripción del problema**:
El componente tenía dos problemas de marcado: utilizaba atributo onclick de HTML nativo en lugar del listener de eventos de Vue (@click) y anidaba un <router-link> dentro de un <button>, lo que es semánticamente invalido.

**Impacto**:
- [x] Medio (problema notable pero no bloqueante)


**Solución aplicada**:
```
// Código anterior
<div class="machine-card" onclick="console.log('clicked')">
<button><router-link :to="'/machine/' + machine.id">Ver Detalles</router-link></button>

// Código corregido
<div class="machine-card">
<router-link :to="'/machine/' + machine.id" class="action-btn">Ver Detalles</router-link>
```

**Explicación de la solución**:
Se eliminó evento nativo innecesario. Se ha reemplazado un button y un <a> por un único router-link estilizado mediante la nueva clase CSS .action-btn.

---

## Bug #7: [Pérdida de reactividad en el estado de Dashboard]

**Archivo**: `src/views/Dashboard.vue`  
**Línea**: ~10-30

**Descripción del problema**:
Los valores del total de máquinas y la eficiencia media se calculaban una única vez, lo que rompe la reactividad.

**Impacto**:
- [x] Alto (afecta UX significativamente)


**Solución aplicada**:
```
// Código anterior
const totalMachines = ref(store.machines.length)
onMounted(() => { totalMachines.value = store.machines.length })

// Código corregido
const totalMachines = computed(() => store.machines.length)
```

**Explicación de la solución**:
Se han sustituido las variables estáticas y asignaciones manuales en los ciclos de vida por propiedades computadas garantizando que el
Dashboard reaccione inmediatamente cuando algún estado cambia.

---

## Bug #8: [Ejecución ineficiente de funciones en el Template]

**Archivo**: `src/views/Dashboard.vue`  
**Línea**: ~52-57

**Descripción del problema**:
Se utilizaban métodos pesados de filtrado de arrays (.filter) directamente dentro del template, lo que supone una carga
en el rendimiento innecesaria.

**Impacto**:
- [x] Medio (problema notable pero no bloqueante)


**Solución aplicada**:
```
// Código anterior
<p>{{store.machines.filter((m: any) => m.status === 'operational').length}}</p>
<p class="stat-value">{{store.machines.filter((m: any) => m.status === 'maintenance').length}}

// Código corregido
const operationalCount = computed(() => store.machines.filter((m: Machine) => m.status === 'operational').length)
const maintenanceCount = computed(() => store.machines.filter((m: Machine) => m.status === 'maintenance').length)
<p>{{ operationalCount }}</p>
<p>{{ maintenanceCount }}</p>
```

**Explicación de la solución**:
Se extrajo la lógica del template hacia propiedades computadas, tipando correctamente los parametros.

---
**Total de bugs encontrados**: XX
**Total de bugs corregidos**: XX
