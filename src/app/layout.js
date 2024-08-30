import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { RecipeProvider } from '@/context/RecipeContext';
import { FavProvider } from '@/context/FavContext';
import MessageBox from '@/components/messageBox/MessageBox';
import { RatingProvider } from '@/context/RatingContext';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Dishy - The Flavor Network',
	description:
		"Discover a world of culinary delights with Dishy - The Flavor Network! Share your favorite recipes, explore new and exciting dishes, and connect with a community of food enthusiasts. Whether you're a seasoned chef or a home cook, Dishy offers a platform to showcase your culinary creations, get inspired by others, and rate and comment on recipes. Join now and start your flavorful journey with Dishy!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Analytics />
				<AuthProvider>
					<RecipeProvider>
						<FavProvider>
							<RatingProvider>
								<div className="container">
									<MessageBox />
									<Navbar />
									{children}
									<Footer />
								</div>
							</RatingProvider>
						</FavProvider>
					</RecipeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
