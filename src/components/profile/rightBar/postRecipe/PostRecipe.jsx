import Link from 'next/link';
import styles from './postRecipe.module.css';
import RecipeForm from './recipeForm/RecipeForm';

const PostRecipe = () => {
	return (
		<div className={styles.container}>
			<h2>Share Your Recipe</h2>
			<button>
				<Link href={'/share'}>
					<h4>Visit the new page to post recipe by clicking this text</h4>
				</Link>
			</button>
		</div>
	);
};

export default PostRecipe;
