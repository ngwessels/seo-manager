//React
import React from "react";

//Redux
import { connect } from "react-redux";

//MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

//Components
import Files from "./Files";

//Interface
import { PhotosViewerOptions } from "../interfaces";

interface State {
  files: any;
  openPhotoManager: boolean;
  autoAdvancedInterval: any;
  started: boolean;
}

class PhotosViewer extends React.Component<PhotosViewerOptions, State> {
  constructor(object: PhotosViewerOptions) {
    super(object);
    this.state = {
      files:
        object?.files?.[0]?.url !== ""
          ? Object.keys(object?.files || []).map((idx) => {
              const file = object?.files[idx];
              return file.url;
            })
          : [],
      openPhotoManager: false,
      autoAdvancedInterval: null,
      started: false
    };
  }

  componentDidUpdate = (prevProps: PhotosViewerOptions) => {
    if (JSON.stringify(prevProps.files) !== JSON.stringify(this.props.files)) {
      this.setState({
        files:
          this.props?.files?.[0]?.url !== ""
            ? Object.keys(this.props?.files || []).map((idx) => {
                const file = this.props?.files[idx];
                return file.url;
              })
            : []
      });
      if (this.props.files.length > 0) {
        this.compileData();
      } else if (this.state.autoAdvancedInterval) {
        clearInterval(this.state.autoAdvancedInterval);
      }
    }
  };

  componentDidMount = () => {
    if (this.props.files.length > 0) {
      this.compileData();
    }
  };

  compileData = () => {
    setTimeout(() => {
      const carouselFrames = Array.from(
        document.querySelectorAll(".carousel-frame")
      );

      const makeCarousel = (frame: any) => {
        const carouselSlide = frame.querySelector(".carousel-slide");
        const carouselImages = getImagesPlusClones();
        const prevBtn = frame?.querySelector(".carousel-prev");
        const nextBtn = frame?.querySelector(".carousel-next");
        const navDots: any = Array.from(
          frame.querySelectorAll(".carousel-dots li")
        );

        let imageCounter = 1;

        function getImagesPlusClones() {
          let images = frame.querySelectorAll(".carousel-slide img");

          const firstClone = images[0].cloneNode();
          const lastClone = images[images.length - 1].cloneNode();

          firstClone.className = "first-clone";
          lastClone.className = "last-clone";

          images = frame.querySelectorAll(".carousel-slide img");

          return images;
        }

        function initializeNavDots() {
          if (navDots.length) navDots[0].classList.add("active-dot");
        }

        function initializeCarousel() {}

        function slideForward() {
          if (imageCounter >= carouselImages.length - 1) return;
          carouselSlide.style.transition = "transform 400ms";
          imageCounter++;
          carouselSlide.style.transform = `translateX(-${
            100 * (imageCounter > 1 ? imageCounter : 2)
          }%)`;
        }

        function slideBack() {
          if (imageCounter <= 0) return;
          carouselSlide.style.transition = "transform 400ms";
          imageCounter--;
          carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
        }

        function makeLoop() {
          if (carouselImages[imageCounter].classList.contains("last-clone")) {
            carouselSlide.style.transition = "none";
            imageCounter = carouselImages.length - 2;
            carouselSlide.style.transform = `translateX(-${
              100 * imageCounter
            }%)`;
          }

          if (carouselImages[imageCounter].classList.contains("first-clone")) {
            carouselSlide.style.transition = "none";
            imageCounter = carouselImages.length - imageCounter;
            carouselSlide.style.transform = `translateX(-${
              100 * imageCounter
            }%)`;
          }
        }

        function goToImage(e: any) {
          carouselSlide.style.transition = "transform 400ms";
          imageCounter = 1 + navDots.indexOf(e.target);
          carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
        }

        function highlightCurrentDot() {
          navDots.forEach((dot: any) => {
            if (navDots.indexOf(dot) === imageCounter - 1) {
              dot.classList.add("active-dot");
            } else {
              dot.classList.remove("active-dot");
            }
          });
        }

        const addBtnListeners = () => {
          if (this.state.started === true) {
            nextBtn?.removeEventListener("click", slideForward);
            prevBtn?.removeEventListener("click", slideBack);
          }
          nextBtn?.addEventListener("click", slideForward);
          prevBtn?.addEventListener("click", slideBack);
        };

        const addNavDotListeners = () => {
          navDots.forEach((dot: any) => {
            if (this.state.started === true) {
              dot?.removeEventListener("click", goToImage);
            }
            dot?.addEventListener("click", goToImage);
          });
        };

        const addTransitionListener = () => {
          const call = () => {
            makeLoop();
            highlightCurrentDot();
          };
          if (this.state.started === true) {
            carouselSlide?.removeEventListener("transitionend", call);
          }
          carouselSlide.addEventListener("transitionend", call);
        };

        function buildCarousel() {
          initializeCarousel();
          initializeNavDots();
          addNavDotListeners();
          addBtnListeners();
          addTransitionListener();
        }
        buildCarousel();
        this.setState({ started: true });
      };

      carouselFrames.forEach((frame) => makeCarousel(frame));
    }, 100);
  };

  render() {
    return (
      <>
        <Files
          open={this.state.openPhotoManager}
          onChangeComplete={this.props.onChangeComplete}
          onClose={() => {
            this.setState({ openPhotoManager: false });
          }}
          multiple={this.props.multiple}
          selected={
            this.props.multiple === true
              ? this.props.files
              : this.props.files[0]
          }
          accept={this.props.accept}
        />

        {this.state.files.length > 0 && (
          <div
            className="carousel-frame-design carousel-frame"
            onClick={() => {
              this.setState({ openPhotoManager: true });
            }}
          >
            <div className="carousel-slide">
              {Object.keys(this.state.files || []).map((idx) => {
                const file = this.state.files[idx];
                return <img src={file} key={`file-${idx}`} />;
              })}
            </div>
            {this.state.files.length > 1 && (
              <>
                <div className={"carousel-prev"}>
                  <ArrowBackIcon sx={{ fontSize: 20, color: "#ffffff" }} />
                </div>
                <div className={"carousel-next"}>
                  <ArrowForwardIcon sx={{ fontSize: 20, color: "#ffffff" }} />
                </div>
                <ol className="carousel-dots">
                  {Object.keys(this.state.files || []).map((idx) => {
                    return <li key={`file-${idx}`} />;
                  })}
                </ol>
              </>
            )}
          </div>
        )}
        {this.state.files.length === 0 && (
          <div
            className="carousel-frame-design"
            style={{ height: 220, cursor: "pointer" }}
            onClick={() => {
              this.setState({ openPhotoManager: true });
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: 20
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: "#94a3b8" }} />
              <Typography sx={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 500 }}>
                Click to select or upload file
              </Typography>
              <Typography sx={{ color: "#cbd5e1", fontSize: "0.75rem" }}>
                Supports PNG, JPG, JPEG, WebP
              </Typography>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(PhotosViewer);
