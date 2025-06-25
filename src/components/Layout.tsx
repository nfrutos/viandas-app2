'use client';

import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('admin_token');
            setIsAdmin(token === 'admin-session-ok');
        }
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/login');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => router.push('/menu')}
                        >
                            Viandas Online
                        </Typography>
                    </Box>

                    <Box display="flex" gap={2}>
                        {isAdmin && (
                            <>
                                <Button color="inherit" onClick={() => router.push('/admin')}>
                                    Admin
                                </Button>
                                <Button color="inherit" onClick={handleLogout}>
                                    Cerrar sesión
                                </Button>
                            </>
                        )}
                        {!isAdmin && (
                            <>
                                <Button color="inherit" onClick={() => router.push('/carrito')}>
                                    Carrito
                                </Button>
                                <Button color="inherit" onClick={() => router.push('/login')}>
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                {children}
            </Container>
        </>
    );
}
