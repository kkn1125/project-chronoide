export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function checkSameDir(src: string[], dst: string[]) {
  for (let i = 0; i < src.length; i++) {
    const s = src[i];
    const d = dst[i];
    if (s !== d) {
      console.log("un matched");
      return false;
    }
  }
  console.log("matched");
  return true;
}
