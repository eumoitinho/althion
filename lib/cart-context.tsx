"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/data/products'

export interface CartItem {
  product: Product
  quantity: number
  type: 'quote' | 'purchase'
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getQuoteItems: () => CartItem[]
  getPurchaseItems: () => CartItem[]
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    } else {
      localStorage.removeItem('cart')
    }
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      const type = product.requiresQuote ? 'quote' : 'purchase'
      return [...current, { product, quantity, type }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(current => current.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    
    setItems(current =>
      current.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => {
      if (item.product.hasPrice && item.product.price) {
        return total + (item.product.price * item.quantity)
      }
      return total
    }, 0)
  }

  const getQuoteItems = () => {
    return items.filter(item => item.type === 'quote')
  }

  const getPurchaseItems = () => {
    return items.filter(item => item.type === 'purchase')
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getQuoteItems,
        getPurchaseItems,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}