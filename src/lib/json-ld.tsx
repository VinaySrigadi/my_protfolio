import type { JsonLdRecord } from "./schemas";

/**
 * Renders a JSON-LD <script> tag for structured data.
 *
 * @example
 * import { JsonLd } from "@/lib/json-ld";
 * import { personSchema } from "@/lib/schemas";
 *
 * <JsonLd data={personSchema()} />
 */
export function JsonLd({ data }: { data: JsonLdRecord }): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
