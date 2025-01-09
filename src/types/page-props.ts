export type PageProps<T = void, K = void> = {
  params?: Promise<T>;
  searchParams?: Promise<K>;
};
