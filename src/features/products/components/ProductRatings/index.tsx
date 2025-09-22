import { StarIcon } from "lucide-react";
import React, { Fragment } from "react";

import { Progress } from "@/shared/components/ui/progress";

export const ProductRatings = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-medium">Ratings</h3>

        <div className="flex items-center gap-x-1 font-medium">
          <StarIcon className="fill-foreground size-4" />
          <p>{3.5}</p>
          <p>({20} ratings)</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] gap-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <Fragment key={star}>
            <div className="font-medium">
              {star} {star === 1 ? "star" : "stars"}
            </div>
            <Progress className="h-[1lh]" value={30} />

            <div className="font-medium">{0}%</div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
