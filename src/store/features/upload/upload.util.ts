import { AxiosProgressEvent } from 'axios';

import { UploadFile } from './upload.type';
import { VideoNode } from '../video/video.type';
import { traverseNodes } from '../video/video.util';

const abortControllers = new Map<string, AbortController>();

export function startRequest(fileName: string) {
  const existingController = abortControllers.get(fileName);

  if (existingController) {
    return existingController.signal;
  }

  const abortController = new AbortController();
  abortControllers.set(fileName, abortController);
  return abortController.signal;
}

export function abortRequest(fileName: string) {
  const abortController = abortControllers.get(fileName);
  if (abortController) {
    abortController.abort();
    abortControllers.delete(fileName);
  }
}

export function completeRequest(fileName: string) {
  const abortController = abortControllers.get(fileName);
  if (abortController) {
    abortControllers.delete(fileName);
  }
}

export function findDuplicate(root: VideoNode, name: string) {
  const nodes = traverseNodes(root);
  return nodes.find((node) => node.name == name);
}

export async function getVideoDuration(file: File) {
  return new Promise<number>((resolve) => {
    const video = document.createElement('video');
    video.onloadedmetadata = () => resolve(video.duration);
    video.src = URL.createObjectURL(file);
  });
}

export function getFiles(root: VideoNode, files: UploadFile[]) {
  const nodes = traverseNodes(root);
  return nodes.reduce((acc, cur) => {
    const duplicated = acc.some((obj) => obj.fileName === cur.name);

    if (cur.name && cur.url && !duplicated) {
      const existingFile = files.find((item) => item.fileName === cur.name);
      const url = existingFile ? existingFile.url : cur.url;
      acc.push({ fileName: cur.name, url });
    }

    return acc;
  }, [] as UploadFile[]);
}

export function uploadProgressHandler(
  progressArray: number[],
  partNumber: number,
  partCount: number,
  cb: (percentage: number, rate?: number) => void
) {
  return (progressEvent: AxiosProgressEvent) => {
    const loaded = progressEvent.loaded!;
    const total = progressEvent.total!;
    const rate = progressEvent.rate;

    const currentProgress = Math.round((loaded * 100) / total);
    progressArray[partNumber - 1] = currentProgress;
    const sum = progressArray.reduce((acc, cur) => acc + cur);
    const percentage = Math.round(sum / partCount);

    cb(percentage, rate);
  };
}

export function beforeunloadHandler(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = '';
}
