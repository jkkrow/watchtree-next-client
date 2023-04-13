import { useEffect, useState } from 'react';

import Button from '@/components/common/Element/Button';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import FavoriteActiveIcon from '@/assets/icons/favorite-active.svg';
import { useAppSelector } from '@/hooks/store';
import { useModal } from '@/hooks/ui/modal';
import { useAddToFavoritesMutation } from '@/store/features/video/video.api';
import { useRemoveFromFavoritesMutation } from '@/store/features/video/video.api';
import { formatNumber } from '@/utils/format';

interface VideoFavoritesProps {
  id: string;
  count: number;
  active: boolean;
  button?: boolean;
}

export default function VideoFavorites({
  id,
  count,
  active,
  button,
}: VideoFavoritesProps) {
  const user = useAppSelector((state) => state.user.info);
  const { open } = useModal();

  const [favorites, setFavorites] = useState(+count);
  const [favorited, setFavorited] = useState(active);

  useEffect(() => setFavorites(count), [count]);
  useEffect(() => setFavorited(active), [active]);

  const [addToFavorites, { isLoading: addLoading }] =
    useAddToFavoritesMutation();
  const [removeFromFavorites, { isLoading: removeLoading }] =
    useRemoveFromFavoritesMutation();

  const favoritesHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!button) return;
    if (!user) {
      return open('signin');
    }

    const action = favorited ? removeFromFavorites : addToFavorites;
    const result: any = await action(id);

    if (result.error) return;

    setFavorites((prev) => (favorited ? prev - 1 : prev + 1));
    setFavorited((prev) => !prev);
  };

  const icon = (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6">
        {favorited ? <FavoriteActiveIcon /> : <FavoriteIcon />}
      </span>
      <span>{formatNumber(favorites)}</span>
    </div>
  );

  return button ? (
    <Button
      small
      inversed
      loading={addLoading || removeLoading}
      onClick={favoritesHandler}
    >
      {icon}
    </Button>
  ) : (
    icon
  );
}
