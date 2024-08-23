'use client';
import styles from './favorites.module.css';
import RecipeCard from '../../../recipeCard/RecipeCard';
import { useEffect, useState } from 'react';
import { useFav } from '@/context/FavContext';
import { useRecipe } from '@/context/RecipeContext';

const Favorites = () => {
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
			{(!favArr || favArr.length === 0) && (
				<h3>You have 0 Favorite recipies</h3>
			)}
			{favArr?.map((recipe) => (
				<RecipeCard
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
	);
};
// {userFavorites?.map((recipe) => (
//     <RecipeCard
//         key={recipe?._id}
//         img={recipe?.imageUrl[0]}
//         title={recipe?.title}
//         desc={recipe?.description}
//         cuisine={recipe?.cuisine}
//         category={recipe?.category}
//         date={recipe?.createdAt}
//         totalTime={recipe?.totalTime}
//         ingredients={recipe?.ingredients.length}
//         recipeId={recipe?._id}
//     />
// ))}
export default Favorites;
