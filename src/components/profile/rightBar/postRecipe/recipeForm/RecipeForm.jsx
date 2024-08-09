'use client';
import { useState } from 'react';
import styles from './recipeForm.module.css';

const RecipeForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [instructions, setInstructions] = useState([]);
	const [prepTime, setPrepTime] = useState('');
	const [cookTime, setCookTime] = useState('');
	const [category, setCategory] = useState('');
	const [cuisine, setCuisine] = useState('');

	// title
	// description
	// ingredients[]
	// instructions[]
	// prepTime
	// cookTime
	// category
	// cuisine
	// images
	const handleAddIngredient = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			e.preventDefault();
			setIngredients([...ingredients, e.target.value.trim()]);
			e.target.value = '';
		}
	};
	const handleAddInstruction = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			e.preventDefault();
			setInstructions([...instructions, e.target.value.trim()]);
			e.target.value = '';
		}
	};

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
			<div className={styles.inputContainer}>
				<label htmlFor="ingredients">Ingredients</label>
				<input
					type="text"
					name="ingredients"
					id="ingredients"
					onKeyDown={handleAddIngredient}
					placeholder="Press Enter to add"
				/>
				<ul>
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="instructions">Instructions</label>
				<input
					type="text"
					name="instructions"
					id="instructions"
					onKeyDown={handleAddInstruction}
					placeholder="Press Enter to add"
				/>
				<ol>
					{instructions.map((instruction, index) => (
						<li key={index}>{instruction}</li>
					))}
				</ol>
			</div>
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
