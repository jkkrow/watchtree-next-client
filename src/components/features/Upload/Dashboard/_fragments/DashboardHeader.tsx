import { useForm } from 'react-hook-form';

import Input from '@/components/common/Element/Input';
import Textarea from '@/components/common/Element/Textarea';
import EnterIcon from '@/assets/icons/enter.svg';
import RemoveIcon from '@/assets/icons/remove.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { updateTree } from '@/store/features/upload/upload.slice';
import { useTimeout } from '@/hooks/util/time';

interface DashboardInputs {
  title: string;
  category: string;
  description: string;
}

export default function DashboardHeader() {
  const tree = useAppSelector((state) => state.upload.uploadTree!);
  const dispatch = useAppDispatch();

  const [setTitleTimeout] = useTimeout();
  const [setDescTimeout] = useTimeout();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: tree.title,
      category: '',
      description: tree.description,
    },
  });

  const titleInput = register('title');
  const categoryInput = register('category');
  const descInput = register('description');

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    titleInput.onChange(e);
    setTitleTimeout(() => {
      dispatch(updateTree({ title: e.target.value }));
    }, 300);
  };

  const descChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    descInput.onChange(e);
    setDescTimeout(() => {
      dispatch(updateTree({ description: e.target.value }));
    }, 300);
  };

  const addCategoryHandler = ({ category }: DashboardInputs) => {
    const newCategory = category.trim();
    const duplicated = tree.categories.includes(newCategory);

    if (!newCategory.length || duplicated) return setValue('category', '');

    const newCategories = [...tree.categories, newCategory];
    dispatch(updateTree({ categories: newCategories }));
    setValue('category', '');
  };

  const removeCategoryHandler = (category: string) => () => {
    const filteredCategories = tree.categories.filter(
      (item) => item !== category
    );

    dispatch(updateTree({ categories: filteredCategories }));
  };

  return (
    <header className="flex flex-col gap-4">
      <div>
        <Input {...titleInput} onChange={titleChangeHandler} />
      </div>
      <div>
        <form
          className="relative flex items-center"
          onSubmit={handleSubmit(addCategoryHandler)}
        >
          <Input {...categoryInput} disabled={tree.categories.length >= 10} />
          <button
            type="submit"
            className="absolute right-0 w-6 h-6 data-[disabled=true]:text-secondary data-[disabled=true]:cursor-not-allowed"
            data-disabled={!watch('category').length}
          >
            <EnterIcon />
          </button>
        </form>
        <ul className="flex flex-wrap mt-2 gap-2">
          {tree.categories.map((category) => (
            <li
              className="group relative flex justify-center items-center px-4 py-2 ring-1 ring-secondary cursor-pointer before:absolute before:inset-0 before:bg-black/70 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              key={category}
              onClick={removeCategoryHandler(category)}
            >
              {category}
              <RemoveIcon className="absolute w-6 h-6 text-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Textarea
          {...descInput}
          maxLength={2000}
          onChange={descChangeHandler}
        />
        <div className="text-end">{tree.description.length}/2000</div>
      </div>
    </header>
  );
}
