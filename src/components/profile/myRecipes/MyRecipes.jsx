'use client';
import { useRecipe } from '@/context/RecipeContext';
import styles from './myRecipes.module.css';
import { useEffect } from 'react';
import MyRecipeCard from './myRecipeCard/MyRecipeCard';
import Link from 'next/link';

const MyRecipes = () => {
	const { myRecipies, fetchUserRecipies } = useRecipe();

	useEffect(() => {
		fetchUserRecipies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<h4>My Recipes - ({myRecipies?.length}) </h4>
			<div className={styles.recipeCardContainer}>
				{(!myRecipies || myRecipies.length === 0) && (
					<Link href={'/share'}>
						<button className={styles.addRecipeBtn}>Add Recipe</button>
					</Link>
				)}
				{myRecipies?.map((recipe) => (
					<MyRecipeCard recipe={recipe} key={recipe?._id} />
				))}
			</div>
		</div>
	);
};

export default MyRecipes;
