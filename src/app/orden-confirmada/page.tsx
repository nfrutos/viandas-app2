'use client';

import Layout from '@/components/Layout';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function OrdenConfirmadaPage() {
    const router = useRouter();
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);


    return (
        <Layout>
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" gutterBottom>
                    🎉 ¡Gracias por tu compra!
                </Typography>
                <Typography variant="body1" mb={4}>
                    Tu pedido fue recibido correctamente. En breve nos pondremos en contacto.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => router.push('/menu')}>
                    Volver al menú
                </Button>
            </Box>
        </Layout>
    );
}
