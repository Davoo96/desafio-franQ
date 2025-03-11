export default function FinancesItemPage({
  params,
}: {
  params: { item: string };
}) {
  return (
    <main>
      <h1>Item: {decodeURI(params.item)}</h1>
    </main>
  );
}
