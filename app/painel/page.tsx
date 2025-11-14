"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Tag, Package, Settings, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const router = useRouter()

  const medusaAdminUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace("/store", "") || "http://localhost:9000"

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-marsala-800 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie conteúdo, categorias e produtos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/admin/conteudo")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-marsala-600" />
                Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gerencie páginas estáticas, hero sections, sobre, soluções e outros conteúdos do site.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/admin/categorias")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-6 w-6 text-marsala-600" />
                Categorias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gerencie categorias de produtos exibidas no site.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-marsala-600" />
                Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Gerencie produtos, preços, estoque e variantes.
              </p>
              <Link href={`${medusaAdminUrl}/app`} target="_blank">
                <Button variant="outline" className="w-full">
                  Abrir Medusa Admin
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-marsala-600" />
              Links Úteis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href={`${medusaAdminUrl}/app`} target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Medusa Admin Dashboard
                </Button>
              </Link>
              <Link href={`${medusaAdminUrl}/store/products`} target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Store - Produtos
                </Button>
              </Link>
              <Link href={`${medusaAdminUrl}/store/content`} target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Store - Conteúdo
                </Button>
              </Link>
              <Link href={`${medusaAdminUrl}/store/categories`} target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Store - Categorias
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

