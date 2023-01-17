/* eslint-disable */

import React, { useRef, useState, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

interface QuillEditorProps {
  htmlContent: string;
  setHtmlContent: (htmlContent: string) => void;
}

const MatEditor = ({ htmlContent, setHtmlContent }: QuillEditorProps) => {
  const QuillRef = useRef<ReactQuill>();

  /**
   *  이미지를 업로드 하기 위한 함수
   */
  // const imageHandler = () => {
  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  //   const imageHandler = () => {
  //     // file input 임의 생성
  //     const input = document.createElement('input');
  //     input.setAttribute('type', 'file');
  //     input.click();

  //     input.onchange = async() => {
  //         const file = input.files;
  //         const formData = new FormData();

  //         if(file) {
  //             formData.append("multipartFiles", file[0]);
  //         }

  //         // file 데이터 담아서 서버에 전달하여 이미지 업로드
  //         const res = await axios.post('http://localhost:8080/uploadImage', formData);

  //         if(quillRef.current) {
  //             // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
  //             const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;

  //             const quillEditor = quillRef.current.getEditor();
  //             quillEditor.setSelection(index, 1);

  //             quillEditor.clipboard.dangerouslyPasteHTML(
  //                 index,
  //                 `<img src=${res.data} alt=${'alt text'} />`
  //             );
  //         }
  //     }
  // }

  // const imageHandler = () => {
  // 	// 파일을 업로드 하기 위한 input 태그 생성
  //   const input = document.createElement("input");
  //   const formData = new FormData();
  //   let url = "";

  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  // // 파일이 input 태그에 담기면 실행 될 함수
  //   input.onchange = async () => {
  //     const file = input.files;
  //     if (file !== null) {
  //       formData.append("image", file[0]);

  // // 저의 경우 파일 이미지를 서버에 저장했기 때문에
  //   	// 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
  //       try {
  //         const res = axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.

  // // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
  //         url = res.data.url;

  // // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
  //   	// 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
  //         const range = QuillRef.current?.getEditor().getSelection()?.index;
  //         if (range !== null && range !== undefined) {
  //           let quill = QuillRef.current?.getEditor();

  //           quill?.setSelection(range, 1);

  //           quill?.clipboard.dangerouslyPasteHTML(
  //             range,
  //             `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
  //           );
  //         }

  //         return { ...res, success: true };
  //       } catch (error) {
  //         const err = error as AxiosError;
  //         return { ...err.response, success: false };
  //       }
  //     }
  //   };
  // };

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
          // image: imageHandler,
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
      style={{ width: "1200px", height: "500px" }}
    />
  );
};

export default MatEditor;
