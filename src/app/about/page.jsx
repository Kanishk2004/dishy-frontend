import Image from 'next/image';
import styles from './aboutPage.module.css';
import FeatureSection from '@/components/heroPage/featureSection/FeatureSection';
import HowItWorks from '@/components/heroPage/howItWorks/HowItWorks';
import AboutDeveloper from '@/components/aboutDeveloper/AboutDeveloper';
import CallToAction from '@/components/heroPage/callToActionSection/CallToAction';

const page = () => {
	return (
		<div className={styles.container}>
			<div className={styles.innerContainer}>
				<div className={styles.mainSection}>
					<div className={styles.intro}>
						<h1>
							Welcome to <br />
							<span className={styles.brand}>
								<i>dishy - The Flavour Network</i>
							</span>
						</h1>
						<p>
							Dishy is your go-to platform for discovering, sharing, and
							celebrating the joy of food. Whether you&apos;re an experienced
							chef or a home cook, we connect food lovers from all around the
							world to explore new recipes, share their own culinary creations,
							and inspire others.
						</p>
					</div>
				</div>
			</div>
			<div className={styles.missionSection}>
				<div className={styles.imgContainer}>
					<Image
						src={'/aboutpage/our-mission-illus.png'}
						alt="Our mission illustration"
						width={220}
						height={200}
					/>
				</div>
				<div className={styles.missionContent}>
					<h1>Our Mission</h1>
					<p>
						At Dishy, we believe in the power of food to bring people together.
						Our mission is to create a welcoming space for food enthusiasts of
						all levels, helping you discover new dishes, showcase your
						creations, and connect with like-minded individuals who share your
						passion for cooking.
					</p>
				</div>
			</div>
			<FeatureSection />
			<HowItWorks />
			<AboutDeveloper />
			<CallToAction />
		</div>
	);
};

export default page;
