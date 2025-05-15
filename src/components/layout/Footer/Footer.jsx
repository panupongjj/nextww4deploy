import styles from './Footer.module.scss'

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.footerbottom}>
      <div className="container">
        <p className="text-right pr-5">
          &copy; {getCurrentYear()} codefeed
        </p>
      </div>
    </div>
  );
}

export default Footer;