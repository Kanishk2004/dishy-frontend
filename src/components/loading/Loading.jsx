import Image from 'next/image';
import styles from './loading.module.css';

const Loading = () => {
	return (
		<div className={styles.container}>
			<Image
				src={'/loading.gif'}
				alt="loading"
				width={50}
				height={50}
				unoptimized
			/>
		</div>
	);
};

export default Loading;
