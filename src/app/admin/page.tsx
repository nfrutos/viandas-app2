'use client';

import { getOrders } from '@/services/getOrders';
import Layout from '@/components/Layout';
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    MenuItem,
    Select,
    SelectChangeEvent,
    Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type PedidoItem = {
    title: string;
    quantity: number;
    price: number;
};


type Order = Awaited<ReturnType<typeof getOrders>>[number] & {
    items: PedidoItem[];
    name: string;
    phone: string;
};

const estados = ['pending', 'preparado', 'entregado', 'cancelado'];

export default function AdminPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token === 'admin-session-ok') {
            setIsAllowed(true);
            fetchOrders();
        } else {
            router.push('/login');
        }
    }, [router]);

    const fetchOrders = async () => {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
    };

    const handleChangeEstado = async (id: string, newStatus: string) => {
        await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/login');
    };

    if (!isAllowed) return null;

    return (
        <Layout>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Panel de Pedidos</Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {orders.length === 0 ? (
                <Typography>No hay pedidos registrados aún.</Typography>
            ) : (
                <Paper elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Viandas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.status}
                                            size="small"
                                            onChange={(e: SelectChangeEvent) =>
                                                handleChangeEstado(order.id, e.target.value)
                                            }
                                        >
                                            {estados.map((estado) => (
                                                <MenuItem key={estado} value={estado}>
                                                    {estado}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                                            {(order.items as PedidoItem[]).map((item, index) => (


                                                <li key={index}>
                                                    {item.title} x{item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Layout>
    );
}
