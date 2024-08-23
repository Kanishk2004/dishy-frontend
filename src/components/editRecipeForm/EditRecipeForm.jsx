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
                <div className={styles.inputContainer}>
					<label>Title</label>
					<input type="text" name="title" id="title" />
				</div>
                <div className={styles.inputContainer}>
					<label>Description</label>
					<input type="text" name="description" id="description" />
				</div>
                <div className={styles.inputContainer}>
					<label>Title</label>
					<input type="text" name="title" id="title" />
				</div>
            </form>
		</div>
	);
};

export default EditRecipeForm;
