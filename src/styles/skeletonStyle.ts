import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

export const Shimmer = styled.span`
  background-size: 200% 100%;
  background: linear-gradient(to right, #dcdcdc 8%, #fafafa 18%, #dcdcdc 33%);
  background-size: 1000px 100%;
  animation: ${loadingAnimation} 2s linear infinite;
  display: inline-block;
`;

export const SkeletonLine = styled(Shimmer)<{
  width?: string;
  height?: string;
  margin?: string;
  $borderRadius?: string;
}>`
  height: ${({ height }) => height || '1.5rem'};
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '0'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '1rem'};
  display: inline-block;
`;
