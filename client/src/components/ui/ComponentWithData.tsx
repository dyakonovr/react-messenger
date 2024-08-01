// @ts-expect-error

import type { ReactNode } from "react";

function isBadValue(value: unknown): boolean {
  return value === undefined;
}

interface IProps {
  isLoading?: boolean;
  LoadingComponent?: ReactNode;
  isError?: boolean;
  ErrorComponent?: ReactNode;
  isEmpty?: boolean;
  EmptyComponent?: ReactNode;

  OrigComponent: ReactNode;
}

export function ComponentWithData({
  isLoading,
  LoadingComponent,
  isError,
  ErrorComponent,
  isEmpty,
  EmptyComponent,
  OrigComponent
}: IProps) {
  if (
    (isBadValue(isLoading) && !isBadValue(LoadingComponent)) ||
    (!isBadValue(isLoading) && isBadValue(LoadingComponent))
  ) {
    throw new Error(
      "If you need to use 'isLoading', you must pass both 'isLoading' and the 'LoadingComponent'."
    );
  }

  if (
    (isBadValue(isError) && !isBadValue(ErrorComponent)) ||
    (!isBadValue(isError) && isBadValue(ErrorComponent))
  ) {
    throw new Error(
      "If you need to use 'isError', you must pass both 'isError' and the 'ErrorComponent'."
    );
  }

  if (
    (isBadValue(isEmpty) && !isBadValue(EmptyComponent)) ||
    (!isBadValue(isEmpty) && isBadValue(EmptyComponent))
  ) {
    throw new Error(
      "If you need to use 'isEmpty', you must pass both 'isEmpty' and the 'EmptyComponent'."
    );
  }

  return (
    <>
      {isLoading && LoadingComponent}
      {isError && ErrorComponent}
      {isEmpty && EmptyComponent}
      {!isLoading && !isError && !isEmpty && OrigComponent}
    </>
  );
}
