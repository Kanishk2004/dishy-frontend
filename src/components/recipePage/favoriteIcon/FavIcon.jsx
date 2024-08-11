'use client';
import Image from 'next/image';
import styles from './favIcon.module.css';
import { useEffect } from 'react';
import { useFav } from '@/context/FavContext';
import { useAuth } from '@/context/AuthContext';

const FavIcon = ({ recipeId }) => {
	const { toggleFavorite, getUserFavorites, userFavorites, loadingFav } =
		useFav();
	const { user, setMessage } = useAuth();

	useEffect(() => {
		getUserFavorites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleFav = () => {
		if (!user) {
			setMessage({
				success: false,
				message: 'You need to login before adding favorites',
			});
		} else {
			toggleFavorite(recipeId);
		}
	};

	return (
		<div className={styles.container} onClick={toggleFav}>
			<Image
				className={styles.favIcon}
				src={
					loadingFav
						? '/circle-loading.gif'
						: userFavorites?.includes(recipeId)
						? '/white-filled-fav.png'
						: '/white-favorite.png'
				}
				alt="favorite"
				width={30}
				height={30}
				unoptimized
			/>
		</div>
	);
};

export default FavIcon;
