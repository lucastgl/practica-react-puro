# Rick & Morty — Challenge React Puro

Aplicación full-feature construida sobre la [Rick and Morty API](https://rickandmortyapi.com/documentation) para practicar los fundamentos de React, hooks, patrones avanzados, routing, paginación y Context.

## Setup

```bash
npm install
npm install react-router-dom
npm run dev
```

---

## Objetivo general

Construir una SPA con tres secciones (Personajes, Ubicaciones, Episodios) que consuma la API pública de Rick & Morty y aplique progresivamente todos los conceptos de las carpetas `03-react-fundamentos`, `04-hooks` y `05-patrones-avanzados`.

---

## Estructura de carpetas sugerida

```
src/
├── context/
│   └── AppContext.tsx          # Context global (favoritos, tema, filtros activos)
├── hooks/
│   ├── useFetch.ts             # Custom hook genérico para fetch con loading/error
│   ├── usePagination.ts        # Custom hook para manejo de página actual
│   └── useDebounce.ts          # Custom hook para debounce en búsqueda
├── pages/
│   ├── Characters.tsx
│   ├── Locations.tsx
│   └── Episodes.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Layout.tsx
│   ├── cards/
│   │   ├── CharacterCard.tsx
│   │   ├── LocationCard.tsx
│   │   └── EpisodeCard.tsx
│   ├── shared/
│   │   ├── Pagination.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx   # Class component obligatorio
│   └── compound/
│       └── FilterPanel.tsx     # Compound component pattern
├── types/
│   └── api.ts                  # Tipos TypeScript de la API
├── App.tsx
└── main.tsx
```

---

## Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | redirect a `/characters` | |
| `/characters` | Characters | Listado paginado con filtros |
| `/locations` | Locations | Listado paginado con filtros |
| `/episodes` | Episodes | Listado paginado con filtros |

Usar `react-router-dom` con `createBrowserRouter` o `BrowserRouter + Routes`.

---

## API — Endpoints y filtros

**Base URL:** `https://rickandmortyapi.com/api`

Todos los endpoints devuelven:
```json
{
  "info": { "count": 826, "pages": 42, "next": "...?page=2", "prev": null },
  "results": [...]
}
```

| Recurso | Endpoint | Filtros disponibles |
|---------|----------|---------------------|
| Characters | `/character` | `name`, `status` (alive/dead/unknown), `species`, `gender` |
| Locations | `/location` | `name`, `type`, `dimension` |
| Episodes | `/episode` | `name`, `episode` (ej: S01E01) |

Parámetro de paginación: `?page=N` (se puede combinar con filtros: `?page=2&name=rick&status=alive`)

---

## Challenges

### Bloque 1 — Fundamentos (carpeta 03)

Practicás: JSX, componentes, props, children, listas, render condicional.

- [ ] **1.1** Crear `CharacterCard`, `LocationCard` y `EpisodeCard` como componentes funcionales que reciban sus datos por props. Definir los tipos TypeScript de cada uno en `src/types/api.ts`.
- [ ] **1.2** Crear un componente `Layout` que use `children` para envolver todas las páginas. Debe incluir el `Navbar` con links a las tres rutas.
- [ ] **1.3** En cada card, usar render condicional para mostrar un badge de estado (alive / dead / unknown) solo en `CharacterCard`, y manejarlo con un objeto de estilos por status en lugar de if/else encadenados.
- [ ] **1.4** Renderizar las listas usando `.map()` con una `key` basada en el `id` del recurso (nunca el índice).

---

### Bloque 2 — Hooks (carpeta 04)

Practicás: useState, useEffect, useRef, useContext, useMemo/useCallback, custom hooks.

#### useState
- [ ] **2.1** Manejar `page`, `searchTerm` y los filtros activos con `useState` en cada página. Resetear `page` a 1 cuando cambie cualquier filtro o el término de búsqueda.

#### useEffect
- [ ] **2.2** Implementar el fetch de datos en `useEffect` con el array de dependencias correcto (`page`, `searchTerm`, filtros). Manejar el cleanup con un `AbortController` para cancelar requests anteriores cuando cambian los parámetros (race condition).

#### useRef
- [ ] **2.3** Usar `useRef` para guardar el `AbortController` entre renders sin provocar re-renders. También usarlo para hacer foco automático en el input de búsqueda al montar la página.

#### useContext
- [ ] **2.4** Crear un `AppContext` que exponga:
  - `favorites: number[]` — IDs de personajes favoritos
  - `toggleFavorite(id: number): void`
  - `theme: 'light' | 'dark'`
  - `toggleTheme(): void`
  
  Consumirlo en `CharacterCard` para mostrar/ocultar el botón de favorito, y en `Navbar` para el toggle de tema.

#### useMemo / useCallback
- [ ] **2.5** Memoizar con `useMemo` la construcción de la URL de la API (que depende de page, filtros y searchTerm) para no recalcularla en cada render. Memoizar con `useCallback` los handlers de cambio de filtros que se pasan como props a `FilterBar`.

#### Custom Hooks
- [ ] **2.6** Extraer la lógica de fetch a un custom hook `useFetch<T>(url: string)` que devuelva `{ data, loading, error }`. Debe manejar el AbortController internamente.
- [ ] **2.7** Crear `usePagination(totalPages: number)` que devuelva `{ page, goToNext, goToPrev, goToPage, canGoNext, canGoPrev }`.
- [ ] **2.8** Crear `useDebounce<T>(value: T, delay: number): T` y aplicarlo al `searchTerm` para no disparar un fetch por cada tecla.

---

### Bloque 3 — Patrones avanzados (carpeta 05)

Practicás: render props, error boundary, compound components.

#### Error Boundary
- [ ] **3.1** Crear `ErrorBoundary` como class component con `getDerivedStateFromError` y una UI de fallback. Envolver cada página con él para que un error de render no rompa toda la app.

#### Render Props
- [ ] **3.2** Crear un componente `DataList<T>` que reciba `items: T[]` y `renderItem: (item: T) => ReactNode`. Usarlo en las tres páginas para renderizar las cards. Esto desacopla la lógica de layout del tipo de dato.

#### Compound Components
- [ ] **3.3** Implementar `FilterPanel` como compound component con sub-componentes:
  ```tsx
  <FilterPanel>
    <FilterPanel.Search placeholder="Buscar personaje..." />
    <FilterPanel.Select name="status" options={['alive', 'dead', 'unknown']} />
    <FilterPanel.Select name="gender" options={['male', 'female', 'unknown']} />
    <FilterPanel.Reset />
  </FilterPanel>
  ```
  El estado de los filtros se comparte entre sub-componentes vía un Context interno del panel.

---

### Bloque 4 — Paginación y Lazy Loading

- [ ] **4.1** Implementar paginación clásica: botones Anterior / Siguiente + indicador "Página X de Y". Usar el hook `usePagination` del punto 2.7.
- [ ] **4.2** Implementar **lazy loading** (infinite scroll) como alternativa a la paginación: detectar cuando el usuario llega al final de la lista con un `IntersectionObserver` dentro de un `useEffect`. Acumular los resultados en un array en lugar de reemplazarlos.
  - Tip: colocar un elemento `<div ref={sentinelRef}>` al final de la lista y observarlo.
- [ ] **4.3** Mostrar un `LoadingSpinner` mientras se cargan más resultados. Deshabilitar el observer cuando `info.next` es `null` (última página).

---

### Bloque 5 — Context global y estado compartido

- [ ] **5.1** La lista de favoritos del `AppContext` debe persistir en `localStorage`. Implementarlo con un `useEffect` que sincronice el estado con `localStorage` cada vez que cambie.
- [ ] **5.2** Agregar una página (o sección) `/characters?favorites=true` que filtre localmente los personajes favoritos usando sus IDs guardados en el contexto.
- [ ] **5.3** El `theme` del contexto debe aplicar una clase CSS al `<body>` vía `useEffect` para cambiar entre modo claro y oscuro.

---

## Checklist de criterios

Antes de considerar el challenge completo, verificar:

- [ ] Las tres rutas funcionan y el Navbar navega entre ellas sin reload
- [ ] La búsqueda usa debounce (mínimo 400ms) y no dispara fetches innecesarios
- [ ] Las race conditions están resueltas (cambiar filtros rápido no produce resultados desordenados)
- [ ] El `ErrorBoundary` captura errores y muestra un fallback en lugar de pantalla blanca
- [ ] Los favoritos persisten al recargar la página
- [ ] El infinite scroll deja de observar cuando no hay más páginas
- [ ] Todos los tipos de la API están definidos en TypeScript (sin `any`)
- [ ] No se usa el índice del array como `key`
- [ ] Los custom hooks empiezan con `use` y son reutilizados en más de una página

---

## Tips

- La API no requiere autenticación ni API key.
- Todos los endpoints soportan CORS, se puede consumir directo desde el browser.
- Para combinar filtros con paginación: `?page=2&name=rick&status=alive`
- `info.pages` te da el total de páginas para el conjunto de resultados actual (cambia con los filtros).
- Para el infinite scroll, el `IntersectionObserver` debe reconectarse cada vez que cambian los filtros para observar el nuevo sentinel.
