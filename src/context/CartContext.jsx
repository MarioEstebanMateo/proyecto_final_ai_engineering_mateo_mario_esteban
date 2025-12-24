import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  const [customerInfo, setCustomerInfo] = useState(() => {
    const saved = localStorage.getItem('customerInfo')
    return saved ? JSON.parse(saved) : {
      nombre: '',
      apellido: '',
      telefono: '',
      tipoEntrega: 'retiro',
      direccion: '',
      horario: ''
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo))
  }, [customerInfo])

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.gustos) === JSON.stringify(item.gustos)
      )

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && 
          JSON.stringify(cartItem.gustos) === JSON.stringify(item.gustos)
            ? { ...cartItem, cantidad: cartItem.cantidad + item.cantidad }
            : cartItem
        )
      }

      return [...prevCart, { ...item, cartId: Date.now() }]
    })
  }

  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(cartId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartId === cartId ? { ...item, cantidad } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const updateCustomerInfo = (info) => {
    setCustomerInfo(prev => ({ ...prev, ...info }))
  }

  const clearCustomerInfo = () => {
    const defaultInfo = {
      nombre: '',
      apellido: '',
      telefono: '',
      tipoEntrega: 'retiro',
      direccion: '',
      horario: ''
    }
    setCustomerInfo(defaultInfo)
    localStorage.removeItem('customerInfo')
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        customerInfo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateCustomerInfo,
        clearCustomerInfo,
        getTotalItems,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
