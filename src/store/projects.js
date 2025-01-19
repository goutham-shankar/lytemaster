import { create } from "zustand";

const useProjectsStore = create((set) => ({
  projects: [],
  filters: [],
  setProjects: (projects) => set((state) => ({ ...state, projects })),
  addFilter: (filter) =>
    set((state) => ({
      ...state,
      filters: [...state.filters, filter.toLowerCase()],
    })),
  removeFilter: (filter) =>
    set((state) => ({
      ...state,
      filters: state.filters.filter(
        (f) => f.toLowerCase() !== filter.toLowerCase(),
      ),
    })),
  setFilters: (filters) =>
    set((state) => ({
      ...state,
      filters: [...filters.map((f) => f.toLowerCase())],
    })),
  clearFilters: () => set((state) => ({ ...state, filters: [] })),
}));

export default useProjectsStore;
