import { useBuyProducts, useGetCartProducts } from '@/hook/products'
import { useState } from 'react'
import { Button } from '../ui/button'

function Cart() {

  const [isOpen, setIsOpen] = useState(false)
  const { data: my_products } = useGetCartProducts()
  const { mutate: buyProducts } = useBuyProducts()

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Carrito de compras"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h13" />
        </svg>
      </button>

      {isOpen && my_products && my_products.length > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-blue-100 rounded-lg shadow-xl z-20 overflow-hidden">
          <div className="p-3 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h13" />
                </svg>
                Mi Carrito
              </h3>
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                {my_products.length} {my_products.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {my_products.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Tu carrito está vacío</div>
            ) : (
              my_products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{product.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-gray-500">Cantidad: {product.category}</div>
                      <div className="text-sm font-semibold text-blue-600">
                        ${(product.price * product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {my_products.length > 0 && (
            <>
              <div className="p-3 border-t border-blue-100 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-blue-900">
                    $
                    {my_products
                      .reduce((total: number, product: any) => total + product.price * product.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => buyProducts()}
                  disabled={my_products.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700">
                  Proceder al Pago
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Cart