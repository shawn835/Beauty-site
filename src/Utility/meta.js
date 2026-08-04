export const fieldsMeta = {
  name: {
    type: "text",
    placeholder: "name",
    label: "Full Name",
    required: true,
  },
  email: {
    type: "email",
    placeholder: "Email Address",
    label: "Email Address",
    required: true,
  },
  phone: {
    type: "tel",
    placeholder: "Phone Number",
    label: "Phone Number",
  },
  password: {
    type: "password",
    placeholder: "Password",
    label: "Password",
    required: true,
  },
  currentPassword: {
    type: "password",
    placeholder: "Current Password",
    label: "Current Password",
    required: true,
  },
  newPassword: {
    type: "password",
    placeholder: "New Password",
    label: "New Password",
    required: true,
  },
  confirmPassword: {
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    required: true,
  },

  code: {
    type: "text",
    placeholder: "Enter Verification Code",
    label: "Verification Code",
    required: true,
  },

  description: {
    type: "textarea",
    placeholder: "Full Event Description",
    label: "Description",
    required: true,
  },
  duration: {
    type: "number",
    placeholder: "Duration in minutes",
    label: "Duration (minutes)",
    required: true,
  },
  service: {
    type: "text",
    placeholder: "Related Service",
    label: "Related Service",
  },

  parentService: {
    type: "select",
    placeholder: "Select Parent Service",
    label: "Parent Service",
    optionsKey: "parentServices",
  },
  price: {
    type: "number",
    placeholder: "Price in KES",
    label: "Price (KES)",
    required: true,
  },

  technicians: {
    type: "select",
    placeholder: "technicians",
    label: "technician list",
    required: true,
    optionsKey: "technicians",
  },

  images: {
    type: "file",
    placeholder: "Upload Image",
    label: "Upload Image",
    accept: "image/*",
    multiple: true,
  },

  message: {
    type: "textarea",
    placeholder: "Your Message",
    label: "Message",
    required: true,
  },
};
