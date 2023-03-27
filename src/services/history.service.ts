import { db } from './db';

import { fastForward, generateToken } from './db.utils';
import {
  VideoTreeEntryWithData,
  VideoTreeWithData,
} from '@/store/features/video/video.type';
import {
  GetHistoriesRequest,
  LocalHistory,
} from '@/store/features/history/history.type';

export async function saveLocalHistory(
  params: Omit<LocalHistory, 'watchedAt'>
) {
  const history: LocalHistory = { ...params, watchedAt: new Date().toString() };
  await db.histories.put(history);
}

export async function deleteLocalHistory(videoId: string) {
  await db.histories.delete(videoId);
}

export async function clearLocalHistoy() {
  await db.histories.clear();
}

export async function getLocalHistories(params: GetHistoriesRequest) {
  const { token, max, skipEnded } = params;

  const filterFn = (item: LocalHistory) => {
    if (!skipEnded) return true;
    return item.ended === false;
  };

  const localHistories = await db.histories
    .filter(fastForward(token, 'videoId', filterFn))
    .limit(max)
    .reverse()
    .sortBy('watchedAt');

  const lastEntry = localHistories[localHistories.length - 1];
  const newToken = lastEntry ? generateToken(lastEntry) : null;

  return { localHistories, token: newToken };
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
  const deletedIds: string[] = [];
  const videosWithHistory = localHistories.map((localHistory) => {
    const video = videos.find((video) => video.id === localHistory.videoId);
    if (!video) deletedIds.push(localHistory.videoId);
    return video ? { ...video, history: localHistory } : null;
  });

  if (deletedIds.length) {
    deletedIds.forEach((id) => deleteLocalHistory(id));
  }

  return videosWithHistory.filter((video) => video) as VideoTreeEntryWithData[];
}
