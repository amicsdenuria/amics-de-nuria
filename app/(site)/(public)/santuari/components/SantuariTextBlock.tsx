import { SantuariTextBlock as SantuariTextBlockType } from '@/data/santuari/interfaces';

interface SantuariTextBlockProps {
  block: SantuariTextBlockType;
  index?: number;
}
const SantuariTextBlock = ({ block, index }: SantuariTextBlockProps) => {
  return (
    <article className="group">
      <div className="flex items-start gap-6">
        {typeof index === 'number' && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
            {index + 1}
          </span>
        )}
        <div className="flex-1">
          <h3 className="mb-3 text-xl md:text-2xl font-medium tracking-tight text-foreground">
            {block.title}
          </h3>
          <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
            {block.body}
          </p>
        </div>
      </div>
    </article>
  );
};

export default SantuariTextBlock;
