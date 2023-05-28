import { memo, useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
import { PortfolioApis } from "../../api";

type AddPortfolioProps = {
  refresh: () => void;
};

const AddPortfolioComponent = ({ refresh }: AddPortfolioProps) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
  };

  const hide = () => {
    setVisible(false);
  };

  useEffect(reset, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiResponse = await PortfolioApis.add({
      title,
      description,
    });

    if (apiResponse.isError) {
      console.log(apiResponse.error);
      alert(
        "We are facing some issues while creating portfolio. Please try again"
      );
      return;
    }

    reset();
    hide();
    refresh();
  };

  return (
    <>
      <CButton color="success text-white" onClick={() => setVisible(!visible)}>
        Create New Portfolio
      </CButton>
      <CModal visible={visible} onClose={hide}>
        <CModalHeader>
          <CModalTitle>Create New Portfolio</CModalTitle>
        </CModalHeader>

        <form onSubmit={handleSubmit}>
          <CModalBody>
            <div className="flex flex-col">
              <label>Title</label>
              <input
                type="text"
                className="border-2 rounded-md border-sky-500 p-2"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                required
              />
            </div>

            <div className="flex flex-col my-4">
              <label>Description</label>
              <input
                type="text"
                className="border-2 rounded-md border-sky-500 p-2"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary text-white" onClick={hide}>
              Close
            </CButton>
            <CButton color="primary text-white" type="submit">
              Create
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export const AddPortfolio = memo(AddPortfolioComponent);
