import type { NextRouter } from "next/router";

export const getLastPathSegment = (router: NextRouter) => {
  const pathArray = router.asPath.split("/").filter((path) => path);
  const lastPath = decodeURIComponent(pathArray[pathArray.length - 1]);
  return lastPath;
};
