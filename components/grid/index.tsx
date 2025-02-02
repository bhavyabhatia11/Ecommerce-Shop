import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={clsx('grid grid-flow-row gap-5 md:gap-8 lg:gap-20 ', props.className)}
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li {...props} className={clsx('aspect-[3/4]  transition-opacity ', props.className)}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
