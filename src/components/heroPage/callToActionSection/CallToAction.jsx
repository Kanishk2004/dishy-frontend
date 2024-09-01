import Image from 'next/image';
import styles from './callToAction.module.css';
import Link from 'next/link';

const CallToAction = () => {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.img}
					src={'/heropage/image3.jpg'}
					alt="Call to action image"
					width={500}
					height={200}
				/>
			</div>
			<div className={styles.contentContainer}>
				<div className={styles.content}>
					<h2>Join the Dishy Community Today!</h2>
					<p>
						Discover, share, and connect with food lovers just like you. Whether
						you&apos;re a seasoned chef or a home cook, Dishy has something for
						everyone. Start your culinary journey with us!
					</p>
					<div className={styles.btnContainer}>
						<button>
							<Link href={'/register'}>Get Started</Link>
						</button>
						<button>
							<Link href={'/recipies'}>Explore Recipes</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CallToAction;
