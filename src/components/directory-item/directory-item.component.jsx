import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body" onClick={onNavigateHandler}>
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
