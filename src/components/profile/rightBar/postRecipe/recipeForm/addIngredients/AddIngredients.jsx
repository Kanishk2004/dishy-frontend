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
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<label htmlFor="ingredients">Ingredients</label>
				<input
					type="text"
					name="ingredients"
					id="ingredients"
					onKeyDown={handleAddIngredient}
					placeholder="Press Enter to add"
				/>
			</div>
			<div className={styles.orderedList}>
				<div className={styles.dummyDiv}></div>
				<ul>
					{ingredients.map((ingredient, index) => (
						<div key={index} className={styles.deleteDiv}>
							<li>{ingredient}</li>
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
		</div>
	);
};

export default AddIngredients;
