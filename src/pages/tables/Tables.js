import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import Button from "@material-ui/core/Button";
import *as boardActions  from "../../actions/board";
import { date_read } from "../../reducers/date";


const dummy = [
  {
    id: 0,
    name: "Mark Otto",
    email: "ottoto@wxample.com",
    product: "ON the Road",
    price: "$25 224.2",
    date: "11 May 2017",
    city: "Otsego",
    status: "Sent"
  },
  {
    id: 1,
    name: "Jacob Thornton",
    email: "thornton@wxample.com",
    product: "HP Core i7",
    price: "$1 254.2",
    date: "4 Jun 2017",
    city: "Fivepointville",
    status: "Sent"
  },
  {
    id: 2,
    name: "Larry the Bird",
    email: "bird@wxample.com",
    product: "Air Pro",
    price: "$1 570.0",
    date: "27 Aug 2017",
    city: "Leadville North",
    status: "Pending"
  },
  {
    id: 3,
    name: "Joseph May",
    email: "josephmay@wxample.com",
    product: "Version Control",
    price: "$5 224.5",
    date: "19 Feb 2018",
    city: "Seaforth",
    status: "Declined"
  },
]

export default function Tables() {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  console.log('james', board)
  return (
    <>
      <Button onClick ={()=>dispatch(boardActions.getList())}>
        test
      </Button>
      <PageTitle title="자유 게시판" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={dummy} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
