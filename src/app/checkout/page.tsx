'use client';

import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (status === 'success') router.push('/orden-confirmada');
  }, [status, router]);

  const handleSubmit = async () => {
    if (!name || !phone) return alert('Completa todos los campos');

    setLoading(true);
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, name, phone }),
    });

    const data = await res.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert('Error al crear la orden');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>Finalizar compra</Typography>

      {cart.length === 0 ? (
        <Typography>Tu carrito está vacío.</Typography>
      ) : loading ? (
        <>
          <Typography>Redirigiendo a MercadoPago...</Typography>
          <CircularProgress />
        </>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
          <TextField
            label="Nombre y Apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Teléfono de contacto"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button variant="contained" onClick={handleSubmit}>
            Proceder al pago
          </Button>
        </Box>
      )}
    </Layout>
  );
}
