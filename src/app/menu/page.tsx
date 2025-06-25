'use client';

import MenuItemCard from '@/components/MenuItemCard';
import Layout from '@/components/Layout';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const mockViandas = [
	{
		title: 'Milanesa con puré',
		description: 'Clásica milanesa de carne con puré de papas casero',
		price: 1200,
		image: 'https://source.unsplash.com/400x300/?milanesa',
	},
	{
		title: 'Ensalada César',
		description: 'Pollo grillado, lechuga, crutones y aderezo',
		price: 950,
		image: 'https://source.unsplash.com/400x300/?ensalada',
	},
	{
		title: 'Tarta de verdura',
		description: 'Tarta de espinaca y acelga con masa integral',
		price: 980,
		image: 'https://source.unsplash.com/400x300/?tarta',
	},
];

export default function MenuPage() {
	return (
		<Layout>
			<Typography variant="h4" gutterBottom>
				Menú del día
			</Typography>
			<Grid container spacing={3}>
				{mockViandas.map((item, index) => (
					// @ts-expect-error: Grid props type mismatch workaround

					<Grid key={index} item xs={12} sm={6} md={4}>

						<MenuItemCard {...item} />
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}
