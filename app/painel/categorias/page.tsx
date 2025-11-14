"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react"

interface Category {
  id?: string
  slug: string
  name: string
  description?: string
  icon?: string
  image?: string
  image_paths?: string[]
  is_active: boolean
  order: number
  metadata?: any
}

export default function AdminCategoriasPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Category>({
    slug: "",
    name: "",
    description: "",
    icon: "",
    image: "",
    image_paths: [],
    is_active: true,
    order: 0,
    metadata: {},
  })
  const [showJsonEditor, setShowJsonEditor] = useState(false)
  const [jsonImagePaths, setJsonImagePaths] = useState("")

  const medusaBaseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${medusaBaseUrl}/admin/categories`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      } else {
        console.error("Erro ao buscar categorias:", response.statusText)
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditing(category.id || null)
    setFormData(category)
    setJsonImagePaths(JSON.stringify(category.image_paths || [], null, 2))
  }

  const handleCancel = () => {
    setEditing(null)
    setFormData({
      slug: "",
      name: "",
      description: "",
      icon: "",
      image: "",
      image_paths: [],
      is_active: true,
      order: 0,
      metadata: {},
    })
    setJsonImagePaths("")
  }

  const handleSave = async () => {
    try {
      let categoryData = { ...formData }
      
      // Parse JSON image_paths if editor is visible
      if (showJsonEditor && jsonImagePaths) {
        try {
          categoryData.image_paths = JSON.parse(jsonImagePaths)
        } catch (e) {
          alert("Erro ao parsear JSON: " + e.message)
          return
        }
      }

      const url = `${medusaBaseUrl}/admin/categories`
      const method = editing ? "PUT" : "POST"

      const body = editing
        ? { ...categoryData, id: editing }
        : categoryData

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await fetchCategories()
        handleCancel()
      } else {
        const error = await response.json()
        alert("Erro ao salvar: " + (error.message || response.statusText))
      }
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
      alert("Erro ao salvar categoria")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) {
      return
    }

    try {
      const response = await fetch(`${medusaBaseUrl}/admin/categories?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        await fetchCategories()
      } else {
        alert("Erro ao excluir categoria")
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error)
      alert("Erro ao excluir categoria")
    }
  }

  const handleAddNew = () => {
    setEditing("new")
    setFormData({
      slug: "",
      name: "",
      description: "",
      icon: "",
      image: "",
      image_paths: [],
      is_active: true,
      order: 0,
      metadata: {},
    })
    setJsonImagePaths("[]")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marsala-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-marsala-800">Gerenciar Categorias</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/admin")}
            >
              Voltar
            </Button>
            <Button
              onClick={handleAddNew}
              className="bg-marsala-600 hover:bg-marsala-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </div>

        {editing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editing === "new" ? "Nova Categoria" : "Editar Categoria"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="clp-automacao"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="CLP e Automação"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da categoria"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ícone</label>
                  <Input
                    value={formData.icon || ""}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Cpu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Imagem</label>
                  <Input
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/image.jpg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ordem</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded"
                    />
                    <span>Ativo</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Caminhos de Imagens (JSON Array)</label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowJsonEditor(!showJsonEditor)}
                  >
                    {showJsonEditor ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {showJsonEditor && (
                  <Textarea
                    value={jsonImagePaths}
                    onChange={(e) => setJsonImagePaths(e.target.value)}
                    placeholder='["/image1.jpg", "/image2.jpg"]'
                    rows={5}
                    className="font-mono text-sm"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="bg-marsala-600 hover:bg-marsala-700"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <p className="text-sm text-gray-500">{category.slug}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Ordem:</span> {category.order}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span className={category.is_active ? "text-green-600" : "text-red-600"}>
                      {category.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </p>
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  {category.image_paths && category.image_paths.length > 0 && (
                    <p className="text-sm text-gray-500">
                      {category.image_paths.length} imagem(ns)
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(category.id!)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length === 0 && !editing && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Nenhuma categoria cadastrada</p>
            <Button
              onClick={handleAddNew}
              className="bg-marsala-600 hover:bg-marsala-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Criar Primeira Categoria
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

