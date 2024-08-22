// import React, { useEffect, useState } from "react";
// import {
//   Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
// } from "@nextui-org/table";
// import { chip } from "@nextui-org/theme";

// const statusColorMap = {
//   1: "success", // active
//   0: "danger",  // inactive
// };

// export default function App() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/read"); // Assuming your API route is `/api/cards`
//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error("Error fetching cards:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   const renderCell = React.useCallback((card: { [x: string]: any; }, columnKey: string | number) => {
//     const cellValue = card[columnKey];

//     switch (columnKey) {
//       case "bankName":
//         return <p className="text-bold text-sm capitalize">{cellValue}</p>;
//       case "creditCardName":
//         return <p className="text-bold text-sm capitalize">{cellValue}</p>;
//       case "isActive":
//         return (
//           <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
//             {cellValue === 1 ? "Active" : "Inactive"}
//           </Chip>
//         );
//       case "createdOn":
//         return new Date(cellValue).toLocaleDateString();
//       default:
//         return cellValue;
//     }
//   }, []);

//   return (
//     <Table aria-label="Credit Cards Table">
//       <TableHeader>
//         <TableColumn>Bank Name</TableColumn>
//         <TableColumn>Credit Card Name</TableColumn>
//         <TableColumn>Status</TableColumn>
//         <TableColumn>Created On</TableColumn>
//       </TableHeader>
//       <TableBody items={cards}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
