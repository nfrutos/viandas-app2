'use client';

import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useCart } from '@/context/CartContext';

type Props = {
    title: string;
    description: string;
    price: number;
    image: string;
};

export default function MenuItemCard({ title, description, price, image }: Props) {
    const { addToCart } = useCart(); // ✅ Ahora está bien

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                component="img"
                height="160"
                image={image}
                alt={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
                    ${price.toFixed(2)}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                        addToCart({ title, description, price, image, quantity: 1 })
                    }
                >
                    Agregar al carrito
                </Button>
            </Box>
        </Card>
    );
}
