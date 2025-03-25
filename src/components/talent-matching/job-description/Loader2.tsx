
import React from "react";
import { Loader2 as Loader2Icon } from "lucide-react";

interface Loader2Props {
  className?: string;
}

const Loader2: React.FC<Loader2Props> = ({ className }) => {
  return <Loader2Icon className={className} />;
};

export default Loader2;
