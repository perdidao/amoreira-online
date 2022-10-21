export interface ShimmerTypes {
  type?: 'rectangle' | 'circle' | 'text-block';
}

export interface ShimmerProps extends ShimmerTypes {
  height?: number | string;
  width?: number | string;
}
