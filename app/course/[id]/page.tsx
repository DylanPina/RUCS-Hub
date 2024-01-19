export default function Page({ params }: { params: { id: string } }) {
  return <div>Course ID: {params.id}</div>;
}
