import Image from 'next/image';
import styles from './page.module.css';

const loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Image src={'/loading.gif'} alt='loading' width={50} height={50} unoptimized/>
    </div>
  )
}

export default loading
