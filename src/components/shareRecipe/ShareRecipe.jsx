'use client';
import { useState } from 'react';
import styles from './shareRecipe.module.css';
import { useRecipe } from '@/context/RecipeContext';
import ImageForm from './imageForm/ImageForm';
import AddIngredients from './addIngredients/AddIngredients';

const ShareRecipe = () => {
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
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<h2>Create New Recipe</h2>
				<button>Save</button>
			</div>
			<form className={styles.form}>
				<div className={styles.inputContainer}>
					<label htmlFor="title">Recipe Title: </label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Write Title"
					/>
				</div>
				<ImageForm
					selectedImages={selectedImages}
					setSelectedImages={setSelectedImages}
				/>
				<div className={styles.inputContainer}>
					<label htmlFor="description">Description: </label>
					<textarea
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Write Description"
					/>
				</div>
				<AddIngredients
					ingredients={ingredients}
					lastIndex={ingredientsLastIndex}
					setLastIndex={setIngredientsLastIndex}
					setIngredients={setIngredients}
				/>
			</form>
		</div>
	);
};

export default ShareRecipe;
