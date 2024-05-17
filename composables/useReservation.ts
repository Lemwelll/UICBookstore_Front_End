export default function useReservation() {
  const reservationItems = useState(
    "reservationItems",
    (): TReservationItem[] => [],
  );

  const { items, total } = useCart();

  const reservation = useState("reservation", (): TReservationItem => {
    return {
      id: Date.now(),
      items: items.value,
      total: total.value,
      date: new Date().toLocaleDateString(),
      student: "123123123",
      studentName: "John Doe",
      status: "pending",
    };
  });

  function addReservationItem(item: TReservationItem) {
    const reservation = JSON.parse(JSON.stringify(item)) as TReservationItem;
    reservation.status = "pending";
    reservation.date = new Date().toLocaleDateString();
    reservation.id = Date.now();
    reservationItems.value.push(reservation);
  }

  function removeReservationItem(item: TReservationItem) {
    const index = reservationItems.value.findIndex((i) => i.id === item.id);
    reservationItems.value.splice(index, 1);
  }

  function completeReservation(item: TReservationItem) {
    const index = reservationItems.value.findIndex((i) => i.id === item.id);
    reservationItems.value[index].status = "completed";
  }

  function declineReservation(item: TReservationItem) {
    const index = reservationItems.value.findIndex((i) => i.id === item.id);
    reservationItems.value[index].status = "declined";
  }

  return {
    reservationItems,
    addReservationItem,
    removeReservationItem,
    completeReservation,
    reservation,
    declineReservation,
  };
}
