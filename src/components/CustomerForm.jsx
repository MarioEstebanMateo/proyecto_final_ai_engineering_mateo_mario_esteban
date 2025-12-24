import React, { useState, useEffect } from 'react'
import { Truck, Store, Clock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2'

const CustomerForm = ({ onNext }) => {
  const { customerInfo, updateCustomerInfo } = useCart()
  const [formData, setFormData] = useState(customerInfo)

  useEffect(() => {
    setFormData(customerInfo)
  }, [customerInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa tu nombre',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    if (!formData.apellido.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa tu apellido',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    if (!formData.telefono.trim() || formData.telefono.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un número de teléfono válido',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    if (!formData.horario) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona un horario',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    const [hora] = formData.horario.split(':').map(Number)
    if (hora < 12 || hora > 23) {
      Swal.fire({
        icon: 'error',
        title: 'Horario no válido',
        text: 'El horario debe ser entre las 12:00 y las 23:00',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    if (formData.tipoEntrega === 'delivery' && !formData.direccion.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa la dirección de entrega',
        confirmButtonColor: '#ec4899'
      })
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      updateCustomerInfo(formData)
      Swal.fire({
        icon: 'success',
        title: '¡Datos guardados!',
        text: 'Ahora puedes seleccionar tus productos',
        confirmButtonColor: '#ec4899',
        timer: 2000
      })
      onNext()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Información del Pedido
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de entrega */}
          <div>
            <label className="label">Tipo de Pedido *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'retiro' }))}
                className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                  formData.tipoEntrega === 'retiro'
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Store className="w-6 h-6 text-pink-500" />
                <div className="text-left">
                  <div className="font-semibold">Retiro en Local</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Retirar en el local
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, tipoEntrega: 'delivery' }))}
                className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                  formData.tipoEntrega === 'delivery'
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Truck className="w-6 h-6 text-pink-500" />
                <div className="text-left">
                  <div className="font-semibold">Delivery</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Envío a domicilio
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="input-field"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="label">Apellido *</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="input-field"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="label">Número de Celular *</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="input-field"
              placeholder="+54 11 1234-5678"
            />
          </div>

          {/* Dirección (solo si es delivery) */}
          {formData.tipoEntrega === 'delivery' && (
            <div>
              <label className="label">Dirección de Entrega *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="input-field"
                placeholder="Calle, número, piso, depto"
              />
            </div>
          )}

          {/* Horario */}
          <div>
            <label className="label">
              <Clock className="w-5 h-5 inline mr-2" />
              Horario de {formData.tipoEntrega === 'retiro' ? 'Retiro' : 'Entrega'} *
            </label>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              min="12:00"
              max="23:00"
              className="input-field"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Horario disponible: 12:00 a 23:00
            </p>
          </div>

          <button type="submit" className="btn-primary w-full">
            Continuar al Catálogo
          </button>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
