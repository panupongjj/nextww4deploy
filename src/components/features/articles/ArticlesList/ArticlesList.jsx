import ArticleItem from '../ArticleItem/ArticleItem'
import Container from '@/components/common/Container/Container';

function ArticlesList(props) {
  const { articles } = props;

  return (
    <Container>
      {articles.map((article) => (
        <ArticleItem
          key={article.title}
          id={article.title}
          urlToImage={article.urlToImage}
          url={article.url}
          title={article.title}
          description={article.description}
        />
      ))}
    </Container>
  );
}

export default ArticlesList;