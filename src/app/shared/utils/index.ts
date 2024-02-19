export function getRidOfPrefix(str?: string, takeIndex: number = 1, splitter: string = ' '): string {
  if ( !str ) {
    return '';
  }

  const index = str.indexOf(splitter);
  if (index === -1) {
    return str;
  }

  return str.split(splitter)[takeIndex];
}
