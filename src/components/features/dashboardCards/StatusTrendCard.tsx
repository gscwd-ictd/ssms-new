"use client";

import { FunctionComponent, useContext } from "react";
import { TicketsContext } from "./TicketsContext";

export const StatusTrendCard: FunctionComponent = () => {
  const tickets = useContext(TicketsContext);

  console.log(tickets);

  return <div>test</div>;
};
