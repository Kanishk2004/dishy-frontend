'use client';
import { useState } from 'react';
import styles from './editRecipeForm.module.css';
import Image from 'next/image';
import { apiURL } from '@/Constant';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const EditRecipeForm = ({
	img,
	title,
	desc,
	cuisine,
	category,
	ingredients,
	instructions,
	recipeId,
	prepTime,
	cookTime,
}) => {
	const router = useRouter();

	const { setMessage } = useAuth();
	const [newTitle, setNewTitle] = useState(title);
	const [newDesc, setNewDesc] = useState(desc);
	const [newPrepTime, setNewPrepTime] = useState(prepTime);
	const [newCookTime, setNewCookTime] = useState(cookTime);
	const [newIngredients, setNewIngredients] = useState(ingredients);
	const [newInstructions, setNewInstructions] = useState(instructions);
	const [newCategory, setNewCategory] = useState(category);
	const [newCuisine, setNewCuisine] = useState(cuisine);
	const [uploading, setUploading] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const handleIngredientChange = (index, value) => {
		const updatedIngredients = newIngredients.map((ingredient, i) =>
			i === index ? value : ingredient
		);
		setNewIngredients(updatedIngredients);
	};

	const handleIngredientDelete = (index) => {
		const updatedIngredients = newIngredients.filter((_, i) => i !== index);
		setNewIngredients(updatedIngredients);
	};

	const handleAddIngredient = () => {
		setNewIngredients([...newIngredients, '']);
	};

	const handleInstructionChange = (index, value) => {
		const updatedInstructions = newInstructions.map((instruction, i) =>
			i === index ? value : instruction
		);
		setNewInstructions(updatedInstructions);
	};

	const handleInstructionDelete = (index) => {
		const updatedInstructions = newInstructions.filter((_, i) => i !== index);
		setNewInstructions(updatedInstructions);
	};

	const handleAddInstruction = () => {
		setNewInstructions([...newInstructions, '']);
	};

	// const formData = new FormData();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updateData = {};
		if (title !== newTitle.trim()) updateData.title = newTitle.trim();
		if (desc !== newDesc.trim()) updateData.description = newDesc.trim();
		if (prepTime !== newPrepTime) updateData.prepTime = newPrepTime;
		if (cookTime !== newCookTime) updateData.cookTime = newCookTime;
		if (category !== newCategory.trim())
			updateData.category = newCategory.trim();
		if (cuisine !== newCuisine.trim()) updateData.cuisine = newCuisine.trim();

		if (JSON.stringify(ingredients) !== JSON.stringify(newIngredients)) {
			updateData.ingredients = newIngredients;
		}
		if (JSON.stringify(instructions) !== JSON.stringify(newInstructions)) {
			updateData.instructions = newInstructions;
		}

		try {
			const accessToken = localStorage.getItem('accessToken');
			setUploading(true);

			let res = await fetch(`${apiURL}/recipies/${recipeId}`, {
				method: 'PATCH',
				body: JSON.stringify(updateData),
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});

			res = await res.json();
			if (res.success) {
				setMessage({
					success: true,
					message: res.message,
				});
				router.push('/profile?section=myRecipe');
			}
			if (!res.success) {
				setMessage({
					success: false,
					message: res.message,
				});
			}
			setUploading(false);
		} catch (error) {
			console.log('Something went wrong');
			console.log(error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const accessToken = localStorage.getItem('accessToken');
			setDeleting(true);

			let res = await fetch(`${apiURL}/recipies/${recipeId}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				credentials: 'include',
			});
			res = await res.json();
			if (res.success) {
				setMessage({
					success: true,
					message: res.message,
				});
				router.push('/profile?section=myRecipe');
			}
			if (!res.success) {
				setMessage({
					success: false,
					message: res.message,
				});
			}
			setDeleting(false);
		} catch (error) {
			console.log('Something went wrong');
			console.log(error);
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
					value={newTitle}
					onChange={(e) => {
						setNewTitle(e.target.value);
					}}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="description">Description</label>
				<textarea
					type="text"
					name="description"
					id="description"
					value={newDesc}
					onChange={(e) => setNewDesc(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="ingredients">Ingredients</label>
				<div className={styles.ingredientContainer}>
					{newIngredients.map((ingredient, index) => (
						<div key={index} className={styles.inputAndDelete}>
							<p>{index + 1}. </p>
							<input
								type="text"
								name="ingredients"
								id="ingredients"
								value={ingredient}
								onChange={(e) => handleIngredientChange(index, e.target.value)}
							/>
							{index > 0 && (
								<Image
									className={styles.deleteIcon}
									src={'/delete.png'}
									alt="delete"
									width={20}
									height={20}
									onClick={() => handleIngredientDelete(index)}
								/>
							)}
						</div>
					))}
					<button
						className={styles.addBtn}
						type="button"
						onClick={handleAddIngredient}>
						<Image src={'/addIcon.png'} alt="add" width={30} height={30} />
					</button>
				</div>
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="instructions">Instructions</label>
				<div className={styles.ingredientContainer}>
					{newInstructions.map((instruction, index) => (
						<div
							key={index}
							className={`${styles.inputAndDelete} ${styles.instructionInputAndDelete}`}>
							<p>{index + 1}. </p>
							<input
								type="text"
								name="ingredients"
								id="instructions"
								value={instruction}
								onChange={(e) => handleInstructionChange(index, e.target.value)}
							/>
							{index > 0 && (
								<Image
									className={styles.deleteIcon}
									src={'/delete.png'}
									alt="delete"
									width={20}
									height={20}
									onClick={() => handleInstructionDelete(index)}
								/>
							)}
						</div>
					))}
					<button
						className={styles.addBtn}
						type="button"
						onClick={handleAddInstruction}>
						<Image src={'/addIcon.png'} alt="add" width={30} height={30} />
					</button>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="prepTime">Preparation Time</label>
				<div className={styles.smallInput}>
					<input
						type="text"
						name="prepTime"
						id="prepTime"
						value={newPrepTime}
						onChange={(e) => setNewPrepTime(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cookTime">Cooking Time</label>
				<div className={styles.smallInput}>
					<input
						type="text"
						name="cookTime"
						id="cookTime"
						value={newCookTime}
						onChange={(e) => setNewCookTime(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="category">Category</label>
				<div className={styles.smallInput}>
					<input
						type="text"
						name="category"
						id="category"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cuisine">Cuisine</label>
				<div className={styles.smallInput}>
					<input
						type="text"
						name="cuisine"
						id="cuisine"
						value={newCuisine}
						onChange={(e) => setNewCuisine(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.btnContainer}>
				<button className={styles.submitBtn} onClick={(e) => handleSubmit(e)}>
					{uploading ? 'Uploading...' : 'Save'}
				</button>
				<button
					className={`${styles.submitBtn} ${styles.deleteBtn}`}
					onClick={(e) => handleDelete(e)}>
					{deleting ? (
						<Image
							src={'/circle-loading.gif'}
							alt="loading animation"
							width={20}
							height={20}
						/>
					) : (
						'Delete Recipe'
					)}
				</button>
			</div>
		</form>
	);
};

export default EditRecipeForm;
