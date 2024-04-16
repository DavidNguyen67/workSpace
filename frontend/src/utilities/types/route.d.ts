type WebRoute = {
  path: string;
  component: any;
  children?: {
    path: string;
    component: any;
  }[];
};
