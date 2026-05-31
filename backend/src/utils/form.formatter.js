// Collapses a flat SQL JOIN result (one row per field option) into a nested form object.
// fieldMap deduplicates fields: the first time a field_id appears a new entry is created;
// subsequent rows for the same field only add their option to the existing entry.
export const formatForm = (rows) => {
  if (rows.length === 0) return null;

  const form = {
    id: rows[0].form_id,
    name: rows[0].form_name,
    type: rows[0].form_type,
    fields: [],
  };

  const fieldMap = {};

  for (const row of rows) {
    if (!row.field_id) continue;
    
    if (!fieldMap[row.field_id]) {
      fieldMap[row.field_id] = {
        id: row.field_id,
        label: row.field_label,
        subtitle: row.field_subtitle,
        explanation: row.field_explanation,
        type: row.field_type,
        displayType: row.field_display_type,
        imageUrl: row.field_image_url,
        isRequired: Boolean(row.field_is_required),
        position: row.field_position,
        options: [],
      };
      form.fields.push(fieldMap[row.field_id]);
    }
    if (row.option_id) {
      fieldMap[row.field_id].options.push({
        id: row.option_id,
        label: row.option_label,
        value: row.option_value,
        feedback: row.option_feedback,
        imageUrl: row.option_image_url,
        position: row.option_position,
      });
    }
  }

  form.fields.sort((a, b) => a.position - b.position);
  form.fields.forEach((field) => {
    field.options.sort((a, b) => a.position - b.position);
  });

  return form;
};
