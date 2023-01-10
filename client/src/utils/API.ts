import axios from "axios";

export const questionCreate = async (title, content) => {
  try {
    await axios.post(`${url}/questions`, {
      title: title,
      content: content,
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export const questionUpdate = async (qid, title, content) => {
  try {
    await axios.patch(`${url}/questions/${qid}`, {
      title: title,
      content: content,
    });
    window.location.reload();
  } catch (error) {
    console.error("Error", error);
  }
};

export const questionDelete = async (id) => {
  try {
    await axios.delete(`${url}/questions/${id}`);
    window.location.reload();
  } catch (error) {
    console.error("Error", error);
  }
};
