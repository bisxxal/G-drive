import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-xs text-gray-400", className)}>
      {formatDateTime(date)}
    </p>
  );
};
export default FormattedDateTime;