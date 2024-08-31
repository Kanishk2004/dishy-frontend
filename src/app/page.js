import FeatureSection from '@/components/heroPage/featureSection/FeatureSection';
import styles from './page.module.css';
import HeroPage from '@/components/heroPage/HeroPage';
import HowItWorks from '@/components/heroPage/howItWorks/HowItWorks';

export default function Home() {
	return (
		<div className={styles.container}>
			<HeroPage />
			<FeatureSection />
			<HowItWorks />
		</div>
	);
}
