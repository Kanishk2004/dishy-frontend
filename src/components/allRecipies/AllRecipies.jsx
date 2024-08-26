'use client';
import styles from './allRecipies.module.css';
import RecipeCard from '../recipeCard/RecipeCard';
import { useEffect, useState } from 'react';
import { useRecipe } from '@/context/RecipeContext';

const AllRecipies = () => {
	const { allRecipies, fetchAllRecipies } = useRecipe();
	const [sortType, setSortType] = useState('new');

	useEffect(() => {
		fetchAllRecipies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = async (e) => {
		const selectedVal = e.target.value;
		setSortType(selectedVal);

		await fetchAllRecipies(selectedVal);
	};

	return (
		<div className={styles.container}>
			<div className={styles.queryBar}>
				<div>
					<h2>Tasty Recipies</h2>
				</div>
				<div className={styles.sortBy}>
					<label htmlFor="options">Sort By</label>
					<select id="options" name="options" onChange={handleChange}>
						<option value="new">Latest</option>
						<option value="old">Oldest</option>
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
