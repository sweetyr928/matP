import { useParams } from "react-router";

const PostUpdateModal = () => {
  const { id } = useParams();
  console.log(id);

  return <div></div>;
};

export default PostUpdateModal;
