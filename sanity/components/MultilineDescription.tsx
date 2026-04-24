type DescriptionElement = { type: 'text'; value: string } | { type: 'br' };
const MultilineDescription = (els: DescriptionElement[]) => {
  return (
    <div className="flex flex-col">
      {els.map((el, i) =>
        el.type === 'br' ? <br key={i} /> : <div key={i}>{el.value}</div>,
      )}
    </div>
  );
};

export default MultilineDescription;
