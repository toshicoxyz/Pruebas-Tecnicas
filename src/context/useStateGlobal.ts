import { Ingrediente, ListasDeCompra, Menu, Receta } from '@/models/root'
import { create } from 'zustand'
import data from '../data/Datos De Prueba.json'

export interface App {
  ingredientes: Ingrediente[]
  recetas: Receta[]
  menus: Menu[]
  listas_de_compra: ListasDeCompra[]
  postIngrediente: (ingrediente: Ingrediente) => void
  postReceta: (receta: Receta) => void
  postMenu: (menu: Menu) => void
  postListasDeCompra: (listas_de_compra: ListasDeCompra) => void
  putIngrediente: (ingrediente: Ingrediente, id: number) => void
  putReceta: (receta: Receta, id: number) => void
  putMenu: (menu: Menu, id: number) => void
  putListasDeCompra: (listas_de_compra: ListasDeCompra, id: number) => void
  deleteIngrediente: (ingrediente: Ingrediente) => void
  deleteReceta: (receta: Receta) => void
  deleteMenu: (menu: Menu) => void
  deleteListasDeCompra: (listas_de_compra: ListasDeCompra) => void
  getIdIngrediente: (id: number) => Ingrediente | undefined
  getIdReceta: (id: number) => Receta | undefined
  getIdMenu: (id: number) => Menu | undefined
}

export const useStateGlobal = create<App>((set, get) => ({
  ingredientes: data.ingredientes || [],
  listas_de_compra: data.listas_de_compra || [],
  menus: data.menus || [],
  recetas: data.recetas || [],
  // Crear
  postIngrediente: (ingrediente: Ingrediente) => {
    set(state => ({
      ...state, // Mantén las otras propiedades del estado inalteradas
      ingredientes: [
        ...state.ingredientes,
        {
          ...ingrediente,
          id:
            state.ingredientes.length > 0
              ? Math.max(...state.ingredientes.map(item => item.id)) + 1
              : 1,
        },
      ],
    }))
  },
  postReceta: (receta: Receta) => {
    set(state => ({
      ...state, // Mantén las otras propiedades del estado inalteradas
      recetas: [
        ...state.recetas,
        {
          ...receta,
          id:
            state.recetas.length > 0
              ? Math.max(...state.recetas.map(item => item.id)) + 1
              : 1,
        },
      ],
    }))
  },

  postMenu: (menu: Menu) => {
    set(state => ({
      ...state, // Mantén las otras propiedades del estado inalteradas
      menus: [
        ...state.menus,
        {
          ...menu,
          id:
            state.menus.length > 0
              ? Math.max(...state.menus.map(item => item.id)) + 1
              : 1,
        },
      ],
    }))
  },

  postListasDeCompra: (listas_de_compra: ListasDeCompra) => {
    set(state => ({
      ...state, // Mantén las otras propiedades del estado inalteradas
      listas_de_compra: [
        ...state.listas_de_compra,
        {
          ...listas_de_compra,
          id:
            state.listas_de_compra.length > 0
              ? Math.max(...state.listas_de_compra.map(item => item.id)) + 1
              : 1,
        },
      ],
    }))
  },
  // Actualizar
  putIngrediente: (ingrediente: Ingrediente, id: number) => {
    set(state => {
      const index = state.ingredientes.findIndex(item => item.id === id)

      if (index !== -1) {
        const updatedIngredientes = [...state.ingredientes]
        updatedIngredientes[index].nombre = ingrediente.nombre
        updatedIngredientes[index].cantidad_disponible =
          ingrediente.cantidad_disponible

        return {
          ...state,
          ingredientes: updatedIngredientes,
        }
      } else {
        console.warn(
          `No se encontró el ingrediente con ID ${ingrediente.id} para actualizar.`
        )
        return state
      }
    })
  },

  putReceta: (receta: Receta, id: number) => {
    set(state => {
      const index = state.recetas.findIndex(item => item.id === id)

      if (index !== -1) {
        const updatedRecetas = [...state.recetas]
        updatedRecetas[index].nombre = receta.nombre

        return {
          ...state,
          recetas: updatedRecetas,
        }
      } else {
        console.warn(
          `No se encontró la receta con ID ${receta.id} para actualizar.`
        )
        return state
      }
    })
  },

  putMenu: (menu: Menu, id: number) => {
    set(state => {
      const index = state.menus.findIndex(item => item.id === id)

      if (index !== -1) {
        const updatedMenus = [...state.menus]
        updatedMenus[index].nombre = menu.nombre
        updatedMenus[index].descripcion = menu.descripcion

        return {
          ...state,
          menus: updatedMenus, // Actualiza la propiedad correcta
        }
      } else {
        console.warn(
          `No se encontró el menú con ID ${menu.id} para actualizar.`
        )
        return state
      }
    })
  },

  putListasDeCompra: (listas_de_compra: ListasDeCompra, id: number) => {
    set(state => {
      const index = state.listas_de_compra.findIndex(item => item.id === id)

      if (index !== -1) {
        const updatedListasDeCompra = [...state.listas_de_compra]
        updatedListasDeCompra[index].nombre = listas_de_compra.nombre

        return {
          ...state,
          listas_de_compra: updatedListasDeCompra,
        }
      } else {
        console.warn(
          `No se encontró la lista de compra con ID ${listas_de_compra.id} para actualizar.`
        )
        return state
      }
    })
  },
  // Delete
  deleteIngrediente: (ingrediente: Ingrediente) => {
    set(state => {
      const updatedIngredientes = state.ingredientes.filter(
        item => item.id !== ingrediente.id
      )

      return {
        ...state,
        ingredientes: updatedIngredientes,
      }
    })
  },

  deleteReceta: (receta: Receta) => {
    set(state => {
      const updatedRecetas = state.recetas.filter(item => item.id !== receta.id)

      return {
        ...state,
        recetas: updatedRecetas,
      }
    })
  },

  deleteMenu: (menu: Menu) => {
    set(state => {
      const updatedRecetas = state.recetas.filter(item => item.id !== menu.id)

      return {
        ...state,
        recetas: updatedRecetas,
      }
    })
  },

  deleteListasDeCompra: (listas_de_compra: ListasDeCompra) => {
    set(state => {
      const updatedRecetas = state.recetas.filter(
        item => item.id !== listas_de_compra.id
      )

      return {
        ...state,
        recetas: updatedRecetas,
      }
    })
  },

  // Filter
  getIdIngrediente: (id: number) => {
    return get().ingredientes.find(_ => _.id === id)
  },
  getIdReceta: (id: number) => {
    return get().recetas.find(_ => _.id === id)
  },
  getIdMenu: (id: number) => {
    return get().menus.find(_ => _.id === id)
  },
}))
