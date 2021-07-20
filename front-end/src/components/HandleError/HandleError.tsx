import * as React from "react";

export interface IHandleErrorProps {
  children: JSX.Element;
}

export default function HandleError(props: IHandleErrorProps) {
  const { children } = props;
  try {
    return <div>{children}</div>;
  } catch (error) {
    console.log(error);

    return <div>123</div>;
  }
}
