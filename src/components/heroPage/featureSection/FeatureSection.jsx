import Image from 'next/image';
import styles from './featureSection.module.css';

const FeatureSection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.iconContainer}>
					<Image
						className={styles.icon}
						src={'/book.png'}
						alt="Share recipies icon"
						width={40}
						height={40}
					/>
				</div>
				<h2 className={styles.cardTitle}>Share Your Favorite Recipes</h2>
				<p className={styles.cardDesc}>
					Easily share your culinary creations with our vibrant community.
					Upload your recipes, add ingredients, and share your cooking tips to
					inspire others
				</p>
			</div>
			<div className={styles.card}>
				<div className={styles.iconContainer}>
					<Image
						className={styles.icon}
						src={'/heropage/share-recipe.png'}
						alt="Discover dishes icon"
						width={40}
						height={40}
					/>
				</div>
				<h2 className={styles.cardTitle}> Discover New Dishes</h2>
				<p className={styles.cardDesc}>
					Explore a diverse collection of recipes from around the world. Whether
					you’re looking for quick meals or gourmet dishes, find new favorites
					to try in your kitchen.
				</p>
			</div>
			<div className={styles.card}>
				<div className={styles.iconContainer}>
					<Image
						className={styles.icon}
						src={'/heropage/smartphone.png'}
						alt="Share recipies icon"
						width={40}
						height={40}
					/>
				</div>
				<h2 className={styles.cardTitle}>User-Friendly Interface</h2>
				<p className={styles.cardDesc}>
					Enjoy a seamless and intuitive experience on both desktop and mobile
					devices. Our clean, responsive design ensures that you can share and
					explore recipes effortlessly.
				</p>
			</div>
			<div className={styles.card}>
				<div className={styles.iconContainer}>
					<Image
						className={styles.icon}
						src={'/heropage/heart.png'}
						alt="Share recipies icon"
						width={40}
						height={40}
					/>
				</div>
				<h2 className={styles.cardTitle}>Create Favorites Collection</h2>
				<p className={styles.cardDesc}>
					Organize your favorite recipes with ease. Save recipes, create
					favorites collections, and access your recipe library anytime,
					anywhere.
				</p>
			</div>
		</div>
	);
};

export default FeatureSection;
