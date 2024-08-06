'use client';
import styles from './myRecipe.module.css';
import RecipeCard from './recipeCard/RecipeCard';
import { useAuth } from '@/context/AuthContext';

const MyRecipe = () => {
	const { myRecipies } = useAuth();

	return (
		<div className={styles.container}>
			{(!myRecipies || myRecipies.length === 0) && <h3>You posted 0 recipies</h3>}
			{myRecipies?.map((recipe) => (
				<RecipeCard
					key={recipe?._id}
					img={recipe?.imageUrl[0]}
					title={recipe?.title}
					desc={recipe?.description}
					cuisine={recipe?.cuisine}
					category={recipe?.category}
					date={recipe?.createdAt}
				/>
			))}
		</div>
	);
};

export default MyRecipe;
