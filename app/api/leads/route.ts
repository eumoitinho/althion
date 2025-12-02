import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export interface Lead {
  id: string
  nome: string
  email: string
  telefone: string
  mensagem: string
  origem: string
  createdAt: string
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json')

// Garantir que o diretório e arquivo existam
async function ensureLeadsFile() {
  const dir = path.dirname(LEADS_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
  
  try {
    await fs.access(LEADS_FILE)
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2))
  }
}

// GET - Listar todos os leads
export async function GET() {
  try {
    await ensureLeadsFile()
    const data = await fs.readFile(LEADS_FILE, 'utf-8')
    const leads: Lead[] = JSON.parse(data)
    
    return NextResponse.json({ 
      success: true, 
      leads,
      total: leads.length 
    })
  } catch (error) {
    console.error('Erro ao buscar leads:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar leads' },
      { status: 500 }
    )
  }
}

// POST - Criar novo lead
export async function POST(request: NextRequest) {
  try {
    await ensureLeadsFile()
    
    const body = await request.json()
    const { nome, email, telefone, mensagem, origem = 'landing-servicos' } = body

    // Validação básica
    if (!nome || !email) {
      return NextResponse.json(
        { success: false, error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Ler leads existentes
    const data = await fs.readFile(LEADS_FILE, 'utf-8')
    const leads: Lead[] = JSON.parse(data)

    // Criar novo lead
    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nome,
      email,
      telefone: telefone || '',
      mensagem: mensagem || '',
      origem,
      createdAt: new Date().toISOString()
    }

    // Adicionar ao início da lista (mais recente primeiro)
    leads.unshift(newLead)

    // Salvar
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2))

    console.log(`✅ Novo lead criado: ${newLead.id} - ${newLead.nome} (${newLead.email})`)

    return NextResponse.json({ 
      success: true, 
      message: 'Lead criado com sucesso',
      lead: newLead 
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar lead:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
