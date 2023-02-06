import { db } from './db';

import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';
import { GetHistoriesRequest } from '@/store/features/history/history.type';
import { LocalHistory } from '@/store/features/history/history.type';

export async function saveLocalHistory(history: LocalHistory) {
  await db.histories.put(history);
}

export async function removeLocalHistory(videoId: string) {
  await db.histories.delete(videoId);
}

export async function getLocalHistories(params: GetHistoriesRequest) {
  const { page, max, skipEnded } = params;
  return db.histories
    .where(skipEnded ? { ended: false } : {})
    .limit(max)
    .offset(max * (page - 1))
    .reverse()
    .sortBy('updatedAt');
}

export async function applyLocalHistory(video: VideoTreeWithData) {
  const localHistory = await db.histories.get(video.id);
  const videoWithHistory = { ...video, history: localHistory || null };

  return videoWithHistory as VideoTreeWithData;
}

export async function applyLocalHistories(videos: VideoTreeEntryWithData[]) {
  const videoIds = videos.map((video) => video.id);
  const localHistories = await db.histories
    .where('videoId')
    .anyOf(videoIds)
    .toArray();

  const videosWithHistory = videos.map((video) => {
    const localHistory = localHistories.find((h) => h.videoId === video.id);
    return { ...video, history: localHistory || null };
  });

  return videosWithHistory as VideoTreeEntryWithData[];
}

export async function sortByLocalHistory(
  videos: VideoTreeEntryWithData[],
  localHistories: LocalHistory[]
) {
  const videosWithHistory = localHistories.map((localHistory) => {
    const video = videos.find((video) => video.id === localHistory.videoId);
    return video ? { ...video, history: localHistory } : null;
  });

  return videosWithHistory as (VideoTreeEntryWithData | null)[];
}
