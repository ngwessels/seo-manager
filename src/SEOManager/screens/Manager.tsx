//React
import React from "react";

//Redux
import { connect } from "react-redux";

//PropTypes
import PropTypes from "prop-types";

//Firebase
import firebase from "src/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebase);

//Styling
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  DialogContent,
  DialogActions,
  IconButton,
  DialogTitle,
  Autocomplete,
  Chip,
  Box,
  Tabs,
  Tab,
  Typography,
  Switch,
  FormControlLabel,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

//Server Call
import { serverCall } from "src/utilities/serverCall";

//Components
import OpenDashboard from "../components/OpenDashboard";
import PhotosViewer from "../components/PhotosViewer";
import { BootstrapDialog } from "./BootstrapDialog";

//Interfaces
import { ManagerOptions } from "../interfaces";

interface State {
  savedLocations: any;
  loading: boolean;
  saving: boolean;
  newImage: string;
  file: any;
  performActionOnUpdate: any;
  photoManager: boolean;
  tabIndex: number;
  isNewPage: boolean;
  data?: any;
  isMobile: boolean;
  aiEnabled: boolean;
  aiAutonomousAll: boolean;
  aiPageAutonomous: boolean;
  aiSaving: boolean;
}

const sxTextField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#94a3b8"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3b82f6",
      borderWidth: "2px"
    }
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3b82f6"
  }
};

const sxSelect = {
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#94a3b8"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b82f6",
    borderWidth: "2px"
  }
};

class Manager extends React.Component<ManagerOptions, State> {
  constructor(props: ManagerOptions) {
    super(props);
    const globalAi = props?.seoData?.manager?.global?.ai || {};
    const pageAi = props?.seoData?.manager?.page?.ai || {};
    this.state = {
      loading: true,
      saving: false,
      newImage: "",
      file: null,
      performActionOnUpdate: {},
      photoManager: true,
      tabIndex: 0,
      savedLocations: {},
      isNewPage: false,
      isMobile: true,
      aiEnabled: globalAi.enabled || false,
      aiAutonomousAll: globalAi.autonomousEnabled || false,
      aiPageAutonomous: pageAi.autonomous || false,
      aiSaving: false
    };
  }

  componentDidMount = async () => {
    this.props.onIsLoading(true);
    this.setState({ loading: true });

    auth?.currentUser?.getIdToken().then(async (token) => {
      const response = await serverCall(
        "/seo/authorized_get",
        "put",
        {
          path: this.props?.seoData?.initial?.page?.path || ""
        },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );
      if (response?.results?.seoRequest) {
        const action = {
          type: "SET_MANAGER_SEO_DATA",
          results: response?.results?.seoRequest
        };
        this.props.dispatch(action);
      }
      if (response?.results?.plan) {
        const action = {
          type: "SET_MANAGER_PROJECT_PLAN",
          results: response?.results?.plan
        };
        this.props.dispatch(action);
      }

      const globalAi = response?.results?.seoRequest?.global?.ai || {};
      const pageAi = response?.results?.seoRequest?.page?.ai || {};
      this.setState({
        loading: false,
        isNewPage: response?.results?.isNewPage ? true : false,
        aiEnabled: globalAi.enabled || false,
        aiAutonomousAll: globalAi.autonomousEnabled || false,
        aiPageAutonomous: pageAi.autonomous || false
      });
      setTimeout(() => {
        this.props.onIsLoading(false);
      }, 1000);
    });
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  onPageChange = (value: any, location: any) => {
    let page = { ...this.props?.seoData?.manager?.page };
    page[location] = value;
    const action = {
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "page",
      results: page
    };
    this.props.dispatch(action);

    let savedLocations = this.state.savedLocations;
    savedLocations["page"] = true;

    this.setState({ savedLocations });
  };

  onGlobalChange = (value: any, location: any) => {
    let global = { ...this.props?.seoData?.manager?.global };
    global[location] = value;
    const action = {
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "global",
      results: global
    };
    this.props.dispatch(action);

    let savedLocations = this.state.savedLocations;
    savedLocations["global"] = true;
    this.setState({ savedLocations });
  };

  addPerformAction = (e: any, type: any) => {
    let performAction = this.state.performActionOnUpdate;
    performAction[type] = e;
    this.setState({ performActionOnUpdate: performAction });
  };

  saveData = () => {
    this.setState({ saving: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const awaitActions = Object.keys(
        this.state.performActionOnUpdate || []
      ).map(async (idx) => {
        const action = this.state.performActionOnUpdate[idx];
        if (action && action.action) {
          await action.action();
        }
        return true;
      });
      await Promise.all(awaitActions);

      if (this.state.isNewPage === true) {
        const response = await serverCall(
          "/seo/create",
          "post",
          {
            data: this.props?.seoData?.manager,
            savedLocations: this.state.savedLocations
          },
          undefined,
          { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
        );

        if (response?.results && this.props.onChangeComplete) {
          this.props.onChangeComplete(response?.results);
        }

        this.setState({ saving: false });
      } else {
        const response = await serverCall(
          "/seo/update",
          "put",
          {
            data: this.props?.seoData?.manager,
            savedLocations: this.state.savedLocations
          },
          undefined,
          { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
        );

        if (response?.results && this.props.onChangeComplete) {
          this.props.onChangeComplete(response?.results);
        }

        this.setState({ saving: false });
      }
    });
  };

  authSignOut = async () => {
    await signOut(auth);
  };

  updatePageAiInRedux = (ai: any) => {
    const page = { ...this.props?.seoData?.manager?.page, ai };
    this.props.dispatch({
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "page",
      results: page
    });
  };

  updateGlobalAiInRedux = (ai: any) => {
    const global = { ...this.props?.seoData?.manager?.global, ai };
    this.props.dispatch({
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "global",
      results: global
    });
  };

  toggleProjectAI = async (field: "aiEnabled" | "aiAutonomousAll", value: boolean) => {
    const prev = this.state[field];
    this.setState({ [field]: value, aiSaving: true } as any);

    const token = await auth?.currentUser?.getIdToken();
    const body: any = {};
    if (field === "aiEnabled") body.aiEnabled = value;
    if (field === "aiAutonomousAll") body.aiAutonomousEnabled = value;

    const resp = await serverCall(
      "/seo/ai/settings",
      "post",
      body,
      undefined,
      { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
    );

    if (resp?.results && !resp?.error) {
      const currentAi = this.props?.seoData?.manager?.global?.ai || {};
      const updatedAi = { ...currentAi };
      if (field === "aiEnabled") updatedAi.enabled = value;
      if (field === "aiAutonomousAll") updatedAi.autonomousEnabled = value;
      this.updateGlobalAiInRedux(updatedAi);
    } else {
      this.setState({ [field]: prev } as any);
    }
    this.setState({ aiSaving: false });
  };

  togglePageAutonomous = async (value: boolean) => {
    const prev = this.state.aiPageAutonomous;
    this.setState({ aiPageAutonomous: value, aiSaving: true });

    const pageId = this.props?.seoData?.manager?.page?.pageId;
    if (!pageId) {
      this.setState({ aiPageAutonomous: prev, aiSaving: false });
      return;
    }

    const token = await auth?.currentUser?.getIdToken();
    const resp = await serverCall(
      "/seo/ai/settings/page-autonomous",
      "put",
      { pageId, autonomous: value },
      undefined,
      { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
    );

    if (resp?.results && !resp?.error) {
      this.updatePageAiInRedux({ autonomous: value });
    } else {
      this.setState({ aiPageAutonomous: prev });
    }
    this.setState({ aiSaving: false });
  };

  render() {
    if (this.props?.isLoading === true) {
      return null;
    }
    return (
      <BootstrapDialog
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            this.props.onClose();
          }
        }}
        aria-labelledby="SEO Manager Login"
        open={true}
        maxWidth={false}
        style={{ zIndex: 100 }}
        hideBackdrop={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          SEO Manager
          <IconButton
            aria-label="close"
            onClick={this.props.onClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 10,
              color: "#94a3b8",
              "&:hover": { color: "#f8fafc", backgroundColor: "rgba(255,255,255,0.1)" }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "#e2e8f0" }}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={this.state.tabIndex}
              onChange={(_event, newValue) => {
                this.setState({ tabIndex: newValue });
              }}
              aria-label="Select SEO Manager Options"
              sx={{
                minHeight: 40,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  minHeight: 40,
                  color: "#64748b",
                  "&.Mui-selected": { color: "#1e293b", fontWeight: 600 }
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#1e293b",
                  height: 2.5,
                  borderRadius: "2px 2px 0 0"
                }
              }}
            >
              <Tab label="Page" {...a11yProps(0)} />
              <Tab label="Global" {...a11yProps(1)} />
              <Tab label="Account" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <Box mt={1.5} display={"flex"} justifyContent={"center"}>
            <OpenDashboard />
          </Box>

          <TabPanel value={this.state.tabIndex} index={0}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box>
                <PhotosViewer
                  files={
                    this.props?.seoData?.manager?.page?.image
                      ? [this.props?.seoData?.manager?.page?.image]
                      : [{ url: "", fileId: "" }]
                  }
                  onChangeComplete={(e: any) => {
                    const object = e?.url ? e : { url: "", fileId: "" };
                    this.onPageChange(object, "image");
                  }}
                  multiple={false}
                  accept={"image/png, image/jpeg, image/jpg, image/webp"}
                />
              </Box>

              <TextField
                id="page-path"
                label="Page Path"
                variant="outlined"
                size="small"
                placeholder="/about"
                value={this.props?.seoData?.manager?.page?.path || ""}
                fullWidth
                sx={sxTextField}
                onChange={(e) => {
                  let string = e.target.value;
                  if (string?.[0] !== "/") {
                    string = `/${string}`;
                  }
                  this.onPageChange(string, "path");
                }}
              />

              <TextField
                id="title"
                label="Title"
                variant="outlined"
                size="small"
                placeholder="Home - Stark Industries"
                onChange={(e) => {
                  this.onPageChange(e.target.value, "title");
                }}
                value={this.props?.seoData?.manager?.page?.title || ""}
                fullWidth
                sx={sxTextField}
                helperText={
                  <Typography component="span" sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {this.props?.seoData?.manager?.page?.title?.length || 0} / 60 characters
                  </Typography>
                }
              />

              <TextField
                id="description"
                label="Description"
                variant="outlined"
                size="small"
                placeholder="A brief description of this page..."
                onChange={(e) => {
                  this.onPageChange(e.target.value, "description");
                }}
                value={this.props?.seoData?.manager?.page?.description}
                fullWidth
                multiline
                minRows={2}
                sx={sxTextField}
                helperText={
                  <Typography component="span" sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {this.props?.seoData?.manager?.page?.description?.length || 0} / 160 characters
                  </Typography>
                }
              />

              <Autocomplete
                multiple
                id="tags-keywords"
                options={[]}
                value={this.props?.seoData?.manager?.page?.keywordsArray || []}
                freeSolo
                onChange={(_e, newValue) => {
                  this.onPageChange(newValue, "keywordsArray");
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                      sx={{
                        borderRadius: "6px",
                        backgroundColor: "#e2e8f0",
                        color: "#334155",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        "& .MuiChip-deleteIcon": { color: "#94a3b8", "&:hover": { color: "#64748b" } }
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label="Keywords"
                    placeholder="Type and press Enter"
                    sx={sxTextField}
                  />
                )}
              />

              <FormControl size="small" fullWidth>
                <InputLabel id="follow">Follow</InputLabel>
                <Select
                  labelId="follow"
                  id="follow-select"
                  value={this.props?.seoData?.manager?.page?.follow}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "follow");
                  }}
                  label="Follow"
                  sx={sxSelect}
                >
                  <MenuItem value="">Select Follow Option</MenuItem>
                  <MenuItem value={"follow"}>Follow</MenuItem>
                  <MenuItem value={"nofollow"}>No Follow</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel id="index">Index</InputLabel>
                <Select
                  labelId="index"
                  id="index-select"
                  value={this.props?.seoData?.manager?.page?.index}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "index");
                  }}
                  label="Index"
                  sx={sxSelect}
                >
                  <MenuItem value="">Select Index Option</MenuItem>
                  <MenuItem value={"index"}>Index</MenuItem>
                  <MenuItem value={"noindex"}>No Index</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel id="changeFreq">Change Frequency</InputLabel>
                <Select
                  labelId="changeFreq"
                  id="changeFreq-select"
                  value={this.props?.seoData?.manager?.page?.changeFreq}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "changeFreq");
                  }}
                  label="Change Frequency"
                  sx={sxSelect}
                >
                  <MenuItem value="">Select Frequency</MenuItem>
                  <MenuItem value="always">Always</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="never">Never</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel id="priority">Priority (10 = Highest)</InputLabel>
                <Select
                  labelId="priority"
                  id="priority-select"
                  value={this.props?.seoData?.manager?.page?.priority}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "priority");
                  }}
                  label="Priority (10 = Highest)"
                  sx={sxSelect}
                >
                  <MenuItem value="">Select Priority</MenuItem>
                  <MenuItem value={0.1}>1</MenuItem>
                  <MenuItem value={0.2}>2</MenuItem>
                  <MenuItem value={0.3}>3</MenuItem>
                  <MenuItem value={0.4}>4</MenuItem>
                  <MenuItem value={0.5}>5</MenuItem>
                  <MenuItem value={0.6}>6</MenuItem>
                  <MenuItem value={0.7}>7</MenuItem>
                  <MenuItem value={0.8}>8</MenuItem>
                  <MenuItem value={0.9}>9</MenuItem>
                  <MenuItem value={1.0}>10</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="ldJson"
                label="Structured Data (JSON-LD)"
                variant="outlined"
                size="small"
                placeholder='{ "@context": "https://schema.org", ... }'
                onChange={(e) => {
                  this.onPageChange(e.target.value, "ldJson");
                }}
                value={this.props?.seoData?.manager?.page?.ldJson}
                fullWidth
                multiline
                minRows={3}
                sx={{
                  ...sxTextField,
                  "& .MuiOutlinedInput-root": {
                    ...sxTextField["& .MuiOutlinedInput-root"],
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: "0.82rem"
                  }
                }}
              />

              {!this.state.isNewPage && (
                <Box
                  sx={{
                    borderTop: "1px solid #e2e8f0",
                    pt: 2,
                    mt: 0.5
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "#475569",
                      fontWeight: 600,
                      mb: 1.5
                    }}
                  >
                    AI Autonomous
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.aiPageAutonomous}
                        onChange={(e) => this.togglePageAutonomous(e.target.checked)}
                        disabled={this.state.aiSaving || !this.state.aiEnabled}
                        size="small"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "#3b82f6" },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#3b82f6"
                          }
                        }}
                      />
                    }
                    label={
                      <Box sx={{ ml: 0.5 }}>
                        <Typography sx={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>
                          Enable autonomous AI for this page
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          The AI will automatically optimize this page's SEO on a recurring schedule.
                        </Typography>
                      </Box>
                    }
                    sx={{ alignItems: "flex-start", mx: 0 }}
                  />
                  {!this.state.aiEnabled && (
                    <Alert
                      severity="info"
                      variant="outlined"
                      sx={{ mt: 1, fontSize: "0.78rem", py: 0 }}
                    >
                      Enable AI in the Global tab first to use autonomous features.
                    </Alert>
                  )}
                  {this.state.aiPageAutonomous && this.state.aiEnabled && (
                    <Alert
                      severity="success"
                      variant="outlined"
                      sx={{ mt: 1, fontSize: "0.78rem", py: 0 }}
                    >
                      This page is queued for autonomous AI optimization. The AI will analyze and improve SEO data on a recurring schedule (minimum 1 week between checks).
                    </Alert>
                  )}
                </Box>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={this.state.tabIndex} index={1}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                id="default-title"
                label="Default Title"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  this.onGlobalChange(e.target.value, "defaultTitle");
                }}
                value={this.props?.seoData?.manager?.global?.defaultTitle}
                fullWidth
                sx={sxTextField}
                helperText={
                  <Typography component="span" sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {this.props?.seoData?.manager?.global?.defaultTitle.length || 0} / 60 characters
                  </Typography>
                }
              />

              <TextField
                id="default-description"
                label="Default Description"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  this.onGlobalChange(e.target.value, "defaultDescription");
                }}
                value={this.props?.seoData?.manager?.global?.defaultDescription}
                fullWidth
                multiline
                minRows={2}
                sx={sxTextField}
                helperText={
                  <Typography component="span" sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {this.props?.seoData?.manager?.global?.defaultDescription.length || 0} / 160 characters
                  </Typography>
                }
              />

              <Box>
                <Typography sx={{ fontSize: "0.85rem", color: "#475569", fontWeight: 500, mb: 1 }}>
                  Favicon
                </Typography>
                <PhotosViewer
                  files={
                    this.props?.seoData?.manager?.global?.favicon?.fileId
                      ? [this.props?.seoData?.manager?.global?.favicon]
                      : [{ url: "", fileId: "" }]
                  }
                  onChangeComplete={(e: any) => {
                    const object = e?.url ? e : { url: "", fileId: "" };
                    this.onGlobalChange(object, "favicon");
                  }}
                  multiple={false}
                  accept={"image/png, image/jpeg, image/jpg, image/webp"}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: "0.85rem", color: "#475569", fontWeight: 500, mb: 1 }}>
                  Navigation Theme Color
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <input
                    type="color"
                    value={this.props?.seoData?.manager?.global?.themeColor || "#FFFFFF"}
                    onChange={(e) => {
                      this.onGlobalChange(e.target.value, "themeColor");
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      border: "2px solid #e2e8f0",
                      borderRadius: 8,
                      cursor: "pointer",
                      padding: 2,
                      backgroundColor: "#ffffff"
                    }}
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    value={this.props?.seoData?.manager?.global?.themeColor || "#FFFFFF"}
                    onChange={(e) => {
                      this.onGlobalChange(e.target.value, "themeColor");
                    }}
                    sx={{ ...sxTextField, width: 140 }}
                    inputProps={{ style: { fontFamily: "monospace", fontSize: "0.85rem" } }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  borderTop: "1px solid #e2e8f0",
                  pt: 2,
                  mt: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#475569",
                    fontWeight: 600
                  }}
                >
                  AI Settings
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.aiEnabled}
                      onChange={(e) => this.toggleProjectAI("aiEnabled", e.target.checked)}
                      disabled={this.state.aiSaving}
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#3b82f6" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#3b82f6"
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography sx={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>
                        Enable AI
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        Allow AI-powered analysis and recommendations for this project.
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: "flex-start", mx: 0 }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.aiAutonomousAll}
                      onChange={(e) => this.toggleProjectAI("aiAutonomousAll", e.target.checked)}
                      disabled={this.state.aiSaving || !this.state.aiEnabled}
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#f59e0b" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#f59e0b"
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography sx={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>
                        Enable autonomous AI for all pages
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        The AI will automatically optimize SEO for every page based on analytics and goals.
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: "flex-start", mx: 0 }}
                />

                {this.state.aiAutonomousAll && this.state.aiEnabled && (
                  <Alert
                    severity="warning"
                    variant="outlined"
                    sx={{ fontSize: "0.78rem", py: 0.5 }}
                  >
                    All pages are queued for autonomous AI optimization. Changes are logged in the Activity Log on the dashboard. Minimum re-check interval is 1 week.
                  </Alert>
                )}

                {!this.state.aiAutonomousAll && this.state.aiEnabled && (
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ fontSize: "0.78rem", py: 0.5 }}
                  >
                    You can enable autonomous AI per page instead. Open any page in the Page tab and toggle it individually.
                  </Alert>
                )}
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={this.state.tabIndex} index={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                py: 4
              }}
            >
              <Typography sx={{ color: "#64748b", fontSize: "0.9rem", mb: 1 }}>
                Signed in as {auth?.currentUser?.email || "unknown"}
              </Typography>
              <Button
                variant="outlined"
                onClick={this.authSignOut}
                type="button"
                sx={{
                  borderColor: "#e2e8f0",
                  color: "#dc2626",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 4,
                  "&:hover": { borderColor: "#dc2626", backgroundColor: "#fef2f2" }
                }}
              >
                Sign Out
              </Button>
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
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
              sx={{
                color: "#64748b",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#f1f5f9" }
              }}
            >
              Close
            </Button>

            <Button
              variant="contained"
              onClick={this.saveData}
              type="button"
              disabled={this.state.saving}
              startIcon={this.state.saving ? <CircularProgress size={16} sx={{ color: "#ffffff" }} /> : null}
              sx={{
                backgroundColor: "#1e293b",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                px: 4,
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                "&:hover": { backgroundColor: "#334155" },
                "&.Mui-disabled": { backgroundColor: "#94a3b8", color: "#ffffff" }
              }}
            >
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(Manager);

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
