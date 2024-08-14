import Image from 'next/image';
import styles from './addIngredients.module.css';

const AddIngredients = ({
	ingredients,
	lastIndex,
	setLastIndex,
	setIngredients,
}) => {
    
	const handleAddIngredient = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			e.preventDefault();
			setIngredients([...ingredients, e.target.value.trim()]);
			e.target.value = '';
			setLastIndex(ingredients.length);
		}
	};

	const handleDelete = (index) => {
		const updatedIngredients = ingredients.filter((_, i) => i !== index);
		setIngredients(updatedIngredients);
		setLastIndex(updatedIngredients.length - 1);
	};

	return (
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
					<div key={index}>
						<li>{ingredient}</li>
						{index === lastIndex && (
							<Image
								src={'/delete.png'}
								alt={'delete'}
								width={20}
								height={20}
								onClick={() => handleDelete(index)}
							/>
						)}
					</div>
				))}
			</ul>
		</div>
	);
};

export default AddIngredients;
