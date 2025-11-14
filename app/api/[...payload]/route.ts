import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

const getPayloadInstance = async () => {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

export async function GET(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.expressHandler(req)
}

export async function POST(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.expressHandler(req)
}

export async function PUT(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.expressHandler(req)
}

export async function PATCH(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.expressHandler(req)
}

export async function DELETE(req: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.expressHandler(req)
}
