'use client';
import { useState } from 'react';
import styles from './editRecipeForm.module.css';
import Image from 'next/image';

const EditRecipeForm = ({
	img,
	title,
	desc,
	cuisine,
	category,
	date,
	ingredients,
	instructions,
	recipeId,
	prepTime,
	cookTime,
}) => {
	const [newTitle, setNewTitle] = useState(title);
	const [newDesc, setNewDesc] = useState(desc);
	const [newPrepTime, setNewPrepTime] = useState(prepTime);
	const [newCookTime, setNewCookTime] = useState(cookTime);
	const [newIngredients, setNewIngredients] = useState(ingredients);
	const [newInstructions, setNewInstructions] = useState(instructions);
	const [newCategory, setNewCategory] = useState(category);
	const [newCuisine, setNewCuisine] = useState(cuisine);

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
						<div key={index}>
							<input
								type="text"
								name="ingredients"
								id="ingredients"
								value={ingredient}
								onChange={(e) => handleIngredientChange(index, e.target.value)}
							/>
							{index > 0 && (
								<Image
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
						type="button"
						className={styles.addButton}
						onClick={handleAddIngredient}>
						Add Ingredient
					</button>
				</div>
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="instructions">Instructions</label>
				<div className={styles.ingredientContainer}>
					{newInstructions.map((instruction, index) => (
						<div key={index}>
							<input
								type="text"
								name="ingredients"
								id="instructions"
								value={instruction}
								onChange={(e) => handleInstructionChange(index, e.target.value)}
							/>
							{index > 0 && (
								<Image
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
						type="button"
						className={styles.addButton}
						onClick={handleAddInstruction}>
						Add Instruction
					</button>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="prepTime">Preparation Time</label>
				<input
					type="text"
					name="prepTime"
					id="prepTime"
					value={newPrepTime}
					onChange={(e) => setNewPrepTime(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cookTime">Cooking Time</label>
				<input
					type="text"
					name="cookTime"
					id="cookTime"
					value={newCookTime}
					onChange={(e) => setNewCookTime(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="category">Category</label>
				<input
					type="text"
					name="category"
					id="category"
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="cuisine">Cuisine</label>
				<input
					type="text"
					name="cuisine"
					id="cuisine"
					value={newCuisine}
					onChange={(e) => setNewCuisine(e.target.value)}
				/>
			</div>
		</form>
	);
};

export default EditRecipeForm;
