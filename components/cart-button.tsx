"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Plus, Minus, FileText, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, getTotal, getQuoteItems, getPurchaseItems, itemCount } = useCart()

  const quoteItems = getQuoteItems()
  const purchaseItems = getPurchaseItems()
  const total = getTotal()

  return (
    <>
      {/* Botão do Carrinho */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-marsala-700 text-white rounded-full hover:bg-marsala-800 transition-colors"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Drawer do Carrinho */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[9998]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-xl z-[9999]"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-bold text-marsala-700">Carrinho</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Itens de Orçamento */}
                      {quoteItems.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-4 w-4 text-marsala-600" />
                            <h3 className="font-semibold text-marsala-700">Produtos para Orçamento</h3>
                          </div>
                          <div className="space-y-3">
                            {quoteItems.map((item) => (
                              <CartItem
                                key={item.product.id}
                                item={item}
                                onRemove={() => removeItem(item.product.id)}
                                onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divisor */}
                      {quoteItems.length > 0 && purchaseItems.length > 0 && (
                        <hr className="my-4" />
                      )}

                      {/* Itens de Compra Direta */}
                      {purchaseItems.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="h-4 w-4 text-green-600" />
                            <h3 className="font-semibold text-green-700">Produtos para Compra</h3>
                          </div>
                          <div className="space-y-3">
                            {purchaseItems.map((item) => (
                              <CartItem
                                key={item.product.id}
                                item={item}
                                onRemove={() => removeItem(item.product.id)}
                                onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t p-6 space-y-4">
                    {total > 0 && (
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-marsala-700">
                          R$ {total.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    {/* Botões de Ação */}
                    <div className="space-y-2">
                      {quoteItems.length > 0 && (
                        <Link href="/orcamento" className="block">
                          <Button 
                            className="w-full bg-marsala-700 hover:bg-marsala-800 text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Solicitar Orçamento ({quoteItems.length})
                          </Button>
                        </Link>
                      )}
                      
                      {purchaseItems.length > 0 && (
                        <Link href="/checkout" className="block">
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Finalizar Compra ({purchaseItems.length})
                          </Button>
                        </Link>
                      )}
                    </div>
                    
                    <Link href="/produtos" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Continuar Navegando
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Componente de Item do Carrinho
function CartItem({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}: { 
  item: any
  onRemove: () => void
  onUpdateQuantity: (qty: number) => void
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start gap-3">
        {item.product.images?.[0] && (
          <div className="w-12 h-12 flex-shrink-0">
            <img 
              src={item.product.images[0]} 
              alt={item.product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-800 truncate">{item.product.name}</h4>
          {item.product.technicalName && (
            <p className="text-xs text-gray-500 truncate">{item.product.technicalName}</p>
          )}
          {item.product.price ? (
            <p className="text-sm font-semibold text-marsala-700 mt-1">
              R$ {item.product.price.toFixed(2)}
            </p>
          ) : (
            <p className="text-xs text-orange-600 mt-1">Sob consulta</p>
          )}
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      {/* Controle de Quantidade */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500">Quantidade:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        {item.product.price && (
          <span className="text-sm font-medium text-marsala-700">
            R$ {(item.product.price * item.quantity).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  )
}