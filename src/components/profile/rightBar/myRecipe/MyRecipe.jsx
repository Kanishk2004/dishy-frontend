'use client';
import { useEffect } from 'react';
import styles from './myRecipe.module.css';
import RecipeCard from '../../../recipeCard/RecipeCard';
import { useRecipe } from '@/context/RecipeContext';
import EditRecipeCard from './editRecipeCard/EditRecipeCard';

const MyRecipe = () => {
	const { myRecipies, fetchUserRecipies } = useRecipe();

	useEffect(() => {
		fetchUserRecipies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			{(!myRecipies || myRecipies.length === 0) && (
				<h3>You posted 0 recipies</h3>
			)}
			{myRecipies?.map((recipe) => (
				<EditRecipeCard
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

export default MyRecipe;
