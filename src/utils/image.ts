export function getImageUrl(src: string) {
  const assetDomain = process.env.NEXT_PUBLIC_ASSET_DOMAIN;
  const imageUrl =
    src.startsWith('http') || src.startsWith('blob')
      ? src
      : `${assetDomain}/${src}`;

  return imageUrl;
}
