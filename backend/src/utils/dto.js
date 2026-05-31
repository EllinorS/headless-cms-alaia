// DTO mappers: convert DB rows (snake_case) into the camelCase shape the API exposes.

export const toUserDTO = (u) => ({
  id: u.id,
  email: u.email,
  firstName: u.first_name,
  lastName: u.last_name,
  role: u.role,
  isActive: !!u.is_active,
  lastLogin: u.last_login,
});

// A surf session row → camelCase. createdAt is absent on public sessions (omitted in JSON).
export const toSessionDTO = (s) => ({
  id: s.id,
  date: s.date,
  time: s.time,
  type: s.type,
  duration: s.duration,
  price: s.price,
  createdAt: s.created_at,
});

// A form submission list row → camelCase (form_name/form_type come from the JOIN).
export const toSubmissionDTO = (s) => ({
  id: s.id,
  formName: s.form_name,
  formType: s.form_type,
  clientFirstname: s.client_firstname,
  clientLastname: s.client_lastname,
  clientEmail: s.client_email,
  clientPhone: s.client_phone,
  status: s.status,
  createdAt: s.created_at,
});

// A site_content row → camelCase. key_name is the CMS lookup key used by every public page.
export const toContentDTO = (c) => ({
  id: c.id,
  keyName: c.key_name,
  value: c.value,
  type: c.type,
  page: c.page,
  label: c.label,
  createdAt: c.created_at,
  updatedAt: c.updated_at,
});
