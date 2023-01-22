import { appApi } from '@/store/app/api';

const videoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getCreatedVideo: builder.query({
      query: (id: string) => ({ url: `videos/${id}` }),
    }),
    deleteCreatedVideo: builder.mutation({
      query: (id: string) => ({ url: `videos/${id}`, method: 'DELETE' }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const getFilteredVideos = (videos: any) => {
            return videos.filter((v: any) => v.id !== id);
          };
          await queryFulfilled;
          dispatch(
            videoApi.util.updateQueryData(
              'getCreatedVideo',
              id,
              getFilteredVideos
            )
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetCreatedVideoQuery } = videoApi;
