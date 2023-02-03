import styled from "styled-components";
import MatComment from "./MatComment";
import { IComments } from "../../api/axiosAPI/comments/commentsAxios";
import MatCommentAdd from "./MatCommentAdd";

const StyledCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCommentList = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MatCommentList = ({
  comments,
  placeId,
  postId,
  getAllCommentsReload,
}: {
  comments: IComments[];
  placeId: number;
  postId: number;
  getAllCommentsReload: () => void;
}) => {
  return (
    <StyledCommentContainer>
      <MatCommentAdd
        placeId={placeId}
        postId={postId}
        getAllCommentsReload={getAllCommentsReload}
      />
      <StyledCommentList>
        {comments &&
          comments
            .slice(0)
            .reverse()
            .map((comment: IComments) => (
              <MatComment
                key={comment.CommentId}
                singleComment={comment}
                placeId={placeId}
                postId={postId}
                getAllCommentsReload={getAllCommentsReload}
              />
            ))}
      </StyledCommentList>
    </StyledCommentContainer>
  );
};

export default MatCommentList;
