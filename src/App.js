import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { fade, makeStyles } from "@material-ui/core/styles";
import DataModal from "./DataModal";
import axios from "axios";
import moment from "moment";

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [interval, setInterval] = useState([]);
  const [name, setName] = useState("");
  const classes = useStyles();
  useEffect(() => {
    var config = {
      method: "get",
      url: "https://20fbaad1-1df2-4700-9c31-17213065cea7.mock.pstmn.io/api",
    };

    axios(config)
      .then(function (response) {
        const currentData = response.data;
        console.log(currentData.members);
        setData(currentData.members);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleOpen = index => {
    setOpen(true);
    console.log(index);
    const state = [];
    for (let i = 0; i < data[index].activity_periods.length; i++) {
      const start_date = moment(
        data[index].activity_periods[i].start_time.slice(0, 11)
      ).format("YYYY-MM-DD");
      const start_Time = data[index].activity_periods[i].start_time.slice(
        11,
        data[index].activity_periods[i].start_time.length
      );

      const end_date = moment(
        data[index].activity_periods[i].end_time.slice(0, 11)
      ).format("YYYY-MM-DD");
      const end_Time = data[index].activity_periods[i].end_time.slice(
        11,
        data[index].activity_periods[i].end_time.length
      );

      const obj = {
        start_date: start_date,
        start_time: start_Time,
        end_date: end_date,
        end_time: end_Time,
      };
      state.push(obj);
    }
    //console.log(state);
    setInterval(state);
    setName(data[index].real_name);
  };

  const handleClose = () => {
    setOpen(false);
    setInterval([]);
    setName();
  };

  return (
    <div className="App">
      <TableContainer className={classes.TableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableContent} align="right">
                Id
              </TableCell>
              <TableCell className={classes.tableContent} align="right">
                Name
              </TableCell>
              <TableCell className={classes.tableContent} align="right">
                Time-Zone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id + index} onClick={() => handleOpen(index)}>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.real_name}</TableCell>
                <TableCell align="right">{row.tz}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DataModal
        open={open}
        handleClose={handleClose}
        data={interval}
        name={name}
      />
    </div>
  );
}

export default App;
const useStyles = makeStyles(theme => ({
  table: {
    width: 800,
    marginTop: "30vh",
  },
  tableContent: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#465362",
  },
  TableContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(9, 9, 7),
  },
}));
