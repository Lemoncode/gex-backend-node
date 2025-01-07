export type SelectedFields<Entity> =
  | {
      [key in keyof Entity]: 0 | 1;
    }
  | {
      [key: string]: 0 | 1;
    };
