interface NotFoundProps {
  items?: unknown[];
  label: string;
  icon: React.FC;
}

export default function NotFound({ items, label, icon: Icon }: NotFoundProps) {
  return items && items.length === 0 ? (
    <div className="flex justify-center items-center w-full px-4 py-8 gap-4 ring-2 ring-secondary rounded-md">
      <div className="w-12 h-12">
        <Icon />
      </div>
      <div className="text-xl font-medium">No {label} Found</div>
    </div>
  ) : null;
}
