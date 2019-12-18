import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
// styles
import useStyles from "./styles";
// components
import Table from "../dashboard/components/Table/Table";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { useDispatch, useSelector } from "react-redux";
import * as dateActions from "../../actions/date";

const dummy = [
  {
    id: 0,
    name: "Mark Otto",
    email: "ottoto@wxample.com",
    product: "ON the Road",
    price: "$25 224.2",
    date: "11 May 2017",
    city: "Otsego",
    status: "Sent",
  },
  {
    id: 1,
    name: "Jacob Thornton",
    email: "thornton@wxample.com",
    product: "HP Core i7",
    price: "$1 254.2",
    date: "4 Jun 2017",
    city: "Fivepointville",
    status: "Sent",
  },
];
export default function TypographyPage() {
  var classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dateActions.getList());
  }, []);
  const data = useSelector(state => state.date);
  console.log(data.dates.Items[0].date)
  return (
    <>
      <PageTitle title="History"/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={ data.dates.hasOwnProperty('Items') && data.dates.Items[0].date}/>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
