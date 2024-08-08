'use client';
import styles from './allRecipies.module.css';
import RecipeCard from '../profile/rightBar/myRecipe/recipeCard/RecipeCard';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const AllRecipies = () => {
	const { allRecipies, fetchAllRecipies } = useAuth();

	useEffect(() => {
		fetchAllRecipies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.queryBar}>
				<div>
					<h2>Tasty Recipies</h2>
				</div>
				<div className={styles.sortBy}>
					<select id="options" name="options">
						<option value="latest" defaultValue={'Sort By'}>
							Sort By
						</option>
						<option value="latest">Latest</option>
						<option value="popular">Popular</option>
						<option value="oldest">Oldest</option>
					</select>
				</div>
			</div>

			<div className={styles.recipeContainer}>
				{allRecipies?.map((recipe) => (
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
		</div>
	);
};

export default AllRecipies;
