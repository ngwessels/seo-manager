/* eslint-disable eol-last */
import React from "react";

import "../styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

//Firebase
import { firebase } from "../../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
// import { DateTimePicker, LocalizationProvider } from "@mui/lab";
const storage = getStorage(firebase);

//Components
import Files from "./Files";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& .MuiPaper-root": {
    margin: "0px",
    width: "90vw",
    maxWidth: "900px"
  }
}));

type FormObject = {
  onClose: any;
  open: boolean;
  onDelete: any;
  onChangeComplete: any;
  model: any;
  data?: any;
  idx: any;
  title: string;
};

class Form extends React.Component<{
  onClose: any;
  open: boolean;
  onDelete: any;
  onChangeComplete: any;
  model: any;
  data?: any;
  idx: any;
  title: string;
}> {
  state: {
    data: any;
  };
  constructor(object: FormObject) {
    super(object);
    this.state = {
      data: object.data
    };
  }

  componentDidMount = () => {};

  componentDidUpdate = (prevProps: FormObject) => {};

  render() {
    return (
      <React.Fragment>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth={false}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {this.props.title}
            <IconButton
              aria-label="close"
              onClick={this.props.onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {Object.keys(this.props?.model?.structure).map((idx) => {
              const index = this.props?.model?.structure[idx];
              const modelItem = this.props.model[index];

              const dataItem = this.state.data[modelItem.index];
              if (modelItem?.value || modelItem?.hidden === true) {
                return null;
              }
              if (modelItem.type === "select") {
                return (
                  <Grid item mb={2}>
                    <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                      <InputLabel id={`Label-${idx}`}>
                        {modelItem.label}
                      </InputLabel>
                      <Select
                        labelId={`Label-${idx}`}
                        id={`Field-${idx}`}
                        value={dataItem}
                        onChange={(e) => {
                          let data = this.state.data;
                          data[modelItem.index] = e.target.value;
                          this.setState({ data });
                        }}
                        label={modelItem.label}
                        required={modelItem?.required || false}
                      >
                        <MenuItem>Select Option ...</MenuItem>
                        {Object.keys(modelItem.selection).map((idx) => {
                          const { title, data } = modelItem.selection[idx];
                          return (
                            <MenuItem
                              value={data}
                              key={`${modelItem.index}-${idx}`}
                            >
                              {title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                );
              } else if (modelItem.type === "input") {
                return (
                  <Grid item mb={2}>
                    <TextField
                      id={`Field-${idx}`}
                      label={modelItem.label}
                      variant="standard"
                      placeholder=""
                      onChange={(e) => {
                        let data = this.state.data;
                        data[modelItem.index] = e.target.value;
                        this.setState({ data });
                      }}
                      value={dataItem}
                      style={{ width: "100%" }}
                      required={modelItem?.required || false}
                    />
                  </Grid>
                );
              } else if (modelItem.type === "date-time") {
                return (
                  <Grid item mb={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} style={{ width: "100%" }} />
                        )}
                        label={modelItem?.label}
                        value={dataItem}
                        // required={modelItem?.required || false}
                        onChange={(e) => {
                          let data = this.state.data;
                          data[modelItem.index] = e;
                          this.setState({ data });
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                );
              } else if (modelItem.type === "textfield") {
                return (
                  <Grid item mb={2}>
                    <TextField
                      id={`Field-${idx}`}
                      label={modelItem.label}
                      variant="standard"
                      placeholder=""
                      onChange={(e) => {
                        let data = this.state.data;
                        data[modelItem.index] = e.target.value;
                        this.setState({ data });
                      }}
                      value={dataItem}
                      style={{ width: "100%" }}
                      multiline
                      required={modelItem?.required || false}
                      helperText={
                        modelItem?.maxChar
                          ? `${dataItem?.length} of ${modelItem.maxChar}`
                          : ""
                      }
                    />
                  </Grid>
                );
              } else if (modelItem.type === "location") {
                return (
                  <Grid item mb={2}>
                    <TextField
                      id={`Field-${idx}-location-name`}
                      label={"Location Name"}
                      variant="standard"
                      placeholder=""
                      onChange={(e) => {
                        let data = this.state.data;
                        if (!data[modelItem.index]?.name) {
                          data[modelItem.index] = modelItem.template;
                        }
                        data[modelItem.index].name = e.target.value;
                        this.setState({ data });
                      }}
                      value={dataItem?.name || ""}
                      style={{ width: "100%" }}
                      required={modelItem?.required || false}
                    />
                    <TextField
                      id={`Field-${idx}-location-address`}
                      label={"Street Address"}
                      variant="standard"
                      placeholder=""
                      onChange={(e) => {
                        let data = this.state.data;
                        if (!data[modelItem.index]?.address?.streetAddress) {
                          data[modelItem.index] = modelItem.template;
                        }
                        data[modelItem.index].address.streetAddress =
                          e.target.value;
                        this.setState({ data });
                      }}
                      value={dataItem?.address?.streetAddress || ""}
                      style={{ width: "100%" }}
                      required={modelItem?.required || false}
                    />
                    <Grid
                      item
                      display={"flex"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      <TextField
                        id={`Field-${idx}-location-city`}
                        label={"City"}
                        variant="standard"
                        placeholder=""
                        onChange={(e) => {
                          let data = this.state.data;
                          if (
                            !data[modelItem.index]?.address?.addressLocality
                          ) {
                            data[modelItem.index] = modelItem.template;
                          }
                          data[modelItem.index].address.addressLocality =
                            e.target.value;
                          this.setState({ data });
                        }}
                        value={dataItem?.address?.addressLocality || ""}
                        required={modelItem?.required || false}
                        style={{ width: "45%" }}
                      />
                      <TextField
                        id={`Field-${idx}-location-state`}
                        label={"State"}
                        variant="standard"
                        placeholder=""
                        onChange={(e) => {
                          let data = this.state.data;
                          if (!data[modelItem.index]?.address?.addressRegion) {
                            data[modelItem.index] = modelItem.template;
                          }
                          data[modelItem.index].address.addressRegion =
                            e.target.value;
                          this.setState({ data });
                        }}
                        value={dataItem?.address?.addressRegion || ""}
                        required={modelItem?.required || false}
                        style={{ width: "45%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      display={"flex"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      <TextField
                        id={`Field-${idx}-location-postalCode`}
                        label={"Zip code"}
                        variant="standard"
                        placeholder=""
                        onChange={(e) => {
                          let data = this.state.data;
                          if (!data[modelItem.index]?.address?.postalCode) {
                            data[modelItem.index] = modelItem.template;
                          }
                          data[modelItem.index].address.postalCode =
                            e.target.value;
                          this.setState({ data });
                        }}
                        value={dataItem?.address?.postalCode || ""}
                        required={modelItem?.required || false}
                        style={{ width: "45%" }}
                      />
                      <TextField
                        id={`Field-${idx}-location-addressCountry`}
                        label={"Country"}
                        variant="standard"
                        placeholder=""
                        onChange={(e) => {
                          let data = this.state.data;
                          if (!data[modelItem.index]?.address?.addressCountry) {
                            data[modelItem.index] = modelItem.template;
                          }
                          data[modelItem.index].address.addressCountry =
                            e.target.value;
                          this.setState({ data });
                        }}
                        value={"US"}
                        required={modelItem?.required || false}
                        style={{ width: "45%" }}
                      />
                    </Grid>
                  </Grid>
                );
              }
              return null;
              //   else if(modelItem.type === "image") {
              //       return (
              //         <Files
              //         open={this.state.photoManager}
              //         onChangeComplete={(e) => {
              //           this.props.onChange(e, "image");
              //         }}
              //         onClose={() => {
              //           this.setState({ photoManager: false });
              //         }}
              //         multiple={false}
              //         selected={this.props.image}
              //         data={this.props.data}
              //         accept={"image/png, image/jpeg, image/jpg"}
              //       />
              //       )
              //   }
            })}
          </DialogContent>
          <DialogActions>
            <div
              className="modal-footer"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Button
                  variant="text"
                  id={"close-seo-manager"}
                  onClick={this.props.onClose}
                  type="button"
                >
                  Close
                </Button>

                <LoadingButton
                  variant="text"
                  onClick={() => {}}
                  type="button"
                  loading={false}
                >
                  Delete
                </LoadingButton>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default Form;
