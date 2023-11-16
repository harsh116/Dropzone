import "./Article.scss";

const Article = (props) => {
  return (
    <div className="Article">
      <div className="ArticleNav">
        <button className="active">All</button>
        <button>Images</button>
        <button>Videos</button>
      </div>
    </div>
  );
};

export default Article;
