import styles from './ButtonLink.module.scss';
import Link from 'next/link';

function ButtonLink({ path, target, children }) {
  return (
    <Link 
      href={path}
      className={styles.buttonLink}
      target={target ? "_blank" : "_self"}
    >  
      {children}  
    </Link>
  );
}

export default ButtonLink;