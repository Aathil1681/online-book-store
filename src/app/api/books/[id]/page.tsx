import BookDetails from "@/app/components/BookDetails";


interface PageProps {
  params: {
    id: string;
  };
}

export default function BookPage({ params }: PageProps) {
  const { id } = params;

  return (
    <main>
      <BookDetails bookId={id} />
    </main>
  );
}
