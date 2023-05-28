import { memo, useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
import { StockApis } from "../../api";
import { PurchaseHistory, Stock } from "../../interface";
import { formatNumber } from "../../helper";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { AddPurchaseHistory } from "../purchaseHistory/AddPurchaseHistory";

type AddUpdateStockProps = {
  refresh: () => void;
  portfolioId: string;
  data?: Stock;
  variant: "ADD" | "UPDATE";
};

function AddUpdateStockComponent({
  refresh,
  portfolioId,
  data,
  variant,
}: AddUpdateStockProps) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);

  const reset = () => {
    setTitle("");
    setCode("");
    setCurrentPrice(0);
    setPurchaseHistory([]);
  };

  const hide = () => {
    setVisible(false);
  };

  // HTML Generator Functions
  function generatePurchaseHistoryLineItem(
    history: PurchaseHistory,
    ind: number
  ) {
    return (
      <p
        key={`purchase-history-list-item-${ind}`}
        className="flex wrap gap-x-2 text-center m-0"
      >
        {ind + 1}. [{history.action}]&nbsp; Date:{" "}
        {history.date.toLocaleDateString()},&nbsp;Quantity:{" "}
        {formatNumber(history.quantity)}, Price: INR{" "}
        {formatNumber(history.price)}{" "}
        <RiDeleteBin5Line
          color="red"
          cursor="pointer"
          onClick={() => handleHistoryDelete(ind)}
        />
      </p>
    );
  }

  // Use Effects
  useEffect(() => {
    if (variant === "UPDATE" && data) {
      setTitle(data.title);
      setCode(data?.code || "");
      setCurrentPrice(data.currentPrice);
      setPurchaseHistory(
        data.history.map((purchaseHistory) => ({
          ...purchaseHistory,
          date: new Date(purchaseHistory.date),
        }))
      );
    } else reset();
  }, [variant, data, portfolioId]);

  // Handler Functions
  const handleHistoryDelete = (index: number) => {
    const newHistory = purchaseHistory.filter((val, ind) => ind !== index);

    setPurchaseHistory(newHistory);
  };

  const handleHistoryAdd = (history: PurchaseHistory) => {
    const newHistory = [...purchaseHistory, history];

    setPurchaseHistory(newHistory);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      code,
      portfolioId,
      currentPrice,
      history: purchaseHistory,
    };

    const apiResponse =
      variant === "ADD"
        ? await StockApis.add(payload)
        : await StockApis.update({ ...payload, _id: data!._id });

    if (apiResponse.isError) {
      console.log(apiResponse.error);
      alert("We are facing some issues while adding stock. Please try again");
      return;
    }

    reset();
    hide();
    refresh();
  };

  return (
    <>
      {variant === "ADD" ? (
        <CButton
          color="success text-white"
          onClick={() => setVisible(!visible)}
        >
          Add New Stock
        </CButton>
      ) : (
        <button
          className="rounded-full p-2 bg-blue-500"
          onClick={() => setVisible(!visible)}
        >
          <RiEditLine color="white" />
        </button>
      )}

      <CModal visible={visible} onClose={hide} backdrop={"static"}>
        <CModalHeader>
          <CModalTitle>
            {" "}
            {variant === "ADD" ? "Add New Stock" : "Update Stock"}
          </CModalTitle>
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
              <label>Code</label>
              <input
                type="text"
                className="border-2 rounded-md border-sky-500 p-2"
                value={code}
                onChange={({ target }) => setCode(target.value)}
              />
            </div>

            <div className="flex flex-col my-4">
              <label>Current Price</label>
              <input
                type="number"
                className="border-2 rounded-md border-sky-500 p-2"
                value={currentPrice}
                step="0.01"
                max="100000"
                min="0"
                onChange={({ target }) =>
                  setCurrentPrice(parseFloat(target.value))
                }
                required
              />
            </div>

            <div className="flex flex-col my-4 justify-flex-start">
              <label>Purchase History</label>
              <div className="my-2">
                {purchaseHistory.map((history, ind) =>
                  generatePurchaseHistoryLineItem(history, ind)
                )}
              </div>

              <AddPurchaseHistory handleSubmit={handleHistoryAdd} />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary text-white" onClick={hide}>
              Close
            </CButton>
            <CButton color="primary text-white" type="submit">
              Submit
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export const AddUpdateStock = memo(AddUpdateStockComponent);
