import styled from "styled-components";
import MatComment from "./MatComment";
import useAxios from "../../utils/useAxios";
import { getComments } from "../../utils/axiosAPI/comments/commentsAxios";
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

const MatCommentList = () => {
  const { axiosData, responseData } = useAxios(getComments, [], false);

  const getAllComment = () => {
    axiosData();
  };

  return (
    <StyledCommentContainer>
      <MatCommentAdd getAllComment={getAllComment} />
      <StyledCommentList>
        {responseData &&
          responseData
            .slice(0)
            .reverse()
            .map((comment) => (
              <MatComment
                key={comment.id}
                singleComment={comment}
                getAllComment={getAllComment}
              />
            ))}
      </StyledCommentList>
    </StyledCommentContainer>
  );
};

export default MatCommentList;
