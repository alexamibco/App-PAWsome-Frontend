export interface Review {
    user: {
      avatar: string;
      name: string;
    };
    rating: number;
    review: string;
    title: string;
  }