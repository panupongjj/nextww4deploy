import styles from './Card.module.scss';

function Card(props) {
  return (
    <div className={ props.size === "single" 
      ? styles.singleCard 
      : styles.gridCard 
    }>
      {props.children}
    </div>
  );
}

export default Card;