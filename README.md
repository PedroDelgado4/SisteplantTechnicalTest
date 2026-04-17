# Prueba Técnica - Desarrollador Front-End Vue.js
## Sisteplant - Sistema de Gestión de Producción

---

## Contexto

Has sido asignado a un proyecto de modernización del sistema de gestión de producción industrial. Un desarrollador anterior creó una primera versión funcional, pero el código tiene varios problemas de calidad, bugs y no sigue las mejores prácticas de Vue.js 3.

Tu tarea es **analizar, detectar problemas y mejorar** el código existente.

---

## Objetivos de la Prueba

Esta prueba evalúa tu capacidad para:

1. **Detectar bugs** y problemas de lógica
2. **Identificar malas prácticas** en Vue.js 3 y TypeScript
3. **Proponer y aplicar mejoras** de arquitectura
4. **Optimizar rendimiento** y experiencia de usuario
5. **Implementar testing** y mantenibilidad del código

---

## Instrucciones de Inicio

### 1. Configuración del Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests unitarios (cuando los implementes)
npm run test

# Ejecutar tests E2E con Cypress (opcional)
npm run test:e2e
```

### 2. Exploración Inicial

Antes de empezar, **explora la aplicación**:
- Navega por todas las vistas (Dashboard, Líneas de Producción, Detalle de Máquina)
- Intenta editar una máquina
- Observa el comportamiento del menú en móvil
- Abre la consola del navegador y busca errores

---

## Tareas

### Parte 1: Detección y Corrección de Bugs

Identifica y corrige **al menos 10 bugs** presentes en el código. Los bugs pueden ser:

- Errores que rompen la funcionalidad
- Problemas de lógica que dan resultados incorrectos
- Issues de rendimiento severos
- Problemas de tipos en TypeScript

**Entregable**: Crea un archivo `BUGS_ENCONTRADOS.md` documentando:
- Ubicación del bug (archivo y línea aproximada)
- Descripción del problema
- Impacto (crítico, alto, medio, bajo)
- Solución aplicada

### Parte 2: Mejoras de Arquitectura
Refactoriza el código para seguir las mejores prácticas:

1. **Tipado TypeScript**: Define interfaces/types adecuados para:
   - Máquinas
   - Estados de la aplicación
   - Props de componentes

2. **Composition API**: Asegúrate de que todos los componentes usen correctamente:
   - Refs y reactive
   - Computed properties donde corresponda
   - Composables reutilizables si es aplicable

3. **Store (Pinia)**: Mejora la gestión de estado:
   - Corrige las funciones del store
   - Implementa getters apropiados
   - Añade manejo de errores

4. **Componentes**: Mejora la estructura:
   - Props con validación adecuada
   - Emits bien definidos donde sea necesario
   - Lógica de negocio en lugares apropiados

### Parte 3: Testing

Implementa **tests unitarios** para al menos:

1. Una función del archivo `machines.ts`
2. Un computed o método del store
3. Un componente (MachineCard o similar)

Usa **Vitest** y **@vue/test-utils**.

### Parte 4: Mejoras Adicionales

Implementa AL MENOS UNA de las siguientes mejoras:

- **Validación de formularios**: Implementa validación robusta en el detalle de máquina
- **Estados de carga**: Añade indicadores de loading apropiados
- **Mensajes de error**: Implementa un sistema de notificaciones
- **Optimización**: Implementa lazy loading de componentes o rutas
- **Tests E2E (Cypress)**: Implementa al menos 2 tests end-to-end de flujos críticos

---

## Entregables

1. **Código refactorizado** (todo el proyecto)
2. **BUGS_ENCONTRADOS.md** - Listado de bugs con explicación
3. **MEJORAS_IMPLEMENTADAS.md** - Resumen de mejoras aplicadas
4. **Tests** implementados y funcionando
5. **(Opcional)** **PROPUESTAS_FUTURAS.md** - Mejoras adicionales que implementarías con más tiempo

---

## Tiempo Estimado

- **Tiempo recomendado**: 3-4 horas
- **Tiempo máximo**: No hay límite, pero documenta el tiempo invertido

No se espera que corrijas TODOS los problemas. Prioriza y demuestra tu criterio técnico.

---

## Consejos

1. **Lee TODO el código** antes de empezar a modificar
2. **Prioriza**: Bugs críticos > Mejoras > Features nuevos
3. **Documenta** mientras trabajas, no al final
4. **Testea** cada cambio importante
5. **Commitea** frecuentemente con mensajes descriptivos
6. **No uses librerías externas** no listadas en package.json

---

**¡Buena suerte! Demuestra tu experiencia y criterio técnico.**

---

*Sisteplant - Prueba Técnica Front-End 2026*
