export interface IPet {
  id: number;
  category?: { id: number; name: string };
  name: string | null;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: "available" | "pending" | "sold";
}
