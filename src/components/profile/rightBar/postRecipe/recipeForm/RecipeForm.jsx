'use client';
import { useState } from 'react';
import styles from './recipeForm.module.css';
import AddIngredients from './addIngredients/AddIngredients';
import AddInstructions from './addInstructions/AddInstructions';

const RecipeForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);
	const [prepTime, setPrepTime] = useState('');
	const [cookTime, setCookTime] = useState('');
	const [category, setCategory] = useState('');
	const [cuisine, setCuisine] = useState('');
	const [ingredientsLastIndex, setIngredientsLastIndex] = useState(null);
	const [instructionsLastIndex, setInstructionsLastIndex] = useState(null);

	// title
	// description
	// ingredients[]
	// instructions[]
	// prepTime
	// cookTime
	// category
	// cuisine
	// images

	return (
		<form className={styles.container}>
			<div className={styles.inputContainer}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="description">Description</label>
				<textarea
					type="text"
					name="description"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<AddIngredients
				ingredients={ingredients}
				lastIndex={ingredientsLastIndex}
				setLastIndex={setIngredientsLastIndex}
				setIngredients={setIngredients}
			/>

			<AddInstructions
				instructions={instructions}
				setInstructions={setInstructions}
				lastIndex={instructionsLastIndex}
				setLastIndex={setInstructionsLastIndex}
			/>

			<div className={styles.inputContainer}>
				<label htmlFor="cuisine">Cuisine</label>
				<input
					type="text"
					name="cuisine"
					id="cuisine"
					value={cuisine}
					onChange={(e) => setCuisine(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="category">Category</label>
				<input
					type="text"
					name="category"
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="prepTime">Preparation Time</label>
				<input
					type="text"
					name="prepTime"
					id="prepTime"
					value={prepTime}
					onChange={(e) => setPrepTime(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cookTime">Cooking Time</label>
				<input
					type="text"
					name="cookTime"
					id="cookTime"
					value={cookTime}
					onChange={(e) => setCookTime(e.target.value)}
				/>
			</div>
		</form>
	);
};

export default RecipeForm;
