import styles from './postRecipe.module.css';
import RecipeForm from './recipeForm/RecipeForm';

const PostRecipe = () => {
	return (
		<div className={styles.container}>
			<h2>Share Your Recipe</h2>
			<RecipeForm />
		</div>
	);
};

export default PostRecipe;
