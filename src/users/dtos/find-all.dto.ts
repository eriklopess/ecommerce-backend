export default interface FindAllDto {
  users: {
    name: string;
    email: string;
  }[];
  metadata: {
    count: number;
    numberOfPages: number;
    currentPage: number;
  };
}
