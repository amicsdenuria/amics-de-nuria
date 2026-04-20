import { TextBlock } from '@/content/interfaces/primary-page-interfaces';

interface SantuariTextBlockProps {
  block: TextBlock;
  index?: number;
}
const SantuariTextBlock = ({ block, index }: SantuariTextBlockProps) => {
  return (
    <article className="group border-l-2 border-primary/20 pl-6 transition-colors hover:border-primary/40">
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
