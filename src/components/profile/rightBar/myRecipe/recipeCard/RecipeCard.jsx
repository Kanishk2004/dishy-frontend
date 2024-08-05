import Image from 'next/image';
import styles from './recipeCard.module.css';

const RecipeCard = () => {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					src={'/vegetable-illustration.png'}
					alt="recipe"
					width={300}
					height={200}
				/>
			</div>
			<div className={styles.recipeInfo}> 
				<h2>Recipe Title</h2>
				<p>
					Recipe description Lorem ipsum dolor sit amet consectetur, adipisicing
					elit. Beatae, modi.
				</p>
				<div>
					<span>
						<i>Cuisine</i>
					</span>
					<span>
						<i>Category</i>
					</span>
				</div>
                <p>12 aug 2024</p>
			</div>
		</div>
	);
};

export default RecipeCard;
