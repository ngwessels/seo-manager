/* eslint-disable @typescript-eslint/quotes */
import { css, FlattenSimpleInterpolation } from "styled-components";
import { Gutter, PositionProps } from "common";

const GutterStyle = ({
  top,
  right,
  bottom,
  left
}: PositionProps<Gutter>): FlattenSimpleInterpolation => css``;

export default GutterStyle;
