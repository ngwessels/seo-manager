import React from "react";
import { DialogScreens } from "../interfaces";
interface State {
    hidden: boolean;
}
declare class Loading extends React.Component<DialogScreens, State> {
    constructor(props: DialogScreens);
    componentDidMount(): void;
    render(): JSX.Element | null;
}
export default Loading;
