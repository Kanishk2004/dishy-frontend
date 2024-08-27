'use client';
import { useState } from 'react';
import styles from './recipeForm.module.css';
import AddIngredients from './addIngredients/AddIngredients';
import AddInstructions from './addInstructions/AddInstructions';
import ImageForm from './imageForm/ImageForm';
import { useRecipe } from '@/context/RecipeContext';

const RecipeForm = () => {
	const { uploadRecipe } = useRecipe();

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
	const [selectedImages, setSelectedImages] = useState([]);

	const [uploading, setUploading] = useState(false);

	const formData = new FormData();

	const handleSubmit = async (e) => {
		e.preventDefault();

		formData.append('title', title);
		formData.append('description', description);
		ingredients.map((ingredient) => formData.append('ingredients', ingredient));
		instructions.map((instruction) =>
			formData.append('instructions', instruction)
		);
		formData.append('prepTime', prepTime.toString());
		formData.append('cookTime', cookTime.toString());
		formData.append('category', category);
		formData.append('cuisine', cuisine);

		selectedImages.forEach((file) => {
			formData.append(`images`, file);
		});

		setUploading(true);

		await uploadRecipe(formData);

		setUploading(false);
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
				<label htmlFor="prepTime">Preparation Time (min)</label>
				<input
					type="number"
					name="prepTime"
					id="prepTime"
					value={prepTime}
					onChange={(e) => setPrepTime(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cookTime">`Cooking Time (min)`</label>
				<input
					type="number"
					name="cookTime"
					id="cookTime"
					value={cookTime}
					onChange={(e) => setCookTime(e.target.value)}
				/>
			</div>
			<ImageForm
				formData={formData}
				selectedImages={selectedImages}
				setSelectedImages={setSelectedImages}
			/>
			<div className={styles.btnContainer}>
				<button onClick={(e) => handleSubmit(e)} className={styles.postBtn}>
					Post
				</button>
			</div>
			{uploading && 'Uploading recipe....'}
		</form>
	);
};

export default RecipeForm;
