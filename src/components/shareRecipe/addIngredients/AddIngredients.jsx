import Image from 'next/image';
import styles from './addIngredients.module.css';
import { useRef } from 'react';

const AddIngredients = ({
	ingredients,
	lastIndex,
	setLastIndex,
	setIngredients,
}) => {
	const inputRef = useRef(null);

	const handleAddIngredient = (e) => {
		e.preventDefault();
		const value = inputRef.current.value.trim();
		if (value !== '') {
			setIngredients([...ingredients, value]);
			inputRef.current.value = '';
			setLastIndex(ingredients.length);
		}
	};

	const handleDelete = (index) => {
		const updatedIngredients = ingredients.filter((_, i) => i !== index);
		setIngredients(updatedIngredients);
		setLastIndex(updatedIngredients.length - 1);
	};

	return (
		<div className={styles.container}>
			<label htmlFor="ingredients">Ingredients: </label>

			<div className={styles.orderedList}>
				<ul>
					{ingredients.map((ingredient, index) => (
						<div key={index} className={styles.deleteDiv}>
							<li>
								<input
								className={styles.previewInput}
									type="text"
									name="ingredient"
									id="ingredient"
									value={ingredient}
								/>
							</li>
							{index === lastIndex && (
								<span>
									<Image
										src={'/delete.png'}
										alt={'delete'}
										width={20}
										height={20}
										onClick={() => handleDelete(index)}
									/>
								</span>
							)}
						</div>
					))}
				</ul>
			</div>
			<div className={styles.inputContainer}>
				<div>
					<input
						type="text"
						className={styles.input}
						name="ingredients"
						id="ingredients"
						ref={inputRef}
						placeholder="Write Ingredients - Press + button to add"
					/>
					<button
						className={styles.addBtn}
						onClick={(e) => handleAddIngredient(e)}>
						<Image src={'/addIcon.png'} alt="add" width={20} height={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddIngredients;
