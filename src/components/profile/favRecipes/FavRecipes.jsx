'use client';
import { useFav } from '@/context/FavContext';
import styles from './favRecipes.module.css';
import { useRecipe } from '@/context/RecipeContext';
import { useEffect, useState } from 'react';
import RecipeCard from '@/components/recipeCard/RecipeCard';
import FavRecipeCard from './favRecipeCard/FavRecipeCard';

const FavRecipes = () => {
	const { userFavorites, getUserFavorites } = useFav();
	const { allRecipies, fetchAllRecipies } = useRecipe();

	const [favArr, setFavArr] = useState(null);

	useEffect(() => {
		const showUserFavorites = async () => {
			if (!allRecipies) {
				await fetchAllRecipies();
			}
			if (!userFavorites) {
				await getUserFavorites();
			}
			const favoriteRecipies = allRecipies?.filter((recipe) =>
				userFavorites?.includes(recipe._id)
			);
			setFavArr(favoriteRecipies);
		};

		showUserFavorites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userFavorites]);

	return (
		<div className={styles.container}>
			<h4>Favourite Recipes - ({favArr?.length})</h4>
			<div className={styles.cardContainer}>
				{favArr?.map((recipe) => (
					<FavRecipeCard
						key={recipe?._id}
						img={recipe?.imageUrl[0]}
						title={recipe?.title}
						desc={recipe?.description}
						cuisine={recipe?.cuisine}
						category={recipe?.category}
						date={recipe?.createdAt}
						totalTime={recipe?.totalTime}
						ingredients={recipe?.ingredients.length}
						recipeId={recipe?._id}
					/>
				))}
			</div>
		</div>
	);
};

export default FavRecipes;
