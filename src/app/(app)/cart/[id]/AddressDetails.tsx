import { useEffect, useState } from "react";
import Sale from "~/models/sale";

interface AddressDetailsProps {
  cart: Sale;
  onEditAddress: (address: string, phone: string) => void;
  address: string;
  phone: string;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({
  cart,
  onEditAddress,
  address,
  phone,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState(phone);

  useEffect(() => {
    setNewAddress(address);
    setNewPhone(phone);
  }, [address, phone]);

  const handleEdit = () => {
    onEditAddress(newAddress, newPhone);
    setShowModal(false);
  };

  return (
    <div>
      {/* <div className="mb-2 flex items-center">
        <img src="/icons/Home.png" alt="Home" className="mr-2 h-5 w-5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Delivery At :</span>
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-500"
            >
              &rarr;
            </button>
          </div>
          <span className="text-gray-700">{newAddress}</span>
        </div>
      </div> */}

      {/* <div className="my-2 border-t border-gray-200"></div> */}

      {/* <div className="mb-2 flex items-center">
        <img src="/icons/phone.png" alt="Phone" className="mr-2 h-5 w-5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">+91 {phone}</span>
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-500"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div> */}

      {/* <div className="my-2 border-t border-gray-200"></div> */}

      <div className="mb-2 flex items-center">
        <img src="/icons/bill.png" alt="Bill" className="mr-2 h-5 w-5" />
        <div className="flex-1">
          <div className="flex items-center justify-between space-x-3">
            <div>
              <span className="mr-3 text-gray-500">Total Bill</span>
              <span className="text-gray-700">₹{cart.total_amount}</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-500"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit Address</h2>
            <div className="mb-4">
              <label className="block text-gray-700">
                Recipient's Phone Number
              </label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleEdit} className="btn-primary text-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressDetails;
