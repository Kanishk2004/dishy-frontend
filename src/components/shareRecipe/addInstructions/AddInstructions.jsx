import Image from 'next/image';
import styles from './addInstructions.module.css';
import { useRef } from 'react';

const AddInstructions = ({
	instructions,
	setInstructions,
	lastIndex,
	setLastIndex,
}) => {
	const inputRef = useRef(null);

	const handleAddInstructions = (e) => {
		e.preventDefault();
		const value = inputRef.current.value.trim();
		if (value !== '') {
			setInstructions([...instructions, value]);
			inputRef.current.value = '';
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
			<label htmlFor="instructions">Instructions: </label>
			<div className={styles.orderedList}>
				<ol>
					{instructions.map((instruction, index) => (
						<div key={index} className={styles.deleteDiv}>
							<li>
								<input
									className={styles.previewInput}
									type="text"
									value={instruction}
									name="instruction"
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
				</ol>
			</div>
			<div className={styles.inputContainer}>
				<div>
					<input
						type="text"
						className={styles.input}
						name="instructions"
						id="instructions"
						ref={inputRef}
						placeholder="Enter Instructions - Press + button to add"
					/>
					<button
						className={styles.addBtn}
						onClick={(e) => handleAddInstructions(e)}>
						<Image src={'/addIcon.png'} alt="add" width={20} height={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddInstructions;
