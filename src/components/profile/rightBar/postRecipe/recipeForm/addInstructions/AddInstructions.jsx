import Image from 'next/image';
import styles from './addInstructions.module.css';

const AddInstructions = ({
	instructions,
	setInstructions,
	lastIndex,
	setLastIndex,
}) => {
	const handleAddInstructions = (e) => {
		if (e.key === 'Enter' && e.target.value.trim() !== '') {
			e.preventDefault();
			setInstructions([...instructions, e.target.value.trim()]);
			e.target.value = '';
			setLastIndex(instructions.length);
		}
	};

	const handleDelete = (index) => {
		const updatedInstructions = instructions.filter((_, i) => i !== index);
		setInstructions(updatedInstructions);
		setLastIndex(updatedInstructions.length - 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<label htmlFor="instructions">Instructions</label>
				<input
					type="text"
					name="instructions"
					id="instructions"
					onKeyDown={handleAddInstructions}
					placeholder="Press Enter to add"
				/>
			</div>

			<div className={styles.orderedList}>
				<div className={styles.dummyDiv}></div>
				<ol>
					{instructions.map((instruction, index) => (
						<div key={index} className={styles.deleteDiv}>
							<li>{instruction}</li>
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
				</ol>
			</div>
		</div>
	);
};

export default AddInstructions;
