# Mejoras Implementadas

> **Instrucciones**: Resume las mejoras de arquitectura, refactorizaciones y optimizaciones implementadas.

---

## Tipado TypeScript

### 1 Uso de interfaces

**Ubicación**:
Lógica de datos de las máquinas

**Archivos modificados**
src/data/machines.ts, src/views/ProductionLines.vue

**Impacto**: 
Se elimina el uso abusivo de any creando una interfaz Machine. Esto proporciona seguridad de tipos.

### 2 Tipado y rendimiento

**Ubicación**:
Vista de Líneas de Producción

**Archivos modificados**
src/views/ProductionLines.vue

**Impacto**: 
Se refactorizó la propiedad computada filteredMachines, reemplazando un bucle inificiente por un método funcional.

---

## 2. Composition API

**Ubicación**: 
Tarjeta de máquina

**Archivos modificados**
MachineCard.vue

**Impacto**:
Refactorización de las funciones de renderizado a computed para mejorar el rendimiento de la lista.

---

## 3. Store (Pinia)

### 1
**Ubicación**:
Gestión de estado global

**Archivos modificados**
src/store/machineStore.ts

**Impacto**:
- Tipado: Se reemplazaron los any por Machine[] y Partial<Machine> previniendo errores de mutación de datos.
- Seguridad: Se añadió una validación en updateMachine para evitar sobreescribir índices inexistentes.
- Getters: se refactorizó la función getTotalEffciency convirtiendola en una propiedad computed (totalEfficiency) para adaptarla
a las mejores prácticas de Vue 3 y Pinia. Se mejoró la lógica interna usando .reduce() y protegiendo contra divisiones por 0.

### 2
**Ubicación**:
Dashboard de Producción

**Archivos modificados**
src/views/Dashboard.vue

**Impacto**:
Se ha refactorizado el cáculo de eficiencia para utilizar directamente un getter reactivo de Pinia eliminando código redundante, importaciones innecesarias y el uso de bloques try/catch injustificados en el componente visual.

---

## 4. Optimizaciones de Rendimiento

### 1 Optimización de filtrado
**Ubicación**:
Lógica de datos de las máquinas

**Archivos modificados**
src/data/machines.ts

**Impacto**: Se refactorizó la función filterMachinesByStatus. El código original usaba dos bucles anidados de manera innecesaria.
Se simplificó usando .filter(), lo que reduce significativamente la complejidad y mejora la legibilidad.

### 2 Optimización de filtrado

**Ubicación**:
Enrutador de la app

**Archivos modificados**
src/router/index.ts

**Impacto**: Se implementó lazy loading basada en rutas. Esto reduce drásticamente la carga inicial, descargando el código de páginas secundarias solo cuando el usuario hace navega hacia ellas.

---

## 5. Mejora de Componentes

### 1 Uso de :key

**Ubicación**:
Vista de Líneas de Producción

**Archivos modificados**
ProductionLines.vue

**Impacto**: 
Se ha corregido una mala práctica de Vue3 añadiendo el atributo obligatorio :key a las v-for tanto en las opciones del <select>
como en el listado de <MachineCard>, asegurando un correcto renderizado. Sin :key, cuando modifiquemos/borremos/creemos algun elemento, los valores van a ir ligados a su posición, por lo que se romperá la visualización o incluso la app.

### 2- Tipado y validación

**Ubicación**:
Tarjeta de máquina

**Archivos modificados**
MachineCard.vue

**Impacto**: 
Se implementó validación estricta y tipado fuerte para las propiedades (Props) del componente.

---

## 6. Validación y Manejo de Errores

**Ubicación**:
Vista de Detalle de Máquina (formulario de edicion)

**Archivos modificados**
src/views/MachineDetail.vue

**Impacto**: 
Se implementó un sistema de validación robusta para el formulario de edición. Esto previene que el usuario introduzca datos corruptos en el store (nombres vacíos, temperaturas imposibles, etc). Proporciona feedback al usuario indicando qué campo contiene el error.

---

## 7. Testing Unitario

### 1

**Ubicación**:
Funciones de lógica de datos

**Archivos modificados**:
src/data/machines.spec.ts

**Impacto**:
Se han implementado las primeras pruebas unitarias utilizando Vitest con patrón AAA. Se testea la función getMachineById para garantizar que devuelve el objeto correcto cuando se le pasa un ID válido y que maneja de forma segura cuando se busca un ID inexistente. Esto asegura mantenibilidad del código.

### 2
**Ubicación**:
Store de gestión de estado global

**Archivos modificados**:
src/stores/machinesStore.spec.ts

**Impacto**:
Añadidos tests para el store de Vue validando los getters. Mediante setActivePinia y createPinia dentro de beforeEach garantizamos aislamiento de estado entre pruebas. Se validó el calculo de la eficiencia global y el manejo de errores por divisiones por 0 o NaN.

### 3
**Ubicación**:
Componentes visuales UI

**Archivos modificados**:
src/components/MachineCard.spec.ts

**Impacto**:
Se implementaron unit tests de renderizado de componentes vue/test-utils. Se comprobó que el componente recibe e interpreta correctamente sus props y que las propiedades computadas se reflejan en el DOM. Además se testeó el renderizado correcto de la alerta de mantenimiento usando fechas manipuladas.

---

## 8. Estados de UI

**Estados implementados**:
- Se implementó una gestión de estados de carga (Loading State) utilizando la variable loading del store de pinia. Esto soluciona el problema de UX
donde el usuario no recibía feedback visual durante la simulacion de la llamada a la API (fetchMachines)

---