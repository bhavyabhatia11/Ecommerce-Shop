import Grid from 'components/grid';

export default function Loading() {
  return (
    <Grid className="xs:grid-cols-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return <Grid.Item key={index} className="animate-pulse bg-neutral-100" />;
        })}
    </Grid>
  );
}
