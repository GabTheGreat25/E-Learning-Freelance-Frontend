import { PATH, METHOD, TAGS } from "@constants";

export const getCarousel = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.ALL_CAROUSEL,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.CAROUSEL],
  });
