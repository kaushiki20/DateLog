import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
const DataModal = ({ open, handleClose, data, name, active }) => {
  const classes = useStyles();

  const [state, setState] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [activityData, setActivityData] = useState([]);
  const [log, setLog] = useState(false);

  // sets the user value coming from main component
  useEffect(() => {
    setState(data);
    setLog(false);
    setDate(moment().format("YYYY-MM-DD"));
  }, [data]);
  //manages the date change and data representation according to the data
  const handleChange = e => {
    const currentDate = e.target.value;
    setDate(currentDate);
    let logJudge = false;
    state.forEach((r, i) => {
      if (currentDate === r.start_date) {
        const start = r.start_time;
        const end = r.end_time;
        const obj = [{ s: start, e: end }];
        setActivityData(obj);
        logJudge = true;
      }
    });

    setLog(logJudge);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Divider light />
            <div className={classes.container} noValidate>
              <TextField
                id="date"
                label="Activity-Day"
                type="date"
                value={date}
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {log ? (
                <div className={classes.timelog}>
                  {activityData.map((r, i) => (
                    <div className={classes.activity} key={i + "ka"}>
                      <Typography variant="body1" gutterBottom>
                        Start_Time :{r.s}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        End_Time :{r.e}
                      </Typography>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classes.activity}>
                  <Typography variant="body1" gutterBottom>
                    OOPS.... no work
                  </Typography>
                  {active.map((a, i) => {
                    return (
                      <div key={i + "k1"}>
                        <Typography variant="body1" gutterBottom>
                          Active-Dates:{a.start_date}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DataModal;

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(1, 3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "4px",
    justifyContent: "space-between",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    margin: "5px",
  },
  timelog: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  activity: {
    marginLeft: "35px",
    width: 200,
    margin: "5px",
  },
}));
