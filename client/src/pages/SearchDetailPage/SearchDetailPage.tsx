import { useParams } from "react-router-dom";
import SearchDetailPost from "./SearchDetailPost";
import SearchDetailPlace from "./SearchDetailPlace";
import SearchDetailPeople from "./SearchDetailPeople";

const SearchDetailPage: React.FC = () => {
  const { name } = useParams();

  return (
    <>
      {name === "맛포스트" ? <SearchDetailPost /> : null}
      {name === "맛플레이스" ? <SearchDetailPlace /> : null}
      {name === "맛피플" ? <SearchDetailPeople /> : null}
    </>
  );
};
export default SearchDetailPage;
