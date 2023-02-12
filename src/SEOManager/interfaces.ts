export interface Options {
  data?: any;
  onClose?: any;
  onOpen?: any;
  isManagerOpen?: boolean;
  isNewPage?: boolean;
  user?: any;
  dispatch?: any;
  onChangeComplete: any;
}

export interface DialogScreens {
  onClose: any;
}

export interface ManagerOptions {
  data?: any;
  onClose?: any;
  onOpen?: any;
  isManagerOpen?: boolean;
  isNewPage?: boolean;
  user?: any;
  dispatch?: any;
  seoData?: any;
  isLoading: boolean;
  onIsLoading: any;
  onChangeComplete: any;
}

export interface PhotosViewerOptions {
  files: any;
  onChangeComplete: any;
  multiple: boolean;
  accept: string;
  user?: any;
  seoData?: any;
}

export interface FilesOptions {
  open: boolean;
  onChangeComplete: any;
  onClose: any;
  multiple: boolean;
  selected: any;
  accept: string;
  user?: any;
  seoData?: any;
  version?: any;
}

export interface FileOptions {
  isClicked: any;
  key: string;
  onClick: any;
  item: any;
  idx: number;
  onDelete: any;
  user?: any;
  seoData?: any;
}

export interface FileDetailsInterface {
  onClose: any;
  open: boolean;
  onDelete: any;
  file: any;
  idx: number;
  isImage: boolean;
}

// onClose={() => {
//   this.setState({ fileDetail: false });
// }}
// open={this.state.fileDetail}
// onDelete={this.props.onDelete}
// file={this.props.item}
// idx={this.props.idx}
// isImage={isImage}
