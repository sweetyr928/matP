import styled from "styled-components";
import MatComment from "./MatComment";
import { IComments } from "../../api/axiosAPI/comments/commentsAxios";
import MatCommentAdd from "./MatCommentAdd";

const StyledCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 260px;
`;

const StyledCommentList = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MatCommentList = ({
  comments,
  placeId,
  postId,
  getAllComments,
}: {
  comments: IComments[];
  placeId: number;
  postId: number;
  getAllComments: () => void;
}) => {
  return (
    <StyledCommentContainer>
      <MatCommentAdd
        placeId={placeId}
        postId={postId}
        getAllComments={getAllComments}
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
                getAllComments={getAllComments}
              />
            ))}
      </StyledCommentList>
    </StyledCommentContainer>
  );
};

export default MatCommentList;
