import * as Styled from '../styles/skeletonStyle';

interface SkeletonPropTypes {
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
}

export default function Skeleton(props: SkeletonPropTypes) {
  return (
    <Styled.SkeletonLine
      width={props.width}
      height={props.height}
      margin={props.margin}
      borderRadius={props.borderRadius}
    />
  );
}
