import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
// styles
import useStyles from "./styles";
// components
import * as dateActions from "../../actions/date";
import mock from "./mock";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import { useDispatch, useSelector } from "react-redux";


export default function Dashboard(props) {
  let classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dateActions.getList());
  }, []);
  const data = useSelector(state => state.date);
  const dayNutrients = [];
  for (let i = 0; i < 32; i++) {
    dayNutrients[i] = { fat: 0, pro: 0, car: 0 };
  }
  if (data.dates.hasOwnProperty("Items")) {
    console.log(data);
    data.dates.Items[0].date.forEach((value) => {
      const day = value.time.split("/")[2];
      dayNutrients[parseInt(day.split(" ")[0])] =
        { fat: dayNutrients[parseInt(day.split(" ")[0])].fat + parseInt(value.fat),
          car: dayNutrients[parseInt(day.split(" ")[0])].car + parseInt(value.car),
          pro: dayNutrients[parseInt(day.split(" ")[0])].pro + parseInt(value.pro),
        };
    });
  }
  const mainChartData = dayNutrients;
  console.log(mainChartData)
  const [mainChartState, setMainChartState] = useState("monthly");
  return (
    <>
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Nutrients Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning"/>
                    <Typography className={classes.mainChartLegentElement}>
                      탄수화물
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary"/>
                    <Typography className={classes.mainChartLegentElement}>
                      단백질
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary"/>
                    <Typography className={classes.mainChartLegentElement}>
                      지방
                    </Typography>
                  </div>
                </div>

              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 100, 200, 300]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Line
                  type="natural"
                  dataKey="car"
                  fill={theme.palette.background.light}
                  strokeWidth={2}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="pro"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="fat"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}

      </Grid>
    </>
  );
}

