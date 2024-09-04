'use client';
import { useRecipe } from '@/context/RecipeContext';
import styles from './myRecipes.module.css';
import { useEffect } from 'react';

const MyRecipes = () => {
	const { myRecipies, fetchUserRecipies } = useRecipe();

	useEffect(() => {
		fetchUserRecipies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<h4>My Recipes</h4>
			<div className={styles.recipeCardContainer}>
				{(!myRecipies || myRecipies.length === 0) && (
					<h3>You posted 0 recipies</h3>
				)}
				{myRecipies?.map((recipe) => (
					<h5 key={recipe?._id}>{recipe?.title}</h5>
				))}
			</div>
		</div>
	);
};

export default MyRecipes;
