/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export default content;
}

export enum Colors {
  orange,
  green,
  yellow,
  blue,
  violet,
}
export type ColorsString = keyof typeof Colors;

export type Task = {
  id: string;
  title: string;
  color: ColorsString[];
  date: string;
};

export type Data = {
  task?: string;
  color?: ColorsString[];
  color0?: string;
  [prop: string]: string;
};

export type Holiday = {
  date: string;
  name: string;
  fixed: boolean;
  global: boolean;
};
