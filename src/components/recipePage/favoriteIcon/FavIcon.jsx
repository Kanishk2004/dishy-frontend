'use client';
import Image from 'next/image';
import styles from './favIcon.module.css';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const FavIcon = ({ recipeId }) => {
	const { toggleFavorite, getUserFavorites, userFavorites, loadingFav } =
		useAuth();

	useEffect(() => {
		getUserFavorites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container} onClick={() => toggleFavorite(recipeId)}>
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
