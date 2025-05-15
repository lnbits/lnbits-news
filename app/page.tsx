import Main from './Main'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  return <Main searchParams={searchParams} />
}
