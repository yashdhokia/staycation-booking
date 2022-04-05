import { Modal } from "antd";
import { currencyFormatter } from "../../actions/hotel";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="Booking Payment info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>Payment intent: {session.payment_intent}</p>
      <p>Payment status: {session.payment_status}</p>
      <p>
        Amount total: {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </p>
      <p>Stripe Customer ID: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
