'use client';
import Image from 'next/image';
import styles from './favIcon.module.css';
import { useEffect } from 'react';
import { useFav } from '@/context/FavContext';

const FavIcon = ({ recipeId }) => {
	const { toggleFavorite, getUserFavorites, userFavorites, loadingFav } =
		useFav();

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
