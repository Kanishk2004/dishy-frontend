import FeatureSection from '@/components/heroPage/featureSection/FeatureSection';
import styles from './page.module.css';
import HeroPage from '@/components/heroPage/HeroPage';

export default function Home() {
	return (
		<div className={styles.container}>
			<HeroPage />
			<FeatureSection />
		</div>
	);
}
