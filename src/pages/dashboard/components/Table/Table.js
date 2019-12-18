import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  console.log(keys)
  keys = ["FOOD", "CAR", "FAT", "PRO", "KCAL", "TIME"]
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id,food,car,fat,pro,kcal,time}) => (
          <TableRow key={id}>
            <TableCell>{food}</TableCell>
            <TableCell>{car}</TableCell>
            <TableCell>{fat}</TableCell>
            <TableCell>{pro}</TableCell>
            <TableCell>{kcal}</TableCell>
            <TableCell>{time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
