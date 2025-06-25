'use client';

import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import Box from '@mui/material/Box';
import {
    Typography,
    Button,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CarritoPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                Carrito de compras
            </Typography>

            {cart.length === 0 ? (
                <Typography variant="body1">Tu carrito está vacío.</Typography>
            ) : (
                <>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                        gap={2}
                    >
                        {cart.map((item, index) => (
                            <Box key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.title}</Typography>
                                        <Typography variant="body2">{item.description}</Typography>
                                        <Typography variant="body1">Cantidad: {item.quantity}</Typography>
                                        <Typography variant="body1">Precio: ${item.price}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => removeFromCart(item.title)} color="error">
                                            Eliminar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))}
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        <Box display="flex" gap={2} mt={2}>
                            <Button variant="contained" color="primary" onClick={handleCheckout}>
                                Finalizar compra
                            </Button>
                            <Button variant="outlined" onClick={clearCart}>
                                Vaciar carrito
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Layout>
    );
}
