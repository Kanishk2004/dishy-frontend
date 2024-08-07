import Image from 'next/image';
import styles from './recipePage.module.css';
import AuthorCard from './authorCard/AuthorCard';
import { Suspense } from 'react';
import Loading from '../loading/Loading';
import PrepTime from './prepTime/PrepTime';

const RecipePage = ({ recipe, author, rating }) => {
	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.favContainer}>
					<Image
						className={styles.favIcon}
						src={'/white-favorite.png'}
						alt="favorite"
						width={30}
						height={30}
					/>
				</div>
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
						<div className={styles.ratingDetail}>
							<Image src={'/star.png'} alt="star img" width={30} height={30} />
							<div>
								<p>Rating</p>
								<p>
									<b>{rating?.avgRating}</b>
								</p>
							</div>
							<div>
								<p>Reviews</p>
								<p>
									<b>{rating?.ratingCount}</b>
								</p>
							</div>
						</div>
						<AuthorCard
							avatar={author?.avatar}
							fullName={author?.fullName || author?.username}
							createdAt={recipe?.createdAt.slice(0, 10)}
						/>
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
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecipePage;
