import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable.jsx";

function Bookings() {
  return (
      <>
          <Row type="horizontal">
              <Heading as="h1">All bookings</Heading>
              <p>TEST</p>
          </Row>
          <BookingTable />
      </>
  );
}

export default Bookings;
