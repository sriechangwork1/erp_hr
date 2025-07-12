//hr1101/types.ts
export interface Data {
  research_id: number;
  staff_id?: number | null;
  title: string | null;
  author_1?: string | null;
  author_2?: string | null;
  work_type?: string | null;
  research_subtype?: string | null;
  database_type?: string | null;
  journal_name?: string | null;
  publisher?: string | null;
  volume?: string | null;
  issue?: string | null;
  page?: string | null;
  published_year?: string | null;
  doi?: string | null;
  issn?: string | null;
  abstract?: string | null;
  keywords?: string | null;
  attachment?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: number | null;
  [key: string]: any;
}