import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Dishy - The Flavor Network',
	description:
		"Discover a world of culinary delights with Dishy - The Flavor Network! Share your favorite recipes, explore new and exciting dishes, and connect with a community of food enthusiasts. Whether you're a seasoned chef or a home cook, Dishy offers a platform to showcase your culinary creations, get inspired by others, and rate and comment on recipes. Join now and start your flavorful journey with Dishy!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={inter.className}>
					<div className="container">
						<Navbar />
						{children}
						<Footer />
					</div>
				</body>
			</AuthProvider>
		</html>
	);
}