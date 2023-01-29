// 데이터 가져와서 props로 주면 동작하게 만들기
// 사용처: 도메인 페이지(오늘의 맛포스트 목록), 맛플레이스 상세 페이지(관련 맛포스트 목록),
// 검색페이지(제목 및 내용 검색 결과), 맛피플(마이) 페이지 포스트 목록
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useCallback } from "react";
import { MatPostRead, ModalPortal } from ".";
import { IPosts, getPlacesPost } from "../api/axiosAPI/posts/PostsAxios";
import useAxios from "../hooks/useAxios";

const ImgWrapper = styled.div`
  width: 130px;
  height: 130px;
  position: relative;

  .likes_on {
    position: absolute;
    top: 45%;
    left: 25%;
    z-index: 1;
    font-size: 15px;
    width: 60px;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
    display: none;
    user-select: none;
  }

  &:hover .likes_on {
    display: block;
  }

  &:hover .post_thumbnail {
    filter: brightness(0.5);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }

  .post_thumbnail {
    width: 100%;
    height: 100%;
  }

  .heartIcon {
    width: 16px;
    height: 12px;
  }
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const PostRead = ({
  post,
  getAllPostsReload,
}: {
  post: IPosts;
  getAllPostsReload?: () => void;
}) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleClick = () => {
    onClickToggleModal();
  };

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onClickToggleModal_BD = useCallback(() => {
    getAllPostsReload();
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <ImgWrapper onClick={handleClick}>
        <p className="likes_on">
          <FavoriteIcon className="heartIcon" />
          {post.likes}
        </p>
        <div className="post_thumbnail">
          <img src={post.thumbnailUrl} alt="thumbnail" />
        </div>
      </ImgWrapper>
      {isOpenModal === true ? (
        <ModalPortal>
          <MatPostRead onClickToggleModal={onClickToggleModal} id={post.id} />
          <ModalBackdrop onClick={onClickToggleModal_BD} />
        </ModalPortal>
      ) : null}
    </>
  );
};

export default PostRead;
