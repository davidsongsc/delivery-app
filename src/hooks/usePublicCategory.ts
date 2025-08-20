import { App } from "antd"
import { useCallback, useEffect, useState } from "react"
import { produtosPublicosService } from "@/services/product.public.service"

interface ICategoria {
  id: string
  nome: string
  ativo: boolean
  parent: string | null
  tipo: string
  subcategorias: any[]
}

interface UseCategoriasPublicasResponse {
  categorias: ICategoria[]
  categoriasLoading: boolean
  categoriasRefresh: () => void
}

export const useCategoriasPublicas = (tenantId: string): UseCategoriasPublicasResponse => {
  const { notification } = App.useApp()
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [categoriasLoading, setCategoriasLoading] = useState(false)

  const categoriasRefresh = useCallback(() => {
    if (!tenantId) return

    setCategoriasLoading(true)

    produtosPublicosService
      .getAllCategories(tenantId)
      .then((res) => {
        setCategorias(res.data.categories.result)
      })
      .catch((error) => {
        console.error("Erro ao listar categorias:", error)
        notification.error({
          message: "Erro ao listar categorias",
          description: error.response?.data?.message || "Verifique sua conexão.",
        })
      })
      .finally(() => {
        setCategoriasLoading(false)
      })
  }, [tenantId, notification])

  useEffect(() => {
    categoriasRefresh()
  }, [categoriasRefresh])

  return {
    categorias,
    categoriasLoading,
    categoriasRefresh,
  }
}
