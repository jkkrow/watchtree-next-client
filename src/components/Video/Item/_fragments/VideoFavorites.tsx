import FavoriteIcon from '@/assets/icons/favorite.svg';
import FavoriteActiveIcon from '@/assets/icons/favorite-active.svg';
import { formatNumber } from '@/utils/format';

interface VideoFavoritesProps {
  count: number;
  active: boolean;
}

export default function VideoFavorites({ count, active }: VideoFavoritesProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-6 h-6">
        {active ? <FavoriteActiveIcon /> : <FavoriteIcon />}
      </span>
      <span>{formatNumber(count)}</span>
    </div>
  );
}
