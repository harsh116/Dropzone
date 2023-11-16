import "./Article.scss";
import DropFileInput from "./drop-file-input/DropFileInput";

const Article = (props) => {
  return (
    <div className="Article">
      <div className="ArticleNav">
        <button className="active">All</button>
        <button>Images</button>
        <button>Videos</button>
      </div>
      <div className="dropFileInputContainer">
        <DropFileInput />
      </div>
    </div>
  );
};

export default Article;
