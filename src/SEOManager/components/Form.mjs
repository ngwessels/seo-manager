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
  Select,
  Typography
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { MdClose } from "react-icons/md";

//Components
import PhotosViewer from "./PhotosViewer";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "95vw",
    maxWidth: "900px"
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& .MuiPaper-root": {
    margin: "0px",
    maxWidth: "none !important"
  }
}));

// type FormObject = {
//   onClose: any,
//   open: boolean,
//   onDelete: any,
//   onChangeComplete: any,
//   model: any,
//   data: any,
//   idx: any,
//   title: string,
//   event: any,
//   deleteButton?: boolean
// };

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props?.event
    };
  }

  componentDidMount = () => {};

  delete = () => {
    this.props.onDelete(this.props.idx);
    this.props.onClose();
  };

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
              <MdClose />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <form
              onSubmit={() => {
                this.props.onChangeComplete(this.state.data, this.props.idx);
                this.props.onClose();
              }}
            >
              {Object.keys(this.props?.model?.structure || []).map((idx) => {
                const index = this.props?.model?.structure[idx];
                const modelItem = this.props.model[index];

                const dataItem = this.state.data[modelItem.index];
                if (modelItem?.value || modelItem?.hidden === true) {
                  return null;
                }
                //Visible When
                if (
                  modelItem?.visibleWhen &&
                  this.state.data[modelItem?.visibleWhen?.index] !==
                    modelItem?.visibleWhen?.value
                ) {
                  return null;
                }
                //Hidden When
                if (
                  modelItem?.hiddenWhen &&
                  this.state.data[modelItem?.hiddenWhen?.index] ===
                    modelItem?.hiddenWhen?.value
                ) {
                  return null;
                }
                if (modelItem.type === "select") {
                  return (
                    <Grid item mb={2}>
                      <FormControl
                        variant="standard"
                        sx={{ minWidth: "100%" }}
                        required={modelItem?.required || false}
                      >
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
                          {Object.keys(modelItem?.selection || []).map(
                            (idx) => {
                              const { title, data } = modelItem.selection[idx];
                              return (
                                <MenuItem
                                  value={data}
                                  key={`${modelItem.index}-${idx}`}
                                >
                                  {title}
                                </MenuItem>
                              );
                            }
                          )}
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
                          style={{ width: "48%" }}
                        />
                        <TextField
                          id={`Field-${idx}-location-state`}
                          label={"State"}
                          variant="standard"
                          placeholder=""
                          onChange={(e) => {
                            let data = this.state.data;
                            if (
                              !data[modelItem.index]?.address?.addressRegion
                            ) {
                              data[modelItem.index] = modelItem.template;
                            }
                            data[modelItem.index].address.addressRegion =
                              e.target.value;
                            this.setState({ data });
                          }}
                          value={dataItem?.address?.addressRegion || ""}
                          required={modelItem?.required || false}
                          style={{ width: "48%" }}
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
                          style={{ width: "48%" }}
                        />
                        <TextField
                          id={`Field-${idx}-location-addressCountry`}
                          label={"Country"}
                          variant="standard"
                          placeholder=""
                          onChange={(e) => {
                            let data = this.state.data;
                            if (
                              !data[modelItem.index]?.address?.addressCountry
                            ) {
                              data[modelItem.index] = modelItem.template;
                            }
                            data[modelItem.index].address.addressCountry =
                              e.target.value;
                            this.setState({ data });
                          }}
                          value={"US"}
                          required={modelItem?.required || false}
                          style={{ width: "48%" }}
                        />
                      </Grid>
                    </Grid>
                  );
                } else if (modelItem.type === "images") {
                  return (
                    <Grid item mb={2}>
                      <PhotosViewer
                        files={dataItem}
                        onChangeComplete={(e) => {
                          let data = this.state.data;
                          data[modelItem.index] = e;
                          this.setState({ data });
                        }}
                        multiple={true}
                        accept={"image/png, image/jpeg, image/jpg, image/webp"}
                        data={this.props.data}
                      />
                    </Grid>
                  );
                } else if (modelItem.type === "performer") {
                  return (
                    <Grid item mb={2}>
                      {/* <Typography variant="h6">Performing Group</Typography> */}
                      <TextField
                        id={`performing-group`}
                        label={"Performing Group"}
                        variant="standard"
                        placeholder=""
                        onChange={(e) => {
                          let data = this.state.data;
                          if (e?.target?.value) {
                            if (!data[modelItem.index]?.name) {
                              data[modelItem.index] = modelItem.template;
                            }
                            data[modelItem.index].name = e.target.value;
                          } else {
                            delete data[modelItem.index];
                          }
                          this.setState({ data });
                        }}
                        value={dataItem?.name || ""}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  );
                } else if (modelItem.type === "organizer") {
                  return (
                    <>
                      <Grid item mb={2}>
                        <TextField
                          id={`organizer`}
                          label={"Organizer Name"}
                          variant="standard"
                          placeholder=""
                          onChange={(e) => {
                            let data = this.state.data;
                            if (e?.target?.value) {
                              if (!data[modelItem.index]) {
                                data[modelItem.index] = modelItem.template;
                              }
                              data[modelItem.index].name = e.target.value;
                            } else {
                              delete data[modelItem.index];
                            }
                            this.setState({ data });
                          }}
                          value={dataItem?.name || ""}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item mb={2}>
                        <TextField
                          id={`organizer`}
                          label={"Organizer Website"}
                          variant="standard"
                          placeholder=""
                          onChange={(e) => {
                            let data = this.state.data;
                            if (e?.target?.value) {
                              if (!data[modelItem.index]) {
                                data[modelItem.index] = modelItem.template;
                              }
                              data[modelItem.index].url = e.target.value;
                            } else {
                              delete data[modelItem.index];
                            }
                            this.setState({ data });
                          }}
                          value={dataItem?.url || ""}
                          style={{ width: "100%" }}
                        />
                      </Grid>
                    </>
                  );
                }
                return null;
              })}
              <button
                id={"form-submit"}
                style={{ display: "none" }}
                type={"submit"}
              />
            </form>
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
                {this.props.deleteButton && (
                  <Button
                    variant="text"
                    id={"delete-file-manager"}
                    onClick={() => this.delete()}
                    type="button"
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="text"
                  onClick={() => {
                    document.getElementById("form-submit")?.click();
                  }}
                >
                  Complete
                </Button>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default Form;

const countryListAlpha2 = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas (the)",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia (Plurinational State of)",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory (the)",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands (the)",
  CF: "Central African Republic (the)",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands (the)",
  CO: "Colombia",
  KM: "Comoros (the)",
  CD: "Congo (the Democratic Republic of the)",
  CG: "Congo (the)",
  CK: "Cook Islands (the)",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czechia",
  CI: "Côte d'Ivoire",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic (the)",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands (the) [Malvinas]",
  FO: "Faroe Islands (the)",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories (the)",
  GA: "Gabon",
  GM: "Gambia (the)",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See (the)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea (the Democratic People's Republic of)",
  KR: "Korea (the Republic of)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic (the)",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands (the)",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States of)",
  MD: "Moldova (the Republic of)",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands (the)",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger (the)",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands (the)",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines (the)",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  MK: "Republic of North Macedonia",
  RO: "Romania",
  RU: "Russian Federation (the)",
  RW: "Rwanda",
  RE: "Réunion",
  BL: "Saint Barthélemy",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten (Dutch part)",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan (the)",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands (the)",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates (the)",
  GB: "United Kingdom of Great Britain and Northern Ireland (the)",
  UM: "United States Minor Outlying Islands (the)",
  US: "United States of America (the)",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela (Bolivarian Republic of)",
  VN: "Viet Nam",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  AX: "Åland Islands"
};

const stateLabelValues = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "American Samoa", value: "AS" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "States of Micronesia", value: "FM" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Guam", value: "GU" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregan", value: "OR" },
  { label: "Palau", value: "PW" },
  { label: "Pennsilvania", value: "PA" },
  { label: "Puerto Rico", value: "PR" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virgin Islands", value: "VI" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" }
];
