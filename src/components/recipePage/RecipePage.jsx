import Image from 'next/image';
import styles from './recipePage.module.css';
import AuthorCard from './authorCard/AuthorCard';
import PrepTime from './prepTime/PrepTime';
import FavIcon from './favoriteIcon/FavIcon';
import AddRating from './addRating/AddRating';
import RatingCard from './ratingCard/RatingCard';
import { Suspense } from 'react';
import Loading from '../loading/Loading';
import CuisineCard from './cuisineCard/CuisineCard';

const RecipePage = ({ recipe }) => {
	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<FavIcon recipeId={recipe?._id} />
				<div className={styles.imgContainer}>
					<Image
						className={styles.img}
						src={recipe?.imageUrl[0]}
						alt="recipe img"
						width={600}
						height={350}
					/>
				</div>
				<div className={styles.recipeInfo}>
					<div className={styles.textContainer}>
						<h1>{recipe?.title}</h1>
						<p>{recipe?.description}</p>
					</div>
					<div className={styles.authorAndRatingContainer}>
						<Suspense fallback={<Loading />}>
							<CuisineCard
								cuisine={recipe?.cuisine}
								category={recipe?.category}
							/>
							<RatingCard recipeId={recipe?._id} />
							<AuthorCard
								recipeId={recipe?._id}
								createdAt={recipe?.createdAt.slice(0, 10)}
							/>
						</Suspense>
					</div>
				</div>
			</div>
			<div className={styles.bottomContainer}>
				<div className={styles.infoContainer}>
					<PrepTime
						cookTime={recipe?.cookTime}
						prepTime={recipe?.prepTime}
						totalTime={recipe?.totalTime}
					/>
					<div className={styles.ingredients}>
						<h2>Ingredients</h2>
						<ul>
							{recipe?.ingredients.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</div>
					<div className={styles.ingredients}>
						<h2>Instructions</h2>
						<ol>
							{recipe?.instructions.map((instruction, index) => (
								<li key={index}>{instruction}</li>
							))}
						</ol>
					</div>
					<Suspense fallback={<Loading />}>
						<AddRating recipeId={recipe?._id} />
					</Suspense>
				</div>
				<div className={styles.pictureContainer}>
					{recipe?.imageUrl.map((img) => (
						<Image
							key={img}
							className={styles.img}
							src={img}
							alt="picture"
							width={300}
							height={200}
							priority={false}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecipePage;
