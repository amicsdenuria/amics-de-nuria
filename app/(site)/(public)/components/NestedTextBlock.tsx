import { TextBlock as TextBlockType } from '@/content/interfaces/primary-page-interfaces';

export interface NestedTextBlockType extends TextBlockType {
  items?: TextBlockType[];
}

interface NestedTextBlockProps {
  block: NestedTextBlockType;
  index?: number;
}

const NestedTextBlock = ({ block, index }: NestedTextBlockProps) => {
  const hasItems = Array.isArray(block.items) && block.items.length > 0;

  return (
    <article className="group border-l-2 border-primary/20 pl-6 transition-colors hover:border-primary/40">
      <div className="flex items-start gap-6">
        {typeof index === 'number' && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
            {index + 1}
          </span>
        )}

        <div className="flex-1">
          <h3 className="mb-3 text-xl font-medium tracking-tight text-foreground md:text-2xl">
            {block.title}
          </h3>

          {block.body ? (
            <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              {block.body}
            </p>
          ) : null}

          {hasItems ? (
            <div className="mt-6 space-y-6">
              {block.items!.map((item, i) => (
                <div
                  key={`${item.title}-${i}`}
                  className="space-y-2"
                >
                  <h4 className="text-base font-medium tracking-tight text-foreground md:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default NestedTextBlock;
