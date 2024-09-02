'use client';
import Image from 'next/image';
import styles from './recipeCard.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFav } from '@/context/FavContext';
import { useAuth } from '@/context/AuthContext';

const RecipeCard = ({
	img,
	title,
	desc,
	cuisine,
	category,
	totalTime,
	ingredients,
	recipeId,
}) => {
	const { toggleFavorite, userFavorites, loadingFav } = useFav();
	const { user, setMessage } = useAuth();

	const router = useRouter();

	const handleViewRecipe = (recipeId) => {
		router.push(`/recipies/${recipeId}`);
	};

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

	let userFavoriteRecipesArray = [];
	if (user) {
		userFavoriteRecipesArray = user.userFavorites?.recipies;
	}

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<div className={styles.favorite} onClick={toggleFav}>
					<Image
						className={styles.favIcon}
						src={
							loadingFav
								? '/circle-loading.gif'
								: userFavoriteRecipesArray?.includes(recipeId) ||
								  userFavorites?.includes(recipeId)
								? '/white-filled-fav.png'
								: '/white-favorite.png'
						}
						alt="favorite"
						width={20}
						height={20}
					/>
				</div>
				<Image
					className={styles.img}
					src={img}
					alt="recipe"
					width={300}
					height={200}
					priority={false}
				/>
			</div>
			<div className={styles.recipeInfoContainer}>
				<div className={styles.cuisineAndCategory}>
					<span>
						<i>{cuisine}</i>
					</span>
					<span>
						<i>{category}</i>
					</span>
				</div>
				<div className={styles.recipeInfo}>
					{title?.length > 25 ? (
						<h2>{title?.toString().slice(0, 24) + '...'}</h2>
					) : (
						<h2>{title}</h2>
					)}

					<div className={styles.recipeDetails}>
						<div>
							<div className={styles.clockContainer}>
								<Image src={'/clock.png'} alt="clock" width={20} height={20} />
								<p className={styles.totalTime}>
									<b>{totalTime}</b>
								</p>
							</div>
							<p className={styles.detailName}>Minutes</p>
						</div>
						<div>
							<div className={styles.clockContainer}>
								<Image src={'/book.png'} alt="book" width={20} height={20} />
								<p className={styles.totalTime}>
									<b>{ingredients}</b>
								</p>
							</div>
							<p className={styles.detailName}>Ingredients</p>
						</div>
					</div>

					<p className={styles.desc}>{desc.toString().slice(0, 100) + '...'}</p>
					<button
						className={styles.btn}
						onClick={() => handleViewRecipe(recipeId)}>
						View Recipe
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
