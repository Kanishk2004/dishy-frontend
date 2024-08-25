import { apiURL } from '@/Constant';
import styles from './editRecipe.module.css';
import EditRecipeForm from '@/components/editRecipeForm/EditRecipeForm';

export const generateMetadata = async ({ params }) => {
	const { slug } = params;
	const recipe = await getRecipe(slug);

	return {
		title: `Edit Mode - ${recipe.title ? recipe.title : 'Post title'}`,
		description: recipe.description,
	};
};

const getRecipe = async (slug) => {
	try {
		let response = await fetch(`${apiURL}/recipies/${slug}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
			credentials: 'include',
		});
		response = await response.json();
		if (!response.success) {
			throw new Error('Something went wrong!');
		}
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log('Error: ', error);
	}
};

const editRecipe = async ({ params }) => {
	const { slug } = params;
	const recipe = await getRecipe(slug);

	return (
		<div className={styles.container}>
			<h2>Edit Recipe</h2>
			<EditRecipeForm
				img={recipe?.imageUrl[0]}
				title={recipe?.title}
				desc={recipe?.description}
				cuisine={recipe?.cuisine}
				category={recipe?.category}
				date={recipe?.createdAt}
				prepTime={recipe?.prepTime}
				cookTime={recipe?.cookTime}
				ingredients={recipe?.ingredients}
				instructions={recipe?.instructions}
				recipeId={recipe?._id}
			/>
		</div>
	);
};

export default editRecipe;
