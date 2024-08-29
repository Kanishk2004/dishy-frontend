import styles from './heroPage.module.css';
import Link from 'next/link';

const HeroPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<h1>
					<span className={styles.pink}>Discover & Share</span> Your Favorite
					Recipes
				</h1>
				<p>
					Join a community of food lovers. Share your culinary creations,
					discover new dishes, and connect with others who share your passion
					for cooking.
				</p>
				<div className={styles.btnContainer}>
					<button>
						<Link href={'/register'}>Join Now</Link>
					</button>
					<button>
						<Link href={'/recipies'}>Explore Recipes</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroPage;
