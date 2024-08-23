'use client';
import styles from './editRecipeForm.module.css';

const EditRecipeForm = ({
	img,
	title,
	desc,
	cuisine,
	category,
	date,
	totalTime,
	ingredients,
	recipeId,
}) => {
	return (
		<div className={styles.container}>
			<h1>{title}</h1>
            <form>
                
            </form>
		</div>
	);
};

export default EditRecipeForm;
