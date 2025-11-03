import React, { memo } from "react";
import { PiSpinnerBallDuotone, PiSpinnerBallFill } from "react-icons/pi";

export default memo(function IconLoader({ showLoader, indicator, iconSize = 25, tailwindTextColor = "text-orange-500" }: { iconSize?: number; indicator?: React.ReactNode; showLoader?: boolean; tailwindTextColor?: string }) {
  const indicatorNode = indicator || <PiSpinnerBallDuotone size={iconSize} className={tailwindTextColor} />;
  return showLoader ? <div className="rotate-spinner">{indicatorNode}</div> : null;
});
