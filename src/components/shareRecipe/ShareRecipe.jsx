'use client';
import { useState } from 'react';
import styles from './shareRecipe.module.css';
import { useRecipe } from '@/context/RecipeContext';
import ImageForm from './imageForm/ImageForm';
import AddIngredients from './addIngredients/AddIngredients';
import AddInstructions from './addInstructions/AddInstructions';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const ShareRecipe = () => {
	const { uploadRecipe } = useRecipe();
	const { setMessage, user } = useAuth();

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
	const [descLen, setDescLen] = useState(0);

	const [uploading, setUploading] = useState(false);

	const formData = new FormData();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || title.trim() === '') {
			setMessage({
				success: false,
				message: 'Title is required',
			});
		}
		if (!description || description.trim() === '') {
			setMessage({
				success: false,
				message: 'Description is required',
			});
		}
		if (descLen > 100) {
			setMessage({
				success: false,
				message: 'Description must be less than 100 Words',
			});
		}
		if (ingredients.length === 0) {
			setMessage({
				success: false,
				message: 'Ingredients are required',
			});
		}
		if (instructions.length === 0) {
			setMessage({
				success: false,
				message: 'Instructions are required',
			});
		}
		if (selectedImages.length === 0) {
			setMessage({
				success: false,
				message: 'Upload atleast one Image',
			});
		}
		if (!cookTime || cookTime.trim() === '') {
			setMessage({
				success: false,
				message: 'Cooking time is required',
			});
		}
		if (!prepTime || prepTime.trim() === '') {
			setMessage({
				success: false,
				message: 'Prep time is required',
			});
		}
		if (!cuisine || cuisine.trim() === '') {
			setMessage({
				success: false,
				message: 'Cuisine is required',
			});
		}
		if (!category || category.trim() === '') {
			setMessage({
				success: false,
				message: 'Category is required',
			});
		}

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

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
		const wordsLen = (str) => {
			const array = str.trim().split(/\s+/);
			return array.length;
		};
		setDescLen(wordsLen(description));
	};

	return (
		<div className={styles.container}>
			{!user && (
				<div className={styles.unAuthorized}>
					<h3>Please Login or Create account to post Recipes</h3>

					<Link href={'/login'} className={styles.authBtn}>
						Login
					</Link>

					<Link href={'/register'} className={styles.authBtn}>
						Register
					</Link>
				</div>
			)}
			{user && (
				<div className={styles.topContainer}>
					<h2>Create New Recipe</h2>
					<button onClick={(e) => handleSubmit(e)}>
						{uploading ? 'Please wait...' : 'Post'}
					</button>
				</div>
			)}
			{user && (
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
							rows={5}
							value={description}
							onChange={(e) => handleDescriptionChange(e)}
							placeholder="Write Description"
						/>
						<p className={styles.descLength}>{descLen}/100</p>
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
					<div className={styles.timeDiv}>
						<div className={styles.inputContainer}>
							<label htmlFor="cookTime">Cooking Time: </label>
							<input
								type="number"
								name="cookTime"
								id="cookTime"
								placeholder="Time in minutes"
								value={cookTime}
								onChange={(e) => setCookTime(e.target.value)}
							/>
						</div>
						<div className={styles.inputContainer}>
							<label htmlFor="prepTime">Prep Time: </label>
							<input
								type="number"
								name="prepTime"
								id="prepTime"
								placeholder="Time in minutes"
								value={prepTime}
								onChange={(e) => setPrepTime(e.target.value)}
							/>
						</div>
					</div>
					<div className={`${styles.inputContainer} ${styles.cuisineDiv}`}>
						<label htmlFor="cuisine">Cuisine: </label>
						<input
							type="text"
							name="cuisine"
							id="cuisine"
							value={cuisine}
							placeholder="Write Cuisine"
							onChange={(e) => setCuisine(e.target.value)}
						/>
					</div>
					<div className={`${styles.inputContainer} ${styles.cuisineDiv}`}>
						<label htmlFor="category">Category: </label>
						<input
							type="text"
							name="category"
							id="category"
							value={category}
							placeholder="Write Category"
							onChange={(e) => setCategory(e.target.value)}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default ShareRecipe;
