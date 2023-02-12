import { AxiosProgressEvent } from 'axios';

import { AppDispatch } from '@/store';
import { VideoNode } from '../video/video.type';
import { traverseNodes } from '../video/video.util';
import { setProgress } from './upload.slice';

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

export function uploadProgressHandler(
  partNumber: number,
  partCount: number,
  cb: (percentage: number, rate: number) => void
) {
  const progressArray: number[] = [];
  return (progressEvent: AxiosProgressEvent) => {
    const loaded = progressEvent.loaded!;
    const total = progressEvent.total!;
    const rate = progressEvent.rate!;

    const currentProgress = Math.round((loaded * 100) / total);
    progressArray[partNumber - 1] = currentProgress;
    const sum = progressArray.reduce((acc, cur) => acc + cur);
    const percentage = Math.round(sum / partCount);

    cb(percentage, rate);
  };
}