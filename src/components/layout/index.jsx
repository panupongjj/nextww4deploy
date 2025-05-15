import styles from './Layout.module.scss';
import Header from './Header';
import Footer from './Footer';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300','400', '700'],
  style: ['normal', 'italic']
})

function Layout(props) {
  return (
    <div className={`${styles.app} ${lato.className}`}>
      <Header />
      <main className={styles.main}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
