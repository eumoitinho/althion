"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react"

interface Content {
  id?: string
  slug: string
  type: string
  title: string
  subtitle?: string
  description?: string
  content?: any
  image?: string
  video?: string
  is_active: boolean
  order: number
  metadata?: any
}

export default function AdminConteudoPage() {
  const router = useRouter()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Content>({
    slug: "",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    content: {},
    image: "",
    video: "",
    is_active: true,
    order: 0,
    metadata: {},
  })
  const [showJsonEditor, setShowJsonEditor] = useState(false)
  const [jsonContent, setJsonContent] = useState("")

  const medusaBaseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${medusaBaseUrl}/admin/content`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setContents(data.content || [])
      } else {
        console.error("Erro ao buscar conteúdo:", response.statusText)
      }
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (content: Content) => {
    setEditing(content.id || null)
    setFormData(content)
    setJsonContent(JSON.stringify(content.content || {}, null, 2))
  }

  const handleCancel = () => {
    setEditing(null)
    setFormData({
      slug: "",
      type: "",
      title: "",
      subtitle: "",
      description: "",
      content: {},
      image: "",
      video: "",
      is_active: true,
      order: 0,
      metadata: {},
    })
    setJsonContent("")
  }

  const handleSave = async () => {
    try {
      let contentData = { ...formData }
      
      // Parse JSON content if editor is visible
      if (showJsonEditor && jsonContent) {
        try {
          contentData.content = JSON.parse(jsonContent)
        } catch (e) {
          alert("Erro ao parsear JSON: " + e.message)
          return
        }
      }

      const url = editing
        ? `${medusaBaseUrl}/admin/content`
        : `${medusaBaseUrl}/admin/content`
      const method = editing ? "PUT" : "POST"

      const body = editing
        ? { ...contentData, id: editing }
        : contentData

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await fetchContents()
        handleCancel()
      } else {
        const error = await response.json()
        alert("Erro ao salvar: " + (error.message || response.statusText))
      }
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error)
      alert("Erro ao salvar conteúdo")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este conteúdo?")) {
      return
    }

    try {
      const response = await fetch(`${medusaBaseUrl}/admin/content?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        await fetchContents()
      } else {
        alert("Erro ao excluir conteúdo")
      }
    } catch (error) {
      console.error("Erro ao excluir conteúdo:", error)
      alert("Erro ao excluir conteúdo")
    }
  }

  const handleAddNew = () => {
    setEditing("new")
    setFormData({
      slug: "",
      type: "",
      title: "",
      subtitle: "",
      description: "",
      content: {},
      image: "",
      video: "",
      is_active: true,
      order: 0,
      metadata: {},
    })
    setJsonContent("{}")
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
          <h1 className="text-4xl font-bold text-marsala-800">Gerenciar Conteúdo</h1>
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
              Novo Conteúdo
            </Button>
          </div>
        </div>

        {editing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editing === "new" ? "Novo Conteúdo" : "Editar Conteúdo"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="home-hero"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="hero"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título do conteúdo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <Input
                  value={formData.subtitle || ""}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Subtítulo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Imagem</label>
                  <Input
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Vídeo</label>
                  <Input
                    value={formData.video || ""}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    placeholder="/video.mp4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                  <label className="block text-sm font-medium">Conteúdo (JSON)</label>
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
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    placeholder='{"key": "value"}'
                    rows={10}
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
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <p className="text-sm text-gray-500">{content.slug}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Tipo:</span> {content.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Ordem:</span> {content.order}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span className={content.is_active ? "text-green-600" : "text-red-600"}>
                      {content.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </p>
                  {content.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(content)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(content.id!)}
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

        {contents.length === 0 && !editing && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Nenhum conteúdo cadastrado</p>
            <Button
              onClick={handleAddNew}
              className="bg-marsala-600 hover:bg-marsala-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Criar Primeiro Conteúdo
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

