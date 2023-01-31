/* eslint-disable */

import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";
import axios, { AxiosError } from "axios";

Quill.register("modules/imageResize", ImageResize);

interface QuillEditorProps {
  htmlContent: string;
  setHtmlContent: (htmlContent: string) => void;
}

const MatEditor = ({ htmlContent, setHtmlContent }: QuillEditorProps) => {
  const QuillRef = useRef<ReactQuill>();

  /**
   *  이미지 핸들러(modules 설정보다 위에 있어야 정상 적용)
   */
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpg,impge/png,image/jpeg");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;

      if (file) {
        formData.append("file", file[0]);
      }

      try {
        // file 데이터 담아서 서버에 전달하여 이미지 업로드
        const res = await axios.post("https://matp.p-e.kr/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // 이미지 url
        url = res.data.data.path;

        if (QuillRef.current) {
          // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 url을 이용하여 이미지 태그 추가
          const index = QuillRef.current?.getEditor().getSelection()?.index;

          if (index !== null && index !== undefined) {
            const quill = QuillRef.current?.getEditor();

            quill?.setSelection(index, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              index,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
            );
          }
        }
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    };
  };

  /**
   * quill에서 사용할 모듈을 설정하는 코드
   * useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀림
   */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        modules: ["Resize"],
      },
    }),
    []
  );

  return (
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          QuillRef.current = element;
        }
      }}
      value={htmlContent}
      onChange={setHtmlContent}
      modules={modules}
      theme="snow"
      placeholder="이미지를 한 개 이상 첨부하여 작성해주세요"
      style={{ width: "60vw", height: "45vh" }}
    />
  );
};

export default MatEditor;
