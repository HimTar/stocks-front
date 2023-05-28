import { memo, useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";

import { BuySellAction, PurchaseHistory } from "../../interface";

type AddPurchaseHistoryProps = {
  handleSubmit: (data: PurchaseHistory) => void;
};

function AddPurchaseHistoryComponent({
  handleSubmit,
}: AddPurchaseHistoryProps) {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<BuySellAction>("BUY");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());

  const reset = () => {
    setAction("BUY");
    setQuantity(0);
    setPrice(0);
    setDate(new Date());
  };

  const hide = () => {
    setVisible(false);
  };

  const handleSubmitEvent = () => {
    if (!(action && quantity && price && date)) {
      alert("All fields are required");
      return;
    }

    if (quantity <= 0 || price <= 0) {
      alert("Quantity and price should be greater than zero");
      return;
    }

    handleSubmit({
      action,
      quantity,
      price,
      date,
    });

    reset();
    setVisible(false);
  };

  return (
    <>
      <CButton
        color="primary text-white"
        type="button"
        onClick={() => setVisible(!visible)}
      >
        Add Purchase History
      </CButton>
      <CModal visible={visible} onClose={hide} backdrop={"static"}>
        <CModalHeader>
          <CModalTitle>Add Purchase History</CModalTitle>
        </CModalHeader>

        <div>
          <CModalBody>
            <div className="flex flex-col">
              <label>Action</label>
              <select
                value={action}
                className="border-2 rounded-md border-sky-500 p-2"
                onChange={({ target }) =>
                  setAction(target.value as BuySellAction)
                }
              >
                <option value={"BUY"}>BUY</option>
                <option value={"SELL"}>SELL</option>
              </select>
            </div>

            <div className="flex flex-col my-4">
              <label>Price</label>
              <input
                type="number"
                className="border-2 rounded-md border-sky-500 p-2"
                value={price}
                step="0.01"
                max="100000"
                min="0"
                onChange={({ target }) => setPrice(parseFloat(target.value))}
                required
              />
            </div>

            <div className="flex flex-col my-4">
              <label>Quantity</label>
              <input
                type="number"
                className="border-2 rounded-md border-sky-500 p-2"
                value={quantity}
                max="100000"
                min="0"
                onChange={({ target }) => setQuantity(parseInt(target.value))}
                required
              />
            </div>

            <div className="flex flex-col my-4">
              <label>Date</label>
              <input
                type="date"
                className="border-2 rounded-md border-sky-500 p-2"
                onChange={({ target }) => setDate(new Date(target.value))}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary text-white" onClick={hide}>
              Close
            </CButton>
            <CButton
              color="primary text-white"
              type="button"
              onClick={handleSubmitEvent}
            >
              Create
            </CButton>
          </CModalFooter>
        </div>
      </CModal>
    </>
  );
}

export const AddPurchaseHistory = memo(AddPurchaseHistoryComponent);
